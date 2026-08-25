// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** The corner every plain surface is carved with, and the one its glow follows. */
	const SurfaceRadius = 8
	const surfaceStyle: StyledFactory<{
		elevation: {
			flat: {}
			raised: {
				boxShadow: string
			}
		}
	}>
	const rowStyle: StyledFactory<{
		state: {
			normal: {}
			hovered: {
				backgroundColor: ThemeTokenRef
			}
			disabled: {
				opacity: number
				pointerEvents: "none"
			}
		}
	}>
	const textStyle: StyledFactory<{
		tone: {
			normal: {}
			muted: {
				color: ThemeTokenRef
			}
			accent: {
				color: ThemeTokenRef
			}
		}
	}>
	/**
	 * The theme's glow as the element it is drawn through, for a surface that hosts one: nothing at
	 * all while the theme asks for no glow. It goes first among the surface's children, and the
	 * surface carries {@link SdfGlowHost}.
	 *
	 * @example
	 * <div style={{ ...SdfGlowHost, ...card }}>
	 * 	<GlowLayer radius={12} />
	 * 	{children}
	 * </div>
	 */
	function GlowLayer(props: {
		radius: number
	}): React.ReactElement | null
	/**
	 * A card of the theme's own material. `glow` lights it with the theme's glow, which a surface
	 * standing on its own wants and one in a list of them does not - the glow says "this is a thing
	 * of its own", and a column of glowing cards says nothing at all.
	 */
	function Surface(props: {
		elevation?: "flat" | "raised"
		glow?: boolean
		style?: RmlStyle
		children?: React.ReactNode
	}): React.ReactElement
	function Row(props: {
		state?: "normal" | "hovered" | "disabled"
		style?: RmlStyle
		onClick?: (event: Event) => void
		onMouseOver?: (event: Event) => void
		onMouseOut?: (event: Event) => void
		children?: React.ReactNode
	}): React.ReactElement
	function Text(props: {
		tone?: "normal" | "muted" | "accent"
		style?: RmlStyle
		children?: React.ReactNode
	}): React.ReactElement
	/**
	 * Single-line label that hides overflow behind a fading edge instead of a hard cut.
	 * The fade is an overlay running from transparent into `base` — the resting fill of
	 * the surface behind the label — and it appears only when the text is measured to
	 * actually overflow; text that fits keeps a clean edge.
	 */
	function FadeLabel(props: {
		/** Resting background behind the clipped edge; the overlay dissolves into it. */
		base: StyleColor
		/** Ref to the clipping element, for callers that also measure or hint from it. */
		labelRef?: React.RefObject<HTMLElement>
		className?: string
		style?: RmlStyle
		onClick?: (event: Event) => void
		onMouseDown?: (event: Event) => void
		children?: React.ReactNode
	}): React.ReactElement
	function Icon(props: {
		path: string
		size?: number
		tint?: StyleColor
		round?: number
		className?: string
		style?: RmlStyle
	}): React.ReactElement | null
}
