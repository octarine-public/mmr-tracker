// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface IThemeSeeds {
		Background: string
		Surface: string
		Text: string
		Border: string
		GlassBlur: number
		Opacity: number
		/** Corner radius scale as a fraction, 1 = 100%. Omitted means 1. */
		Radius?: number
		/** Text size scale as a fraction, 1 = 100%. Omitted means 1. */
		TextScale?: number
	}
	const DefaultSeeds: IThemeSeeds
	const ThemePresets: Map<string, IThemeSeeds>
	function BuildPalette(seeds: IThemeSeeds): IThemePalette
}
