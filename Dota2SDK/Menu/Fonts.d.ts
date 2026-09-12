// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface FontVariant {
		readonly family: string
		readonly file: string
		readonly weight: number
		readonly italic: boolean
		readonly fallback: boolean
		readonly language?: string
	}
	const FontsBase = "fonts/"
	const DefaultFamily = "Roboto"
	const FontRegistry: FontVariant[]
	function ActiveFonts(): FontVariant[]
	/**
	 * Families the font picker offers, in registry order: every family with a
	 * regular language-independent face, excluding pure fallbacks.
	 */
	function MenuFontFamilies(): string[]
	/** The weights the font weight picker offers, lightest first; the first is the default. */
	const FontWeightNames: string[]
	/**
	 * The typeface a surface is set in: a family the font picker offers, and a weight by its name
	 * in {@link FontWeightNames}. Part of a theme snapshot, one per surface the menu dresses.
	 */
	interface IThemeFont {
		family: string
		weight: string
	}
	/** The typeface a surface is set in until a theme says otherwise: the default family, regular. */
	function DefaultThemeFont(): IThemeFont
	/** Whether two themes are set in the same type. A theme that names none is set in the default one. */
	function fontsEqual(a: Nullable<IThemeFont>, b: Nullable<IThemeFont>): boolean
	/**
	 * Bumped whenever any surface's typeface moves. A writer that pins the face onto an element and
	 * rewrites it only when its own input moved - the HUD pools, whose commands say nothing about
	 * the face they are set in - watches this to know it owes the elements one more write.
	 */
	function FontEpoch(): number
	/** The family `scope` renders with, before language overrides; the active scope's by default. */
	function SelectedFontFamily(scope?: EThemeScope): string
	/**
	 * Selects the family `scope` renders with; names outside MenuFontFamilies fall back to the
	 * default. The caller re-applies the root font and invalidates.
	 */
	function SetMenuFontFamily(family: string, scope?: EThemeScope): void
	/** The name from {@link FontWeightNames} `scope` renders with; the active scope's by default. */
	function SelectedFontWeight(scope?: EThemeScope): string
	/**
	 * Selects the weight `scope` renders with by its name in {@link FontWeightNames}; names outside
	 * it fall back to regular. Returns whether the selection moved — a weight is baked into every
	 * written style, so the caller rebuilds the trees when it did.
	 */
	function SetMenuFontWeight(name: string, scope?: EThemeScope): boolean
	/**
	 * The weight text asking for `weight` is drawn at under the font weight setting of `scope` -
	 * the active one by default: raised to the setting's floor, never lowered, so heavier runs keep
	 * their emphasis. The style writers and the text measurers apply it themselves — callers keep
	 * passing design weights.
	 */
	function MenuFontWeight(weight: number, scope?: EThemeScope): number
	/**
	 * The family `scope` draws `language` in: the language's own face where one is shipped, the
	 * family selected for the scope otherwise.
	 */
	function FamilyForLanguage(language: string, scope?: EThemeScope): string
}
