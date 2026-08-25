// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Builds the page that dresses one surface outside the menu window for {@link Node.CustomPage}.
	 * The surface either follows the menu or wears a ready-made theme whole - colors, accent, blur,
	 * opacity, corners and text size - so there is nothing here to tune, only something to pick.
	 *
	 * @example
	 * panels.CustomPage = ThemeScopePage(
	 * 	EThemeScope.Panels,
	 * 	"The panels standing on the screen follow the menu, or wear a theme of their own.",
	 * 	() => this.Snapshot()
	 * )
	 */
	function ThemeScopePage(scope: EThemeScope, hint: string, menuTheme: () => IThemeSnapshot): () => React.ReactNode
}
