// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const SavedThemesKey = "__savedThemes"
	/** A user-saved theme preset: the seed colors plus the accent they were tuned with. */
	interface SavedTheme {
		name: string
		accent: string
		seeds: IThemeSeeds
	}
	function SavedThemesList(): readonly SavedTheme[]
	/** Adds a theme under `name`, replacing a saved theme of the same name. */
	function SaveTheme(theme: SavedTheme): void
	function RemoveSavedTheme(name: string): void
	function SerializeSavedThemes(): SavedTheme[]
	function ApplySavedThemes(stored: unknown): void
}
