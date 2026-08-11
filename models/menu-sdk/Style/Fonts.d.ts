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
	/**
	 * The family the menu currently renders with, before language overrides.
	 */
	function SelectedFontFamily(): string
	/**
	 * Selects the menu font family; names outside MenuFontFamilies fall back
	 * to the default. The caller re-applies the root font and invalidates.
	 */
	function SetMenuFontFamily(family: string): void
	function FamilyForLanguage(language: string): string
}
