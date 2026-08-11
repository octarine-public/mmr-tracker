// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const OverlayOrder: {
		Tooltip: number
		Popup: number
		Modal: number
		Drag: number
	}
	function ShowOverlay(key: string, order: number, render: () => React.ReactNode): void
	function HideOverlay(key: string): void
	function IsOverlayOpen(key: string): boolean
	function HasInteractiveOverlays(): boolean
	/**
	 * Positional input test: modal- and drag-order overlays cover the screen and
	 * consume everywhere; popup-order overlays consume only while the cursor is
	 * inside a panel rect, so outside clicks fall through to the game while the
	 * panels' own scrims close them. Full-screen children (scrims) are skipped.
	 */
	function CursorOverOverlays(): boolean
	function CloseOverlays(): void
	function CloseOverlaysAbove(order: number): void
	function TickOverlays(): void
	function ResetOverlays(): void
}
