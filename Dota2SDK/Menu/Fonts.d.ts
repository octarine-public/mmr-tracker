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
	 * The family the menu currently renders with, before language overrides.
	 */
	function SelectedFontFamily(): string
	/**
	 * Selects the menu font family; names outside MenuFontFamilies fall back
	 * to the default. The caller re-applies the root font and invalidates.
	 */
	function SetMenuFontFamily(family: string): void
	/**
	 * The name from {@link FontWeightNames} the menu currently renders with.
	 */
	function SelectedFontWeight(): string
	/**
	 * Selects the menu font weight by its name in {@link FontWeightNames}; names outside it
	 * fall back to regular. Returns whether the selection moved — a weight is baked into
	 * every written style, so the caller rebuilds the trees when it did.
	 */
	function SetMenuFontWeight(name: string): boolean
	/**
	 * The weight text asking for `weight` is drawn at under the font weight setting: raised to
	 * the setting's floor, never lowered, so heavier runs keep their emphasis. The style writers
	 * and the text measurers apply it themselves — callers keep passing design weights.
	 */
	function MenuFontWeight(weight: number): number
	function FamilyForLanguage(language: string): string
}
