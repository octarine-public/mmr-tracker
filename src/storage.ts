import { IGame, IMatch, ParseGames, ParseMatch } from "./history"

const StoreName = "mmr-tracker"
const LegacyRatingKey = "rating"

function RatingKey(account: number): string {
	return `rating.${account}`
}

function GamesKey(account: number): string {
	return `games.${account}`
}

function MatchKey(account: number): string {
	return `match.${account}`
}

/** What the tracker keeps for one game account. */
export interface IAccountRecord {
	readonly rating: Nullable<number>
	readonly games: IGame[]
	readonly match: Nullable<IMatch>
}

/**
 * Per game account: the last ranked rating seen, so the first rating after a restart is compared
 * against the same account's previous one; the recent games with what each of them paid out; and
 * the ranked match that ended without its change of rating in yet, so a restart between the two
 * still puts the change on that match. A rating saved before ratings were kept per account belongs
 * to no known account and is dropped. Writes run one after another, so an older value can never
 * land after a newer one. A storage failure is logged and the tracker keeps working from memory.
 */
export class RatingStore {
	private readonly storage = this.open()
	private queue: Promise<void> = this.storage
		.then(storage => storage?.remove(LegacyRatingKey))
		.catch(e => console.error("[mmr-tracker] storage:", e))

	public async Load(account: number): Promise<IAccountRecord> {
		const storage = await this.storage
		if (storage === undefined) {
			return { rating: undefined, games: [], match: undefined }
		}
		try {
			const [rating, games, match] = await Promise.all([
				storage.get<unknown>(RatingKey(account)),
				storage.get<unknown>(GamesKey(account)),
				storage.get<unknown>(MatchKey(account))
			])
			return {
				rating:
					typeof rating === "number" && Number.isFinite(rating)
						? rating
						: undefined,
				games: ParseGames(games),
				match: ParseMatch(match)
			}
		} catch (e) {
			console.error("[mmr-tracker] storage:", e)
			return { rating: undefined, games: [], match: undefined }
		}
	}

	public SaveRating(account: number, rating: number): void {
		this.write(storage => storage.set(RatingKey(account), rating))
	}

	public SaveGames(account: number, games: readonly IGame[]): void {
		this.write(storage => storage.set(GamesKey(account), games))
	}

	/** Keeps the match waiting for its rating, or forgets it once nothing waits. */
	public SaveMatch(account: number, match: Nullable<IMatch>): void {
		this.write(storage =>
			match === undefined
				? storage.remove(MatchKey(account))
				: storage.set(MatchKey(account), match)
		)
	}

	private write(op: (storage: LocalStorage) => Promise<void>): void {
		this.queue = this.queue
			.then(async () => {
				const storage = await this.storage
				if (storage !== undefined) {
					await op(storage)
				}
			})
			.catch(e => console.error("[mmr-tracker] storage:", e))
	}

	private async open(): Promise<Nullable<LocalStorage>> {
		try {
			return await SharedSDK.openLocalStorage(StoreName)
		} catch (e) {
			console.error("[mmr-tracker] storage:", e)
			return undefined
		}
	}
}
