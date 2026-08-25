// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** What one roll of the shuffler is allowed to change. */
	const enum EShuffleMode {
		/** Surfaces and accent together, around one hue drawn at random. */
		Whole = 0,
		/** The accent alone; the surfaces keep every color they were given. */
		Accent = 1,
		/** The surfaces alone; the accent keeps its hue and is only relit to stay readable. */
		Surfaces = 2,
		/** Surfaces and accent as {@link Whole}, rolled light instead of dark. */
		Light = 3
	}
	/** Display names of {@link EShuffleMode}, indexed by it. */
	const ShuffleModeNames: string[]
	/**
	 * Rolls a theme around one hue: surfaces at a random tint and depth, an accent on a harmony of
	 * that same hue, and both the text and the accent relit until they read on the background they
	 * landed on. Blur, opacity, corner radius and text size are carried over from `current` - a roll
	 * changes colors and nothing that moves the layout.
	 *
	 * @example
	 * host.Apply(RandomThemeSnapshot(EShuffleMode.Whole, host.Current()))
	 */
	function RandomThemeSnapshot(mode: EShuffleMode, current: IThemeSnapshot): IThemeSnapshot
}
