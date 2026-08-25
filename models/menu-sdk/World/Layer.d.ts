// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const ShapeInset = 1
	/**
	 * The twelve edges of a box, as index pairs into the eight corners a projection writes: the
	 * base ring, the ring above it, then the verticals joining the two.
	 */
	const BoxEdges: number[]
	const StubFraction = 0.15
	const StubMax = 14
	function fine(value: number): number
	function coarse(value: number): number
	function shapeDecorator(radius: number, style: WorldShapeStyle): string
	function acquireElement(root: HTMLElement): HTMLElement
	/** Writes a centered text run at `x, y`; shared by nodes, immediate text and unit labels. */
	function WriteTextRun(element: HTMLElement, text: string, style: WorldTextStyle, x: number, y: number): void
	class CWorldLayer implements IWorldLayer {
		constructor(key: string)
		public Root(): HTMLElement
		/** The fade origin as a point this frame, or undefined without one. */
		public OriginPoint(): Nullable<WorldPoint>
		public Node(): IWorldNode
		public Drop(node: IWorldNode): void
		public Line(from: WorldPoint, to: WorldPoint, stroke: WorldStroke): void
		public Chain(points: ArrayLike<number>, segments: number, stroke: WorldStroke): void
		public Box3D(bounds: Readonly<WorldUnitBounds>, stroke: WorldStroke, stubs?: boolean): void
		public GroundCircle(center: WorldPoint, radiusUnits: number, stroke: WorldStroke): void
		public Text(at: WorldPoint, text: string, style: WorldTextStyle): void
		public Circle(at: WorldPoint, radius: number, style: WorldShapeStyle): void
		public Rect(at: WorldPoint, width: number, height: number, style: WorldShapeStyle): void
		public Bar(at: WorldPoint, width: number, height: number, fraction: number, style: WorldBarStyle): void
		public Image(at: WorldPoint, path: string, width: number, height: number): void
		public FadeOrigin(origin: Nullable<WorldAnchor>): void
		public SetVisible(on: boolean): void
		public Clear(): void
		public Destroy(): void
		/**
		 * Opens the layer's drawing pass for this frame, capturing the camera on the first call.
		 * Immediate calls open it from the script's Draw phase; widget hosts open it at tick.
		 */
		public BeginPass(): boolean
		/** A fresh pooled-style element in the layer's root, for a widget's own use. */
		public AcquireElement(): HTMLElement
		/** Frame flush: retained nodes re-project, immediate batches land, stale elements hide. */
		public Tick(): void
	}
	/** The layer registered under `key`, created on first use and kept for the session. */
	function GetOrCreateWorldLayer(key: string): CWorldLayer
	/** Flushes every world layer once; the menu tick drives this. */
	function TickAllWorldLayers(): void
}
