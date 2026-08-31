// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** A quad the surface paints this frame. */
	interface IHudRect {
		readonly kind: "rect"
		x: number
		y: number
		w: number
		h: number
		color: number
		/** Corner radius in px; a card carries the menu's, a bar none. */
		radius?: number
		/** A backdrop filter, for the frosted card the menu's own panels use. */
		blur?: string
		borderWidth?: number
		borderColor?: number
		/**
		 * Carve the shape with the sdf shader instead of a plain border radius. A radius rasterizes on
		 * the pixel grid and shows its steps at pill size; the shader antialiases the edge. Opt-in,
		 * because the shader owns the background and a frosted card needs its own backdrop filter.
		 */
		sdf?: boolean
		/**
		 * Pixels the quad is grown by on every side, so the shader's antialiased edge falls inside the
		 * geometry instead of on its boundary, where it is clipped back to a hard one. The shape still
		 * lands on the box that was asked for. `sdf` only.
		 */
		inset?: number
		/**
		 * A soft halo that many pixels wide falling off from the shape's edge in {@link glowColor}:
		 * outside the shape while the width is positive, in which case the inset has to carry
		 * {@link GlowPad} of room for it, and inside it while the width is negative. `sdf` only.
		 */
		glow?: number
		glowColor?: number
	}
	/**
	 * A run of text in a box it is laid out inside, rather than at a computed corner. Centring it by
	 * arithmetic never lined up: the height a font reports is the glyph box, RmlUi lays out by the
	 * line box, and the leftover leading showed as a label sitting off the bar beside it. A line
	 * height equal to the box centres the glyphs exactly, and an alignment pins the edge without
	 * trusting a measured width.
	 */
	interface IHudText {
		readonly kind: "text"
		x: number
		y: number
		w: number
		h: number
		align: "left" | "right" | "center"
		text: string
		size: number
		weight: number
		color: number
		effect: EHudTextEffect
	}
	/**
	 * What a run of text is cut against the thing behind it with. A card carries its own glass and
	 * needs none of it; a run standing on the world does, because the map behind a label is not ours
	 * to darken and every colour loses to some wall somewhere.
	 *
	 * The widths are constant rather than following the font size, so the engine keeps one extra glyph
	 * layer per size rather than one per caller.
	 */
	const enum EHudTextEffect {
		None = 0,
		Shadow = 1,
		Outline = 2
	}
	/** Names of the glyph effects, in the order a dropdown offering them lists them. */
	const HudTextEffectNames: string[]
	/** An image the surface paints this frame. */
	interface IHudImage {
		readonly kind: "image"
		x: number
		y: number
		w: number
		h: number
		path: string
		color: number
		/** Corner radius in px, half the size for a round portrait. Rasterized, like every radius. */
		radius?: number
		/** Degrees clockwise about the image's own centre, for a glyph that carries a bearing. */
		angle?: number
	}
	/**
	 * A straight run of one thickness, drawn as a quad rotated about its left edge. RmlUi has no path
	 * API, so a line is geometry plus a shader that carves the rounded cap inside it.
	 */
	interface IHudStrip {
		readonly kind: "strip"
		x: number
		y: number
		length: number
		thickness: number
		angle: number
		color: number
	}
	/** A ring, or a disc when `filled`, drawn by the sdf circle so it stays round at any size. */
	interface IHudCircle {
		readonly kind: "circle"
		x: number
		y: number
		radius: number
		thickness: number
		color: number
		filled: boolean
		/** A halo on the same terms as {@link IHudRect.glow}; the quad carries its own room. */
		glow?: number
		glowColor?: number
	}
	/**
	 * A run of a circle's edge, from `start` clockwise by `sweep` radians. The capsules shader unions
	 * every segment of the run into one field and shades it once, so the whole arc is a single quad
	 * with no seam where two segments meet - a chain of {@link IHudStrip}s draws the same shape, but
	 * their rounded caps overlap at every joint and a translucent one beads there.
	 */
	interface IHudArc {
		readonly kind: "arc"
		x: number
		y: number
		radius: number
		thickness: number
		start: number
		sweep: number
		color: number
		/** The native capsule slot the geometry rides in, claimed by the emitter for this frame. */
		slot: number
	}
	/**
	 * A run of straight segments of one thickness, drawn as a single quad: the capsules shader unions
	 * every segment of the run into one field and shades it once, so a curve drawn this way carries
	 * no seam at any joint and none at any alpha. A chain of {@link IHudStrip}s draws the same shape,
	 * but their rounded caps overlap at every joint and a translucent one beads there.
	 */
	interface IHudPath {
		readonly kind: "path"
		/** The points the run passes through, as x, y pairs in screen px; two of them at least. */
		points: readonly number[]
		thickness: number
		color: number
		/** The native capsule slot the geometry rides in, claimed by the emitter for this frame. */
		slot: number
	}
	type HudCommand = IHudRect | IHudText | IHudImage | IHudStrip | IHudCircle | IHudArc | IHudPath
	/**
	 * One overlay's slice of the RmlUi document. The HUD keeps its immediate-mode API - a caller still
	 * emits a frame's worth of draw calls - and this turns that stream into pools of elements written
	 * straight through the world writers, so a frame costs no React render and an unchanged command
	 * costs nothing at all. Only growing a pool asks React for a pass.
	 */
	class CHudSurface {
		/**
		 * Whether this surface stands with the menu rather than over the world. The host's overlay
		 * gate closes on the game's own screens and outside a match, which is right for anything
		 * pinned to the world and wrong for a window the user opened the menu to use: a settings
		 * window belongs on the main menu as much as it does in a match.
		 */
		public MenuBound: boolean
		constructor(key: string, layer: EPanelLayer)
		/**
		 * The theme this surface's colours resolve against, which its layer decides: what is anchored
		 * to the world wears the world's theme, what stands on the screen wears the panels' one.
		 */
		public get Scope(): EThemeScope
		/**
		 * How strongly the whole surface is drawn, 0 to 1. RmlUi hands opacity down the tree and every
		 * element multiplies its own colours by it, so one write fades a card, its text and its
		 * shaders together - and costs nothing at all while the card stands at full strength.
		 */
		public Fade(value: number): void
		/** Places this world surface in the shared distance stack. */
		public Depth(distance: number): void
		/**
		 * Where this surface stands among its siblings. {@link CHudSurface.Depth} is this in world
		 * terms; a screen panel raised to the front of a stack of overlapping windows sets it
		 * directly.
		 */
		public Order(index: number): void
		public Open(): void
		/**
		 * A frame opens at its first command rather than on a call, so a caller drawing from more than
		 * one phase of the tick lands in one frame instead of having the earlier phase discarded.
		 */
		public Push(command: HudCommand): void
		/**
		 * Ends the frame: the surface takes its panel the first time it has anything to show, grows
		 * the pools a longer frame needs, and writes what is left onto the elements it already has.
		 *
		 * A grown pool asks its own layer for a render rather than the whole host: the registry
		 * tracks a version per stack, so invalidating the menu store would leave the new elements
		 * unbuilt until something unrelated refreshed - and refreshing all three stacks makes one
		 * unit's growth a re-render of every panel on screen.
		 */
		public Close(): void
		public Clear(): void
		/**
		 * Takes the surface off the panel host for good, for a thing that is gone rather than merely
		 * quiet: the host walks every panel registered with it on each refresh, and a surface kept for
		 * a rune that was picked up ten minutes ago is one more of those walks, every time, for the
		 * rest of the session. The elements die with the host's own unmount.
		 */
		public Destroy(): void
		/** One tick has finished drawing: flush what was pushed, or wipe a surface that drew nothing. */
		public Tick(): void
	}
	/**
	 * The surface a panel draws into, created on first use in the layer it belongs to and kept for
	 * the session. A surface anchored to the screen goes into `Screen`, which the host stacks over
	 * every world layer it hosts — a marker over a unit can then never cover a card.
	 */
	function HudSurfaceOf(key: string, layer: EPanelLayer): CHudSurface
	/**
	 * Drops the surface `key` was drawing on, if it ever drew: the caller has nothing left to put on
	 * it and nobody should tick it again. A key handed to {@link HudSurfaceOf} afterwards opens a
	 * fresh surface, so a thing that comes back gets one of its own.
	 *
	 * @example
	 * Events.on("EntityDestroyed", entity => DropHudSurface(`marker:${entity.Handle}`))
	 */
	function DropHudSurface(key: string): void
	/**
	 * Closes the tick for every surface, which the menu does for its host once every frame, after
	 * the last thing has drawn. While the host says an overlay may not draw — a screen of the game's
	 * own standing over the world, anything outside a match — whatever was pushed this tick is
	 * dropped and every surface wipes: the gate lives here so no consumer can draw across one by
	 * forgetting to ask.
	 */
	function EndHudFrame(): void
	/**
	 * How much of full opacity everything drawn onto the active surface keeps right now, 0 to 1.
	 * {@link CHudCard.Frame} sets it from the card's own alpha so the readings on the glass fade with
	 * it; opening or closing a surface puts it back to 1.
	 */
	function HudAlphaScale(): number
	/** Fades everything drawn onto the active surface from here on; the card frame calls it. */
	function SetHudAlphaScale(value: number): void
	/**
	 * Opens and closes the window a panel's content callback draws in. The surface's theme scope is
	 * entered along with it, so a colour the callback asks the menu for - `HudColors.accent`, a token,
	 * a blur - resolves against the theme that surface wears instead of the window's. It cannot be
	 * taken from the command: by the time one is pushed its colour is already a literal, and only the
	 * callback knows which surface it is drawing into. Surfaces nest: a panel drawn from inside
	 * another panel's callback hands the outer one back on close, scope and all.
	 */
	function SetActiveSurface(surface: Nullable<CHudSurface>): void
	/** Where every HUD primitive lands while a panel's content callback runs. */
	function EmitHud(command: HudCommand): void
	/**
	 * `#rrggbbaa`, from the engine's 0-255 alpha. Hex rather than `rgba()` because a colour also goes
	 * into `shader("rounded-rect …")`, whose arguments are separated by spaces: the commas and spaces
	 * of a functional notation split into junk tokens there, and the shader falls back to opaque
	 * white - which is why every line drew white whatever the menu picked.
	 */
	/**
	 * A colour as a command carries it: one number, so a frame of commands is compared and stored
	 * without walking a string per colour, and the literal below is built only for a command that
	 * actually changed.
	 *
	 * @example
	 * EmitHud({ kind: "rect", x, y, w, h, color: HudColor(HudColors.glass, hudAlpha()) })
	 */
	function HudColor(color: Color, alpha?: number): number
	function CssColor(color: Color, alpha?: number): string
}
