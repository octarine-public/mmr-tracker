const StoreName = "mmr-tracker"
const RatingKey = "rating"

/**
 * The last ranked rating seen, kept on disk so the first rating after a restart still has
 * something to be compared against. Writes run one after another, so an older rating can
 * never land after a newer one. A storage failure is logged and the tracker keeps working
 * from memory.
 */
export class RatingStore {
	private storage: Nullable<LocalStorage>
	private queue: Promise<void> = Promise.resolve()

	public async Load(): Promise<Nullable<number>> {
		try {
			const storage = await SharedSDK.openLocalStorage(StoreName)
			this.storage = storage
			const rating = await storage.get<unknown>(RatingKey)
			return typeof rating === "number" && Number.isFinite(rating)
				? rating
				: undefined
		} catch (e) {
			console.error("[mmr-tracker] storage:", e)
			return undefined
		}
	}

	public Save(rating: number): void {
		const storage = this.storage
		if (storage === undefined) {
			return
		}
		this.queue = this.queue
			.then(() => storage.set(RatingKey, rating))
			.catch(e => console.error("[mmr-tracker] storage:", e))
	}
}
