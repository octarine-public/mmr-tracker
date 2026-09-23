import "./translations"

import { GUIHelper } from "./gui"
import { MenuManager } from "./menu"
import { RatingStore } from "./storage"

new (class CMMRTracker {
	private oldRating = 0
	private account: Nullable<number>
	private pending: Nullable<number>
	private loaded: Nullable<Promise<void>>
	private readonly menu = new MenuManager()
	private readonly gui = new GUIHelper(this.menu)
	private readonly store = new RatingStore()

	constructor() {
		EventsSDK.on("Draw", this.Draw.bind(this))
		EventsSDK.on("SharedObjectChanged", this.SharedObjectChanged.bind(this))
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

	public SharedObjectChanged(typeID: SOType, _reason: number, msg: RecursiveMap) {
		if (typeID !== SOType.GameAccountClient) {
			return
		}
		const account = msg.get("account_id")
		if (typeof account !== "number" || account === 0 || account === this.account) {
			return
		}
		this.account = account
		this.oldRating = 0
		this.loaded = this.store.Load(account).then(rating => {
			if (rating !== undefined && this.account === account) {
				this.gui.SetRating(rating, 0)
				this.oldRating = rating
			}
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
		this.gui.SetRating(rating, this.oldRating)
		this.oldRating = rating
		if (this.account !== undefined) {
			this.store.Save(this.account, rating)
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
