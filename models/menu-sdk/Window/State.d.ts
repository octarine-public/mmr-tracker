// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type LayoutMode = "side" | "top"
	interface WindowState {
		x: number
		y: number
		w: number
		h: number
		rail: number
		sub: number
		collapsed: boolean
		layout: LayoutMode
		opened: boolean
	}
	const MinWidth = 560
	const MinHeight = 600
	const DefaultWidth = 1104
	const DefaultHeight = 704
	const WindowMargin = 24
	const RailMin = 48
	const RailDefault = 176
	const RailMax = 280
	const RailNarrow = 120
	const SubMin = 120
	const SubMax = 300
	const MainMin = 360
	const TopNavH = 52
	const TopBarH = 52
	const RailHeaderH = 100
	const CollapseRowH = 40
	const ControlsRowH = 64
	const ControlsRowVerticalH = 156
	function WindowSnapshot(): WindowState
	/**
	 * Places an absolutely positioned overlay element centered over the menu
	 * window, falling back to the screen center while the window is closed,
	 * clamped to the screen. Returns false while the element has no layout
	 * size yet and was left untouched.
	 */
	function CenterOverWindow(element: HTMLElement): boolean
	function WindowVersion(): number
	function SubscribeWindow(onChange: () => void): () => void
	function UpdateWindow(patch: Partial<WindowState>): void
	function SaveWindowState(): void
	function NotifyWindow(): void
	function ClampWindow(patch?: Partial<WindowState>): void
	/**
	 * Repositions the window across a menu scale change so the layout point under
	 * the cursor keeps its screen position — the control that triggered the change
	 * stays under the cursor instead of sliding away with the resize. Skipped when
	 * the cursor is outside the window.
	 */
	function AnchorWindowToScale(previous: number, next: number): void
	function RailIsIconOnly(): boolean
	interface WindowColumns {
		rail: number
		sub: number
		main: number
	}
	/**
	 * Resolves the rendered width of the three window columns. The rail and the sub
	 * panel keep their stored width as a preference; whatever does not fit next to
	 * a {@link MainMin} wide content column is taken back from the sub panel first
	 * and from the rail second, so a narrow window never squeezes the controls out
	 * of the frame and a widened one restores both panels on its own.
	 *
	 * @example
	 * const widths = WindowColumnWidths(WindowSnapshot(), showSub)
	 * const mainLeft = widths.rail + widths.sub
	 */
	function WindowColumnWidths(snapshot: WindowState, showSub: boolean): WindowColumns
	function WindowConfigValue(): Omit<WindowState, "opened">
	function ApplyWindowConfig(value: unknown): void
}
