// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type Palette = Record<string, string>
	type TokenSet<P> = {
		readonly [K in keyof P]: ThemeTokenRef
	}
	const AccentAlphas: readonly [0.06, 0.15, 0.25, 0.3, 0.4]
	function AccentAlphaToken(alpha: (typeof AccentAlphas)[number]): string
	function DefineTokens<P extends Record<keyof P, string>>(initial: P): TokenSet<P>
	function IsToken(value: unknown): value is ThemeTokenRef
	function ResolveToken(reference: ThemeTokenRef): string
	/**
	 * Resolves a style color to the `#rrggbb[aa]` literal an SDF decorator needs.
	 * Token references are looked up in the live palette, so the result is only
	 * valid for the render that produced it.
	 */
	function HexOf(color: StyleColor): string
	function OnPaletteChanged(listener: () => void): void
	function OnMetricsChanged(listener: () => void): void
	function ScaleMetric(property: string, value: number): number
	class CTheme {
		public get FontFamily(): string
		public readonly DefaultAccent: Color
		public get Accent(): Color
		public get PaletteEpoch(): number
		public get RadiusScale(): number
		public get FontScale(): number
		public get AccentHex(): string
		public get AccentSurface(): string
		public AccentAlpha(alpha: number): string
		/**
		 * The neutral an inert control paints instead of the accent, at the weight of muted text
		 * and mixed from the theme's own background and text so it fits any palette. Solid on
		 * purpose: it fills switch tracks and slider ranges, where the translucent text colours
		 * would blow out to white over a dark surface.
		 */
		public get InertAccent(): string
		/**
		 * The accent as an inert control paints it. Everything under a switch that is off keeps
		 * its value and its contrast but drops the hue, so a page reads as "set up, not running"
		 * without fading the labels it is being read from.
		 */
		public AccentHexOf(inert: boolean): string
		public AccentAlphaOf(inert: boolean, alpha: number): string
		public ValueOf(token: keyof IThemePalette): string
		public SetAccent(color: Color): void
		public SetPalette(values: Partial<IThemePalette>): void
		public ResetPalette(defaults: Partial<IThemePalette>): void
		public SetMetrics(values: {
			radius?: number
			font?: number
		}): void
	}
	const Theme: CTheme
	function SetPalette(values: Partial<IThemePalette>): void
}
