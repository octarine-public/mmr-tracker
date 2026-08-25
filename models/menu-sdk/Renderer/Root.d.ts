// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	class MenuRoot {
		/**
		 * A React root over one layer element. Everything it renders resolves the theme against
		 * `scope`, so the panels and the world overlays can wear a palette the menu window does not.
		 *
		 * @example
		 * new MenuRoot(Layers().cards, EThemeScope.Panels)
		 */
		constructor(target: Container, scope?: EThemeScope)
		public Render(node: React.ReactNode): void
		public Tick(): void
		public Unmount(): void
	}
}
