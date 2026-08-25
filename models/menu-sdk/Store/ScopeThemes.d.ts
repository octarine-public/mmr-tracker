// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const ScopeThemesKey = "__scopeThemes"
	/**
	 * The surfaces that can wear a theme of their own. The menu is not among them: its theme is the
	 * one the Customization controls build, and a second copy of it would be a second source of truth.
	 */
	const ScopedThemeScopes: readonly EThemeScope[]
	/** The theme `scope` wears of its own, or nothing when it follows the menu. */
	function ScopeThemeOf(scope: EThemeScope): Nullable<IThemeSnapshot>
	/**
	 * Dresses one surface in a theme of its own; `undefined` hands it back to the menu's.
	 *
	 * @example
	 * SetScopeTheme(EThemeScope.World, { seeds: { ...preset }, accent })
	 */
	function SetScopeTheme(scope: EThemeScope, snapshot: Nullable<IThemeSnapshot>): void
	/**
	 * Bumped whenever a surface is dressed or a stored config is applied. A theme restored from disk
	 * moves no control and fires no listener, so whoever pushes the palettes watches this instead.
	 */
	function ScopeThemesEpoch(): number
	function SerializeScopeThemes(): Record<string, IThemeSnapshot>
	function ApplyScopeThemes(stored: unknown): void
}
