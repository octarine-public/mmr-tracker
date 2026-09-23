const StoreName = "mmr-tracker"
const LegacyRatingKey = "rating"

function RatingKey(account: number): string {
	return `rating.${account}`
}

/**
 * The last ranked rating seen per game account, kept on disk so the first rating after a
 * restart is compared against the same account's previous one. A rating saved before ratings
 * were kept per account belongs to no known account and is dropped. Writes run one after
 * another, so an older rating can never land after a newer one. A storage failure is logged
 * and the tracker keeps working from memory.
 */
export class RatingStore {
	private readonly storage = this.open()
	private queue: Promise<void> = this.storage
		.then(storage => storage?.remove(LegacyRatingKey))
		.catch(e => console.error("[mmr-tracker] storage:", e))

	public async Load(account: number): Promise<Nullable<number>> {
		const storage = await this.storage
		if (storage === undefined) {
			return undefined
		}
		try {
			const rating = await storage.get<unknown>(RatingKey(account))
			return typeof rating === "number" && Number.isFinite(rating)
				? rating
				: undefined
		} catch (e) {
			console.error("[mmr-tracker] storage:", e)
			return undefined
		}
	}

	public Save(account: number, rating: number): void {
		this.queue = this.queue
			.then(async () => {
				const storage = await this.storage
				await storage?.set(RatingKey(account), rating)
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
