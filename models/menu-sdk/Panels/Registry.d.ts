// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Which stack a panel stands in. The world and the cards are layer documents of their own and
	 * the cards are stacked over the world, so a card is never covered by something anchored to the
	 * world — not even by another package's overlays, which build the same layers.
	 *
	 * @example
	 * RegisterPanel("rune-markers", () => <Markers />, EPanelLayer.World)
	 */
	const enum EPanelLayer {
		/** Anchored to a point in the world: markers, ESP, anything the camera carries. */
		World = 0,
		/** Anchored to the screen: the cards a user places and drags. */
		Screen = 1,
		/**
		 * Part of the menu rather than of the HUD — the preview card and anything else that only
		 * stands while the menu is open. It shares the cards' layer, so the world never covers it
		 * either, but it wears the menu's theme instead of the one the panels are dressed in.
		 */
		Menu = 2
	}
	function MountPanels(): void
	/** Registers a panel in one of the host's stacks; returns the handle that takes it back out. */
	function RegisterPanel(key: string, render: () => React.ReactNode, layer?: EPanelLayer): () => void
	/**
	 * The theme a panel put in `layer` is drawn with. A panel that paints imperatively — a decorator
	 * string, a batched stroke — resolves its colours outside any render and needs this to ask for
	 * the ones the surface it paints is wearing.
	 *
	 * @example
	 * WithThemeScope(PanelScope(EPanelLayer.World), () => marker.Draw())
	 */
	function PanelScope(layer: EPanelLayer): EThemeScope
	function RefreshPanels(): void
	/**
	 * Re-renders one stack, leaving the others standing. What a panel of its own has to say rarely
	 * concerns the other two - a HUD surface grown an element, a profiler with a new reading - and a
	 * stack carries every panel in it, so the whole-host {@link RefreshPanels} makes one card's news
	 * everybody's work.
	 *
	 * @example
	 * RefreshPanelLayer(EPanelLayer.Screen)
	 */
	function RefreshPanelLayer(layer: EPanelLayer): void
	/** Re-renders the stack that wears `scope`; a no-op for a scope no stack stands in. */
	function InvalidatePanels(scope: EThemeScope): void
	/** Re-resolves the token-valued styles of the stacks wearing `scope`, after its palette moved. */
	function RetintPanels(scope: EThemeScope): void
	/** Rebuilds the stack that wears `scope`, for a change no re-render can carry. */
	function RemountPanels(scope: EThemeScope): void
	function ResetPanels(): void
	function TickPanels(): void
}
