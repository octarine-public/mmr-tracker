const HeroPrefix = "npc_dota_hero_"

/** Games kept per account: enough to hold a long session whole. */
export const MaxGames = 50

/** The most games the panel lists at once; the menu picks how many under that. */
export const MaxListed = 10

/** How a stretch of games went: wins, losses and the rating they add up to. */
export interface ISummary {
	wins: number
	losses: number
	total: number
}

/** One ranked game: what it paid out and, when the match was seen, which hero was played. */
export interface IGame {
	/** The rating the game moved, below zero for a loss. */
	readonly delta: number
	/** The rating the game left behind. */
	readonly rating: number
	/** When the game ended, in ms since the epoch. */
	readonly at: number
	readonly hero?: string
	readonly match?: string
}

/** A ranked match that has ended and waits for the change of rating it brings. */
export interface IMatch {
	readonly match: string
	readonly ended: number
	readonly hero?: string
}

/**
 * How many of the newest games make the session still going: the newest ended within `gap` ms of
 * now, and each older one within `gap` of the game after it. A longer break starts a new session,
 * so none at all stands once the newest game is more than `gap` old.
 */
export function SessionLength(games: readonly IGame[], now: number, gap: number): number {
	let after = now
	for (let i = 0; i < games.length; i++) {
		const at = games[i].at
		if (after - at > gap) {
			return i
		}
		after = at
	}
	return games.length
}

/** Adds up the first `count` games into `out`. */
export function Summarize(games: readonly IGame[], count: number, out: ISummary): ISummary {
	out.wins = 0
	out.losses = 0
	out.total = 0
	for (let i = 0; i < count; i++) {
		const delta = games[i].delta
		if (delta > 0) {
			out.wins++
		} else if (delta < 0) {
			out.losses++
		}
		out.total += delta
	}
	return out
}

/**
 * The npc_dota_hero_* name, or nothing for anything else: before a pick the game answers
 * "npc_dota_units_base" or "", and either would be kept as a hero with no portrait.
 */
export function HeroName(value: unknown): Nullable<string> {
	return typeof value === "string" && value.startsWith(HeroPrefix) ? value : undefined
}

/** The games a store holds, dropping any entry an older build or a hand edit left malformed. */
export function ParseGames(value: unknown): IGame[] {
	if (!Array.isArray(value)) {
		return []
	}
	const games: IGame[] = []
	for (const raw of value) {
		if (typeof raw !== "object" || raw === null) {
			continue
		}
		const { delta, rating, at, hero, match } = raw as Record<string, unknown>
		if (!isNumber(delta) || !isNumber(rating) || !isNumber(at)) {
			continue
		}
		games.push({
			delta,
			rating,
			at,
			hero: HeroName(hero),
			match: typeof match === "string" ? match : undefined
		})
	}
	return games
}

export function ParseMatch(value: unknown): Nullable<IMatch> {
	if (typeof value !== "object" || value === null) {
		return undefined
	}
	const { match, ended, hero } = value as Record<string, unknown>
	if (typeof match !== "string" || !isNumber(ended)) {
		return undefined
	}
	return { match, ended, hero: HeroName(hero) }
}

function isNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value)
}
