// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Style fragment for a flat rounded fill rendered by the analytic SDF pipeline:
	 * the radius (and optional border) live in the shader decorator string and the
	 * element keeps border-radius 0, so RmlUi hands the decorator a plain quad and
	 * the shader owns the edge — per-pixel coverage AA. Colors
	 * must be #rrggbb[aa] hex. The decorator embeds the color, so palette-reactive
	 * fills must re-apply this fragment on render (palette changes invalidate).
	 *
	 * The element must not carry a class whose stylesheet rule sets or transitions
	 * background-color: a class-change transition starts from the inline transparent
	 * value, overwrites it every frame, and removes the inline property on
	 * completion, leaving the rule's opaque border-radius-0 quad behind the shader.
	 */
	function SdfRounded(radius: number, fill: string, borderW?: number, borderColor?: string): RmlStyle
	/**
	 * The same fragment at an absolute radius, outside the theme's radius scale, and with the quad
	 * grown by `inset` pixels on every side so the antialiased edge stays off its boundary. What is
	 * drawn over the world keeps its own proportions — the menu's corner style is not its business —
	 * and the radius, like the border width, is in dp. `glowW` paints a soft halo that many px wide
	 * falling off outside the shape in `glowColor`; the inset has to leave room for it.
	 */
	function SdfShape(radius: number, fill: string, borderW?: number, borderColor?: string, inset?: number, glowW?: number, glowColor?: string): RmlStyle
	/**
	 * Style fragment for a circle rendered by the same pipeline: the radius always collapses to the
	 * element's half-extent, so the shape stays round at any size and skips the theme's radius scale
	 * — a ring around an avatar has to match the avatar, not the menu's corner style. `inset` grows
	 * the quad around the circle by that many pixels, keeping the antialiased edge off the geometry
	 * boundary, where the quad would clip it.
	 */
	function SdfCircle(fill: string, borderW?: number, borderColor?: string, inset?: number): RmlStyle
	/** SdfRounded with live theme palette colors, resolved at call time. */
	function SdfRoundedTheme(radius: number, fill: keyof IThemePalette, borderW?: number, borderColor?: keyof IThemePalette): RmlStyle
}
