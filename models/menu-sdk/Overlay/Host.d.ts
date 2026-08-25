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
	/**
	 * Closes what a new overlay replaces, keeping the one it is opened from: a panel carrying the row
	 * a popup hangs off has to outlive the click that opens the popup, or the settings of an element
	 * would close the preview panel they were asked for on. Modal-order overlays stay as they stay
	 * for {@link CloseOverlays}.
	 */
	function CloseOverlaysExcept(anchor: Nullable<HTMLElement>): void
	function TickOverlays(): void
	function ResetOverlays(): void
}
