// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function MarkColorOf(entry: Entry): string
	function VisibleRows(children: Entry[], skip?: Entry): Entry[]
	function CloseSubSettings(): void
	function DescriptionRow(props: {
		entry: DescriptionEntry
		divider: boolean
	}): React.ReactElement
	/**
	 * The switch itself, detached from any entry: the same track, knob, classes and easing the
	 * menu's toggle rows wear, driven by a plain boolean — for a surface whose state lives
	 * somewhere no entry stands for, a floating window's sidebar being the one so far.
	 */
	function SwitchFace(props: {
		on: boolean
		inert?: boolean
		scope?: EThemeScope
		style?: RmlStyle
	}): React.ReactElement
	function ToggleTrack(props: {
		entry: ToggleEntry
	}): React.ReactElement
	function ToggleRow(props: {
		entry: ToggleEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function SliderRow(props: {
		entry: SliderEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function SliderTrack(props: {
		entry: SliderEntry
	}): React.ReactElement
	function DropdownRow(props: {
		entry: DropdownEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	/**
	 * The preset selector's bare dropdown chip, for the window's top bar: no row and no label,
	 * just the selected preset opening the panel.
	 */
	function PresetsHeader(props: {
		entry: PresetsEntry
	}): React.ReactElement
	function PresetsRow(props: {
		entry: PresetsEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function MultiSelectRow(props: {
		entry: MultiSelectEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function KeybindRow(props: {
		entry: KeybindEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ButtonRow(props: {
		entry: ButtonEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ColorSwatch(props: {
		entry: ColorEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function TextField(props: {
		entry: TextEntry
		style?: RmlStyle
		radius?: number
		leadIcon?: string
		placeholder?: string
		/**
		 * Laid-out width of the field in dp. Only the placeholder needs it: a hint that does not fit
		 * the remaining room falls back to the generic "Search" instead of running past the field.
		 */
		width?: number
		/**
		 * Drops the field's own chrome — the surface fill, border, focus ring and horizontal
		 * padding — so typing starts where the host lays the field out. For hosts that draw
		 * the surroundings themselves, like the search modal's input row.
		 */
		bare?: boolean
		/**
		 * Paints the border in the danger tone while the entered value is known to be rejected —
		 * a share code the server refused. The host derives it from the current text, so the
		 * tint clears as soon as the value is edited.
		 */
		invalid?: boolean
		autoFocus?: boolean
		onKeyDown?: (event: Event) => boolean
	}): React.ReactElement
	function TextInputRow(props: {
		entry: TextEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ImageSelectorRow(props: {
		entry: ImagesEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement | null
	function RenderControl(entry: Entry, divider?: boolean, nested?: boolean): React.ReactNode
}

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
	 * surface carries {@link SdfGlowHost}. `fill` is what the surface under the halo is painted, so
	 * an adaptive theme lights it in its own color; without it the halo keeps the theme's one color.
	 *
	 * @example
	 * <div style={{ ...SdfGlowHost, ...card }}>
	 * 	<GlowLayer radius={12} fill={Theme.ValueOf("CardBg")} />
	 * 	{children}
	 * </div>
	 */
	function GlowLayer(props: {
		radius: number
		fill?: string
	}): React.ReactElement | null
	/**
	 * A card of the theme's own material. `glow` lights it with the theme's glow, which a surface
	 * standing on its own wants and one in a list of them does not - the glow says "this is a thing
	 * of its own", and a column of glowing cards says nothing at all.
	 *
	 * A lit card lays out as a block with its rows in a column of their own: the glow layer is an
	 * absolutely placed quad, and a flex parent would seat it as a zero-height first row — the halo
	 * then radiates from a line at the top instead of hugging the card.
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
	/**
	 * Single-line label that hides overflow behind a fading edge and, while `active`, scrolls the line
	 * so the whole of it can be read where it stands: it waits at its head, travels far enough to bring
	 * the tail in, waits there and comes back, for as long as the row asks. A line that fits is left
	 * alone and costs nothing — the row it sits in is what says when to read, so a nav row scrolls its
	 * own name under the cursor instead of standing a panel over it.
	 *
	 * The travel is one transform written by a tween, so nothing around the label lays out again while
	 * it reads, and it is snapped to whole screen pixels — a line resting between two of them is what
	 * makes glyphs shimmer as they move. Both edges carry a scrim dissolving into `base`, the resting
	 * fill of the surface behind the label, and they follow the travel: the head's comes up as the line
	 * leaves, the tail's goes out as it arrives.
	 *
	 * @example
	 * <ScrollLabel base={Theme.ValueOf("WindowBg")} active={hovered} style={{ flex: "0 1 auto" }}>
	 *     {name}
	 * </ScrollLabel>
	 */
	function ScrollLabel(props: {
		/** Resting background behind the clipped edges; the scrims dissolve into it. */
		base: StyleColor
		/** Scrolls a line that does not fit while true, and sends it home when it goes false. */
		active: boolean
		className?: string
		style?: RmlStyle
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

declare namespace MenuSDK {
	/**
	 * The world drawing surface for one script, created on first use and kept for the session.
	 * Draw from a `Draw` listener with the immediate calls, or set up retained nodes once and
	 * let them follow their anchors. On a host without an engine — the standalone menu — every
	 * call is a quiet no-op.
	 */
	function CreateWorldLayer(key: string): IWorldLayer
	/**
	 * Opens the shader slot pool for the frame ahead. The menu ticks after the game has drawn, so
	 * this is the end of its tick: a card pinned to the screen claims its slots from a `Draw` of the
	 * game's, a world overlay claims from the tick that follows, and both belong to the same frame -
	 * resetting between them handed one slot to two writers and the second one's geometry won.
	 */
	function EndWorldFrame(): void
	/** Ticks every unit overlay, then flushes every world layer; the menu tick drives this. */
	function TickWorldLayers(): void
}
