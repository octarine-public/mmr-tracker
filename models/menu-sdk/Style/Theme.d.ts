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
	/**
	 * Runs the listener whenever one scope repaints. Acting on it takes both a retint of that scope's
	 * tree and a re-render: a token style is rewritten in place, but an SDF fill bakes its hex into a
	 * decorator string, which only a render can rebuild.
	 */
	function OnPaletteChanged(listener: (scope: EThemeScope) => void): void
	/**
	 * Runs the listener whenever a scope's radius or text scale moves. A scaled metric is baked in
	 * when the style value is written, so the tree that changed has to be rebuilt rather than
	 * re-rendered - the listener is told which scope moved.
	 */
	function OnMetricsChanged(listener: (scope: EThemeScope) => void): void
	function ScaleMetric(property: string, value: number): number
	class CTheme {
		public get FontFamily(): string
		public readonly DefaultAccent: Color
		public get Accent(): Color
		public get PaletteEpoch(): number
		/**
		 * The glow the theme of the scope being drawn in asks its surfaces for. The object is rebuilt
		 * only when the theme moves, so a surface may read it every frame and compare it by identity.
		 *
		 * @example
		 * const width = Size(Theme.Glow.size)
		 */
		public get Glow(): IThemeGlow
		public get RadiusScale(): number
		public get FontScale(): number
		public get AccentHex(): string
		public get AccentSurface(): string
		public AccentAlpha(alpha: number): string
		/**
		 * The theme's glass blur at a fraction of its full strength, as a `backdrop-filter`
		 * value. A backdrop blur is not touched by the element's own opacity, so a glass
		 * surface that fades in or out has to ramp this alongside it - otherwise the frosted
		 * rectangle holds full strength for the whole fade and then snaps away with the
		 * element. Below a quarter of a dp the filter is dropped entirely, so a blur nobody
		 * can see costs nothing.
		 *
		 * @example
		 * applyStyle(panel, { opacity: t, backdropFilter: Theme.BlurAt(t) })
		 */
		public BlurAt(fraction: number): string
		/**
		 * The neutral an inert control paints instead of the accent, at the weight of muted text
		 * and mixed from the theme's own background and text so it fits any palette. Solid on
		 * purpose: it fills switch tracks and slider ranges, where the translucent text colours
		 * would blow out to white over a dark surface.
		 */
		public get InertAccent(): string
		/**
		 * The first of `candidates` that reads on `fill`, or the one that comes closest when none of
		 * them clear the bar. A control painting a fill of its own - a primary or a danger button -
		 * covers the surface the palette's text was picked against, and on a light theme the two land
		 * on top of each other. Order the candidates by preference: the colour a control wants is
		 * kept as long as it survives its own fill, and only swapped for the pole behind it when it
		 * does not.
		 *
		 * @example
		 * const label = Theme.ReadableOn(Theme.AccentHex, Theme.ValueOf("TextPrimary"), Theme.ValueOf("PopoverBg"))
		 */
		public ReadableOn(fill: string, ...candidates: string[]): string
		/**
		 * The accent as an inert control paints it. Everything under a switch that is off keeps
		 * its value and its contrast but drops the hue, so a page reads as "set up, not running"
		 * without fading the labels it is being read from.
		 */
		public AccentHexOf(inert: boolean): string
		public AccentAlphaOf(inert: boolean, alpha: number): string
		public ValueOf(token: keyof IThemePalette): string
		/**
		 * One scope's accent, whichever scope happens to be active. The plain {@link Accent} reads
		 * the active scope, which is what a component wants; a controller writing a scope it is not
		 * rendering in wants this.
		 */
		public AccentOf(scope: EThemeScope): Color
		/** One scope's glow, whichever scope happens to be active; {@link Glow} reads the active one. */
		public GlowOf(scope: EThemeScope): IThemeGlow
		/**
		 * Dresses one scope's surfaces in a glow: how far it reaches past their edge, in dp, how much
		 * of a color it keeps, and which color that is. A reach of nothing puts it out. It repaints
		 * the scope like a palette change, because that is what it is - the halo is baked into a
		 * decorator string, and only a fresh render rebuilds one.
		 *
		 * @example
		 * Theme.SetGlow({ size: 12, strength: 0.4, mode: EGlowColor.Accent, color: "" }, EThemeScope.Panels)
		 */
		public SetGlow(next: IThemeGlowSeed, scope?: EThemeScope): void
		/**
		 * Moves one scope's halo onto another color and tells nobody. A color that walks moves
		 * several times a second, and a palette change is a retint of every panel in the scope -
		 * while everything that draws a halo outside the menu window reads the glow every frame
		 * anyway. The window is the one that has to be told, and {@link SetGlow} is what tells it.
		 */
		public WalkGlow(color: string, scope?: EThemeScope): void
		public SetAccent(color: Color, scope?: EThemeScope): void
		public SetPalette(values: Partial<IThemePalette>, scope?: EThemeScope): void
		public ResetPalette(defaults: Partial<IThemePalette>, scope?: EThemeScope): void
		public SetMetrics(values: {
			radius?: number
			font?: number
		}, scope?: EThemeScope): void
	}
	const Theme: CTheme
	function SetPalette(values: Partial<IThemePalette>, scope?: EThemeScope): void
}
