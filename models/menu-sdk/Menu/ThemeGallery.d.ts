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
		/** Rolls a random theme onto the controls, as the Shuffle button on Customization does. */
		Shuffle(): void
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
	function snapshotsEqual(a: IThemeSnapshot, b: IThemeSnapshot): boolean
	function seedsEqual(a: IThemeSeeds, b: IThemeSeeds): boolean
	/**
	 * The label a saved theme carries on its card. Unlike a config's play style this is about how the
	 * theme looks, so it stays visible without hovering - a grid of cards is meant to be scanned.
	 */
	function ThemeBadgeTag(props: {
		badge?: EThemeBadge
		blur?: boolean
		style?: RmlStyle
	}): React.ReactElement | null
	function ThemeCard(props: {
		name: string
		seeds: IThemeSeeds
		accent: string
		active: boolean
		width: number
		last: boolean
		onApply: () => void
		/** The theme's own labels. Shown whether or not the card is hovered, unlike the actions. */
		badge?: EThemeBadge
		/** Whether the theme carries the independent Blur label. */
		blur?: boolean
		/**
		 * Everything that can be done to this theme, as rows of one menu: a card is a picture of a
		 * theme first, and a strip of icon buttons over it costs more to read than it saves. The
		 * menu opens from the button in the card's own corner and from a right click anywhere on it.
		 */
		menu?: CfgAction[]
		/** Hover actions kept on the card itself, for the one-click ones — the gallery's like. */
		actions?: React.ReactNode
		/** Small muted line under the name row — the cloud page shows share codes. */
		subtitle?: string
		/** Changes when this card is the answer to something, and pulses once when it does. */
		flash?: number
	}): React.ReactElement
	/**
	 * The card that keeps the current theme. It only opens while there is something to keep: a theme
	 * already saved would come back as a second copy of itself, indistinguishable from the first and
	 * marked as worn beside it, so the card says so instead of taking a name for one.
	 */
	function SaveCard(props: {
		width: number
		unsaved: boolean
		onSave: (name: string) => void
		/** Answers a click the card has nothing to do with, so a press is never met with silence. */
		onRefused?: () => void
	}): React.ReactElement
}
