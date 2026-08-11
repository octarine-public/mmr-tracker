// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface ScreenRect {
		x: number
		y: number
		w: number
		h: number
	}
	function PixelsPerDp(): number
	function ToLayoutUnits(screenValue: number): number
	function DpToPx(value: number): number
	function ElementScreenRect(element: HTMLElement): ScreenRect
	function ClampToScreen(x: number, y: number, w: number, h: number, marginPx?: number): [number, number]
	function MeasureTextDp(text: string, sizeDp: number, weight?: number): [number, number]
	/**
	 * Text size at a font size already in screen pixels, in the theme's own face, outside the
	 * font-scale setting — for callers that write `font-size` in px themselves and need the width
	 * the renderer will lay that exact line out at. Undefined until the host can answer.
	 */
	function MeasureTextPx(text: string, sizePx: number, weight?: number): Nullable<[number, number]>
	function HasOffsets(element: HTMLElement): boolean
	function ElementContentWidth(element: HTMLElement): number
	function ElementRect(element: HTMLElement): ScreenRect
	function LayoutViewport(): [number, number]
	function ClampToViewport(x: number, y: number, w: number, h: number, margin?: number): [number, number]
	function PlaceBelow(anchor: ScreenRect, w: number, h: number, gap?: number): [number, number]
}
