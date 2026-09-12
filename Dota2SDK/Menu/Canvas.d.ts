// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Image presentation in screen pixels. A source rectangle selects a sprite sheet frame. */
	interface CanvasImageStyle {
		readonly color?: Color
		readonly radius?: number
		readonly circle?: boolean
		readonly angle?: number
		readonly grayscale?: boolean
		readonly clip?: Rectangle
		readonly sourcePosition?: Vector2
		readonly sourceSize?: Vector2
		readonly fit?: "cover" | "stretch"
	}
	/** An analytic shape, with the stroke centred on its boundary. Angles are clockwise degrees. */
	interface CanvasShapeStyle {
		readonly color?: Color
		readonly borderColor?: Color
		readonly borderWidth?: number
		readonly radius?: number
		readonly start?: number
		readonly sweep?: number
	}
	/** Text measured and painted in the same RmlUi face and pixel size. */
	interface CanvasTextStyle {
		readonly color?: Color
		readonly family?: string
		readonly size?: number
		readonly weight?: number
		readonly italic?: boolean
		readonly outline?: boolean
		readonly flags?: TextFlags
		readonly division?: number
	}
	/** The natural image size reported by RmlUi. */
	function ImageSize(path: string): Vector2
	/** The size of a text run in screen pixels. */
	function TextSize(text: string, style?: CanvasTextStyle): Vector3
	/**
	 * A script's RmlUi surface in screen pixels. Project world anchors before painting; the surface
	 * pools DOM elements, updates changed properties, and hides anything omitted from the next frame.
	 * @example
	 * const canvas = new Canvas("cooldowns")
	 * canvas.Image(ability.TexturePath, position, size, { radius: 4 })
	 */
	class Canvas {
		constructor(key: string, layer?: EPanelLayer)
		/** Hides the surface immediately. */
		public Clear(): void
		/** Paints a rectangular image with optional clipping, tint, rotation and desaturation. */
		public Image(path: string, position: Vector2, size: Vector2, style?: CanvasImageStyle): void
		/** Paints a square frame from a horizontal sprite sheet once its intrinsic size is available. */
		public Sprite(path: string, position: Vector2, size: Vector2, frame: number, style?: CanvasImageStyle): void
		/** Paints a rectangle or a swept rectangle. */
		public Rect(position: Vector2, size: Vector2, style?: CanvasShapeStyle): void
		/** Paints a disc, ring or sector with the same analytic edge as rectangles. */
		public Circle(position: Vector2, size: Vector2, style?: CanvasShapeStyle): void
		/** Paints a line between screen positions. */
		public Line(start: Vector2, end: Vector2, color: Color, width?: number): void
		/** Draws a closed world polygon, projecting each vertex once per frame. */
		public WorldPolygon(points: readonly Vector3[], color: Color, width?: number): void
		/** A line ending in two arrow strokes. */
		public LineArrow(start: Vector2, end: Vector2, color: Color, width?: number, length?: number, angle?: number): void
		/** Paints a text run at its top-left corner. */
		public Text(text: string, position: Vector2, style?: CanvasTextStyle): void
		/** Paints text aligned within a rectangle, at an explicit size or a fraction of its height. */
		public TextIn(text: string, box: Rectangle, style?: CanvasTextStyle): void
		/** Paints a readout next to the cursor. */
		public CursorText(text: string, style?: CanvasTextStyle): void
	}
}
