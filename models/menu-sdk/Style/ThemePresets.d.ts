// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface IThemeSeeds {
		Background: string
		/**
		 * Color of a card raised above the background. Its alpha is the solidity of the edges drawn
		 * from it - the card, plate and input borders - never of their fills: a fill is faded by
		 * {@link IThemeSeeds.Opacity} alone, so a glass theme keeps its cards readable.
		 */
		Surface: string
		Text: string
		/**
		 * Color of the window frame, the dividers and the controls derived from it. Its alpha carries
		 * into every edge it feeds, the pill's included.
		 */
		Border: string
		GlassBlur: number
		Opacity: number
		/** Corner radius scale as a fraction, 1 = 100%. Omitted means 1. */
		Radius?: number
		/** Text size scale as a fraction, 1 = 100%. Omitted means 1. */
		TextScale?: number
		/** Whether a surface is lit with a glow around it. Omitted means none. */
		Glow?: boolean
		/** How far the glow reaches past a surface's edge, in dp. Omitted means the default reach. */
		GlowSize?: number
		/** How much of the accent the glow keeps, 0..1. Omitted means the default strength. */
		GlowStrength?: number
	}
	const DefaultSeeds: IThemeSeeds
	const ThemePresets: Map<string, IThemeSeeds>
	/**
	 * What a saved theme says about itself at a glance. Chosen by whoever saved it, the way a cloud
	 * config carries its play style rather than being guessed from the colors - a theme built on a
	 * near-black background can still be meant as the light one of a pair.
	 */
	const enum EThemeBadge {
		/** No label; the card shows nothing. */
		None = 0,
		Light = 1,
		Dark = 2,
		Blur = 3
	}
	/** Display names of {@link EThemeBadge}, indexed by it. */
	const ThemeBadgeNames: string[]
	/**
	 * Whether `value` carries every seed a theme needs. Both the stored themes and the per-surface
	 * themes come off disk as `unknown`, and half a theme is worse than none.
	 */
	function IsThemeSeeds(value: unknown): value is IThemeSeeds
	function BuildPalette(seeds: IThemeSeeds): IThemePalette
}
