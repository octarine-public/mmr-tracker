import { HeroName, IMatch } from "./history"

/** `CSODOTALobby.LobbyType.COMPETITIVE_MATCH`: the queue a rating moves in. */
const RankedLobby = 7
/** `CSODOTALobby.State.POSTGAME`. */
const PostGameState = 3
/** The reason a shared object is handed over with when the client lets go of it. */
const LobbyDestroyed = 2
const SteamID64Base = 76561197960265728n

/**
 * Follows the ranked match the client plays - its id from the lobby, the hero from the local
 * player once one is picked - and hands it over when it ends, for a change of rating that comes
 * only after the client let go of it. A hero learnt after the handover hands the same match over
 * again.
 */
export class MatchWatcher {
	private lobby: unknown
	private ranked = false
	private match = ""
	private hero: Nullable<string>
	private handed: Nullable<IMatch>

	constructor(private readonly ended: (match: IMatch) => void) {}

	/**
	 * The ranked match the client is still in, once a hero is picked. The game coordinator sends
	 * the change of rating before the client lets go of the lobby, so a change that comes while
	 * the match lasts is its own, not the one of the match handed over before it.
	 */
	public get Current(): Nullable<IMatch> {
		if (!this.ranked || this.match === "" || this.hero === undefined) {
			return undefined
		}
		const handed = this.handed
		return {
			match: this.match,
			ended: handed?.match === this.match ? handed.ended : Date.now(),
			hero: this.hero
		}
	}

	public Lobby(reason: number, msg: RecursiveMap, account: Nullable<number>): void {
		const lobby = msg.get("lobby_id")
		if (lobby !== this.lobby) {
			this.lobby = lobby
			this.match = ""
			this.hero = undefined
		}
		this.ranked = msg.get("lobby_type") === RankedLobby
		const match = msg.get("match_id")
		if ((typeof match === "bigint" || typeof match === "number") && match > 0) {
			this.match = match.toString()
		}
		if (account !== undefined) {
			this.hero = memberHero(msg, account) ?? this.hero
		}
		const outcome = msg.get("match_outcome")
		if (
			msg.get("state") === PostGameState ||
			(typeof outcome === "number" && outcome > 0)
		) {
			this.handOver()
		}
		if (reason === LobbyDestroyed) {
			this.GameEnded()
			this.forget()
		}
	}

	public Player(player: PlayerCustomData): void {
		if (!player.IsLocalPlayer) {
			return
		}
		if (this.match === "") {
			const match = Dota2SDK.GameRules?.MatchID ?? 0n
			if (match > 0n) {
				this.match = match.toString()
			}
		}
		const hero = HeroName(player.Hero?.Name ?? player.HeroName)
		if (hero === undefined || hero === this.hero) {
			return
		}
		this.hero = hero
		if (this.handed?.match === this.match) {
			this.handOver()
		}
	}

	/**
	 * The client has left the game. Only a match that got as far as a pick counts as played:
	 * the client also leaves the main menu's own map on its way into a match.
	 */
	public GameEnded(): void {
		if (this.hero !== undefined) {
			this.handOver()
		}
	}

	/** Past its lobby nothing the client plays belongs to the match: a demo hero is no pick. */
	private forget(): void {
		this.lobby = undefined
		this.ranked = false
		this.match = ""
		this.hero = undefined
	}

	private handOver(): void {
		if (!this.ranked || this.match === "") {
			return
		}
		const handed = this.handed
		const same = handed?.match === this.match
		if (same && handed.hero === this.hero) {
			return
		}
		this.handed = {
			match: this.match,
			ended: same ? handed.ended : Date.now(),
			hero: this.hero
		}
		this.ended(this.handed)
	}
}

function memberHero(msg: RecursiveMap, account: number): Nullable<string> {
	const members = msg.get("all_members")
	if (!Array.isArray(members)) {
		return undefined
	}
	const steamID = SteamID64Base + BigInt(account)
	for (const member of members as RecursiveMap[]) {
		if (member.get("id") !== steamID) {
			continue
		}
		const heroID = member.get("hero_id")
		return typeof heroID === "number" && heroID > 0
			? HeroName(UnitData.GetHeroNameByID(heroID))
			: undefined
	}
	return undefined
}
