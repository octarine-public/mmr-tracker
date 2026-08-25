// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const SwatchSize = 14
	const SwatchGap = 8
	/**
	 * Grows a swatch under the pointer, so the tiny click target visibly answers the hover.
	 * Returns the style fragment to spread into the swatch container on the current render.
	 */
	function useSwatchHover(target: {
		current: Nullable<HTMLElement>
	}, hovered: boolean): RmlStyle
	/** The color itself, over a checkerboard when it is not opaque. */
	function SwatchFill(props: {
		entry: ColorEntry
	}): React.ReactElement
	/**
	 * A color picker riding someone else's row: the swatch opens the palette, and the picker's name
	 * is what the hover says it stands for — a row carrying several of them has nowhere to write it.
	 * The middle click opens the picker's own context menu rather than the host row's, so copying and
	 * pasting a colour reaches the swatch under the pointer.
	 */
	function PairedSwatch(props: {
		entry: ColorEntry
	}): React.ReactElement
}
