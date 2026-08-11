// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const RecentSearchesKey = "__recentSearches"
	/**
	 * Remembers an entry opened through search; a repeat moves it to the top.
	 */
	function PushRecentSearch(path: readonly string[]): void
	/**
	 * Drops one remembered entry.
	 */
	function RemoveRecentSearch(path: readonly string[]): void
	/**
	 * Drops the whole remembered list.
	 */
	function ClearRecentSearches(): void
	/**
	 * Entries opened through search, freshest first. Only paths are stored, so each
	 * read resolves them against the tree anew: a renamed or removed entry simply
	 * leaves the list instead of leading nowhere.
	 */
	function RecentSearches(): SearchHit[]
	function SerializeRecentSearches(): string[][]
	function ApplyRecentSearches(stored: unknown): void
}
