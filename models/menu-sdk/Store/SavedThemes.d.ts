// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const SavedThemesKey = "__savedThemes"
	/** A user-saved theme preset: the seed colors plus the accent they were tuned with. */
	interface SavedTheme {
		name: string
		accent: string
		seeds: IThemeSeeds
	}
	function SerializeSavedThemes(): SavedTheme[]
	function ApplySavedThemes(stored: unknown): void
}
