const HeroPrefix = "npc_dota_hero_"

/** Games kept per account; the menu picks how many of them the panel lists. */
export const MaxGames = 10

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
