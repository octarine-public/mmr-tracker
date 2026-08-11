// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Everything a theme preset captures: the seed colors plus the accent. */
	interface IThemeSnapshot {
		seeds: IThemeSeeds
		accent: string
	}
	/**
	 * Bridge between the preset gallery and whoever owns the theme controls: the
	 * gallery reads the current theme through it and writes an applied preset back,
	 * so the pickers, the palette and the config stay the single source of truth.
	 */
	interface IThemeGalleryHost {
		Current(): IThemeSnapshot
		Apply(snapshot: IThemeSnapshot): void
	}
	/**
	 * Builds the theme presets page for {@link Node.CustomPage}: built-in and saved
	 * themes as preview blocks, click to apply, plus a block that saves the current
	 * theme under a chosen name.
	 * @example
	 * presets.CustomPage = ThemeGalleryPage({
	 * 	Current: () => this.Snapshot(),
	 * 	Apply: snapshot => this.LoadSnapshot(snapshot)
	 * })
	 */
	function ThemeGalleryPage(host: IThemeGalleryHost): () => React.ReactNode
}
