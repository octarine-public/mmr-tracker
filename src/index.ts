import "./translations"

import { GUIHelper } from "./gui"
import { IGame, IMatch, MaxGames } from "./history"
import { MatchWatcher } from "./match"
import { MenuManager } from "./menu"
import { RatingStore } from "./storage"

/**
 * How long an ended match may wait for its rating. Past that the change came from a game played
 * elsewhere, and the hero of this one would be pinned on it.
 */
const MatchExpiry = 3 * 24 * 60 * 60 * 1000

new (class CMMRTracker {
	private oldRating = 0
	private account: Nullable<number>
	private pending: Nullable<number>
	private loaded: Nullable<Promise<void>>
	private games: IGame[] = []
	/**
	 * The ranked match that ended last and has not had its change of rating yet. One that ended
	 * while the store was still loading is newer than the stored one.
	 */
	private match: Nullable<IMatch>
	private readonly menu = new MenuManager()
	private readonly gui = new GUIHelper(this.menu)
	private readonly store = new RatingStore()
	private readonly watcher = new MatchWatcher(match => this.MatchEnded(match))

	constructor() {
		EventsSDK.on("Draw", this.Draw.bind(this))
		EventsSDK.on("GameEnded", () => this.watcher.GameEnded())
		EventsSDK.on("SharedObjectChanged", this.SharedObjectChanged.bind(this))
		EventsSDK.on("PlayerCustomDataUpdated", player => this.watcher.Player(player))
		Source2SDK.NativeEvents.on("RankData", this.RankData.bind(this))
		InputEventSDK.on("MouseKeyUp", this.MouseKeyUp.bind(this))
		InputEventSDK.on("MouseKeyDown", this.MouseKeyDown.bind(this))
	}

	protected get State() {
		return this.menu.State.value
	}

	protected get InGameUIState() {
		return GameState.UIState === DOTAGameUIState.DOTA_GAME_UI_DOTA_INGAME
	}

	public Draw() {
		if (this.State && !this.InGameUIState) {
			this.gui.Draw()
		} else {
			this.gui.Reset()
		}
	}

	public SharedObjectChanged(typeID: SOType, reason: number, msg: RecursiveMap) {
		if (typeID === SOType.Lobby) {
			this.watcher.Lobby(reason, msg, this.account)
			return
		}
		if (typeID !== SOType.GameAccountClient) {
			return
		}
		const account = msg.get("account_id")
		if (typeof account !== "number" || account === 0 || account === this.account) {
			return
		}
		this.account = account
		this.oldRating = 0
		this.games = []
		this.match = undefined
		this.gui.SetGames(this.games)
		this.loaded = this.store.Load(account).then(record => {
			if (this.account !== account) {
				return
			}
			if (record.rating !== undefined) {
				this.gui.SetRating(record.rating, 0)
				this.oldRating = record.rating
			}
			this.games = record.games.slice(0, MaxGames)
			this.gui.SetGames(this.games)
			this.match ??= record.match
		})
		const pending = this.pending
		if (pending !== undefined) {
			this.pending = undefined
			void this.loaded.then(() => this.setRating(pending))
		}
	}

	public RankData(
		rankType: ERankType,
		rankValue: number,
		_rankData1: number,
		_rankData2: number,
		_rankData3: number,
		_rankData4: number
	) {
		if (rankType !== ERankType.Ranked && rankType !== ERankType.RankedGlicko) {
			return
		}
		if (this.loaded === undefined) {
			this.pending = rankValue
			this.gui.SetRating(rankValue, 0)
			return
		}
		void this.loaded.then(() => this.setRating(rankValue))
	}

	/**
	 * A ranked match is over. One the history already holds only fills in a hero it went without;
	 * any other waits for the change of rating that follows it.
	 */
	public MatchEnded(match: IMatch) {
		const account = this.account
		if (account === undefined) {
			return
		}
		const index = this.games.findIndex(game => game.match === match.match)
		if (index === -1) {
			this.match = match
			this.store.SaveMatch(account, match)
			return
		}
		const recorded = this.games[index]
		if (recorded.hero !== undefined || match.hero === undefined) {
			return
		}
		this.games[index] = { ...recorded, hero: match.hero }
		this.gui.SetGames(this.games)
		this.store.SaveGames(account, this.games)
	}

	public MouseKeyUp(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyUp(key)
	}

	public MouseKeyDown(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyDown(key)
	}

	private setRating(rating: number) {
		if (this.oldRating === rating) {
			return
		}
		const previous = this.oldRating
		this.gui.SetRating(rating, previous)
		this.oldRating = rating
		const account = this.account
		if (account === undefined) {
			return
		}
		this.store.SaveRating(account, rating)
		if (previous !== 0) {
			this.addGame(account, rating - previous, rating)
		}
	}

	/**
	 * Puts the change of rating on the ranked match the client is still in or, past its lobby, on
	 * the match that ended last, when there is one it can be. A match still going makes the one
	 * that ended before it stale: its change never came.
	 */
	private addGame(account: number, delta: number, rating: number) {
		const now = Date.now()
		const match = this.match
		const candidate =
			this.watcher.Current ??
			(match !== undefined && now - match.ended < MatchExpiry ? match : undefined)
		const played =
			candidate !== undefined &&
			!this.games.some(game => game.match === candidate.match)
				? candidate
				: undefined
		this.games.unshift({
			delta,
			rating,
			at: played?.ended ?? now,
			hero: played?.hero,
			match: played?.match
		})
		if (this.games.length > MaxGames) {
			this.games.length = MaxGames
		}
		this.gui.SetGames(this.games)
		this.store.SaveGames(account, this.games)
		if (match !== undefined) {
			this.match = undefined
			this.store.SaveMatch(account, undefined)
		}
	}

	private shouldInput(key: VMouseKeys) {
		if (!this.State) {
			return false
		}
		if (key !== VMouseKeys.MK_LBUTTON && key !== VMouseKeys.MK_RBUTTON) {
			return false
		}
		return !this.InGameUIState
	}
})()
