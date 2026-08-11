// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Keeps the core's analytic rounded clip on the window rect: the glass composite
	 * is multiplied by rounded-rect coverage in-shader instead of being cut by the
	 * 1x-rasterized stencil, so the glass edge stays smooth. State-based
	 * (x/y are window-space px, w/h are dp) and cleared once the menu has fully
	 * closed — the close animation keeps it — so other overlays' glass never
	 * inherits the menu's coverage.
	 */
	function SyncAnalyticClip(): void
}
