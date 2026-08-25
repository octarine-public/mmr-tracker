// AUTO-GENERATED - do not edit.
interface IRendererHost {
	readonly createFont: (path: string) => number
	readonly createTexture: (path: string) => [number, Vector2]
	readonly freeTexture: (textureID: number) => void
	readonly measureText: (text: string, fontID: number, size: number) => Vector3
	readonly execute: (buffer: Uint8Array) => void
}
declare const enum CommandID {
	BEGINCLIP = 0,
	ENDCLIP = 1,
	TRANSLATE = 2,
	ROTATE = 3,
	SETSCISSOR = 4,
	PATHMOVE_TO = 5,
	PATHLINE_TO = 6,
	PATH_ADD_RECT = 7,
	PATH_ADD_ROUND_RECT = 8,
	PATH_ADD_ELLIPSE = 9,
	PATH_ADD_ARC = 10,
	PATHCUBIC_TO = 11,
	PATH_QUAD_TO = 12,
	PATHCLOSE = 13,
	TEXT = 14,
	SVG = 15,
	PATH = 16,
	TRANSLATE_RELATIVE_STORE = 17,
	TRANSLATE_RELATIVE_LOAD = 18
}
declare const enum RenderList {
	/** Per-frame screen-anchor updates (TRANSLATE_RELATIVE_STORE). Submitted first. */
	Coords3D = 0,
	/** Draws kept across frames, rebuilt only when the game asks for it. Submitted second. */
	Draw2D = 1,
	/** Per-frame draws. Submitted last. */
	Draw3D = 2
}
declare const enum AnchorKind {
	HealthBar = 0,
	Origin = 1
}
declare const enum LineCap {
	Butt = 1,
	Round = 2,
	Square = 3
}
declare const enum LineJoin {
	Miter = 1,
	Round = 2,
	Bevel = 3
}
declare class CRenderer {
	public readonly ProportionalBase = 1080
	public readonly DefaultFontName = "Roboto"
	public readonly DefaultTextSize = 18
	public readonly DefaultShapeSize: Vector2
	public readonly WindowSize: Vector2
	public AttachHost(next: IRendererHost): void
	public get IsInDraw(): boolean
	public get OpacityMultiplier(): number
	public set OpacityMultiplier(value: number)
	public IsInScreenArea(position: Vector2, scale?: number): boolean
	public GetWidthScale(screenSize?: Vector2): number
	public GetHeightScale(screenSize?: Vector2): number
	public ScaleWidth(w: number, screenSize?: Vector2): number
	public ScaleHeight(h: number, screenSize?: Vector2): number
	/**
	 * Scales a width and a height at once, each by its own proportional factor.
	 * @example
	 * const size = Renderer.ScaleVector(32, 32)
	 */
	public ScaleVector(w: number, h: number, screenSize?: Vector2): Vector2
	public WorldToScreen(position: Vector2 | Vector3, cull?: boolean): Nullable<Vector2>
	public ScreenToWorld(screen: Vector2): Vector3
	public FilledCircle(vecPos: Vector2, vecSize: Vector2, color?: Color, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean): void
	public OutlinedCircle(vecPos: Vector2, vecSize: Vector2, color?: Color, width?: number, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean): void
	public OutlinedPolygon3D(polygon: Polygon3D, color?: Color, width?: number): void
	public DrawWorldCircle3D(worldPos: Vector3, radius: number, color?: Color, segments?: number, width?: number): void
	public Line(start?: Vector2, end?: Vector2, fillColor?: Color, width?: number, rotationDeg?: number, customScissor?: Rectangle, strokeColor?: Color, grayscale?: boolean): void
	public LineArrow(start: Vector2, end: Vector2, color?: Color, width?: number, arrowLength?: number, arrowAngleDeg?: number): void
	public TriangleFilled(p1: Vector2, p2: Vector2, p3: Vector2, fillColor?: Color, strokeColor?: Color, grayscale?: boolean): void
	public FilledRect(vecPos?: Vector2, vecSize?: Vector2, fillColor?: Color, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean, strokeColor?: Color, width?: number, cap?: LineCap, join?: LineJoin): void
	public OutlinedRect(vecPos?: Vector2, vecSize?: Vector2, width?: number, color?: Color, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean, cap?: LineCap, join?: LineJoin): void
	public Image(path: string, vecPos: Vector2, round?: number, vecSize?: Vector2, color?: Color, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean, subtexOffset?: Vector2, subtexSize?: Vector2): void
	/**
	 * Draws a texture the caller already holds, instead of one loaded from a path. The id comes
	 * from whoever produced the texture — a rendered scene, for instance — so no source size is
	 * known here and the image is stretched to `vecSize` as given.
	 * @example
	 * Renderer.ImageByID(scene.TextureID, position, new Vector2(256, 256))
	 */
	public ImageByID(textureID: number, vecPos: Vector2, vecSize: Vector2, color?: Color): void
	/**
	 * Whether this path already has a texture, so a caller can hold a draw back rather than
	 * show the frame the load lands on. A path never asked for reports `false`.
	 * @example
	 * if (Renderer.IsImageReady(icon)) {
	 * 	Renderer.Image(icon, position, size)
	 * }
	 */
	public IsImageReady(path: string): boolean
	public GetImageSize(path: string): Vector2
	public Text(text: string, vecPos?: Vector2, color?: Color, fontName?: string, fontSize?: number, weight?: number, italic?: boolean, outlined?: boolean): void
	public TextByFlags(text: string, position: Rectangle, color?: Color, division?: number, flags?: TextFlags, width?: number, fontName?: string, fixDigits?: boolean, italic?: boolean, outlined?: boolean, filledRect?: boolean, filledRectColor?: Color): Rectangle
	public GetTextSize(text: string, fontName?: string, fontSize?: number, weight?: number, italic?: boolean): Vector3
	public TextAroundMouse(text: string, vec?: Vector2 | false, color?: Color, fontName?: string, fontSize?: number, weight?: number, italic?: boolean, outlined?: boolean): void
	public BeforeDraw(w: number, h: number): void
	public BeginCommandList(id: RenderList, reset?: boolean): void
	public EndCommandList(): void
	/**
	 * Starts a rebuild of the persisted Draw2D list: drops the anchors its relative loads read from
	 * and makes the list the active write target until {@link EndCommandList}.
	 * @example
	 * Renderer.BeginPersistentList()
	 * // … heavy draws that only change a few times a second …
	 * Renderer.EndCommandList()
	 */
	public BeginPersistentList(): void
	/** Byte size of the persisted list; `0` means nothing is kept and it needs rebuilding. */
	public get PersistentListSize(): number
	public EmitDraw(): void
	public EmitDrawOverlay(): void
	public get DebugStats(): Readonly<{
		coords3D: number
		draw2D: number
		draw3D: number
		relStores: number
		relLoads: number
	}>
	public GetAspectRatio(windowSize?: Vector2): "4x3" | "16x9" | "16x10" | "21x9" | "unknown"
	public Radial(startAngle: number, percent: number, vecPos: Vector2, vecSize: Vector2, fillColor?: Color, rotationDeg?: number, customScissor?: Rectangle, strokeColor?: Color, grayscale?: boolean, outlineWidth?: number, outer?: boolean, cap?: LineCap, join?: LineJoin): void
	public Arc(baseAngle: number, percent: number, vecPos: Vector2, vecSize: Vector2, fill?: boolean, width?: number, color?: Color, rotationDeg?: number, customScissor?: Rectangle, grayscale?: boolean, outer?: boolean, cap?: LineCap): void
	public AllocateCommandSpace_(commandID: CommandID, bytes: number): ViewBinaryStream
	public FreeTextureCache(): void
	public CreateFont(name: string, path: string, weight: number, italic: boolean, stack?: string): void
	public BeginClip(diffOp: boolean): void
	public EndClip(): void
	public RectRounded(vecPos: Vector2, vecSize: Vector2, roundDiameter: number, fillColor: Color, strokeColor: Color, width: number): void
	public GetFont(fontName: string, weight: number, italic: boolean): number
	public PathMoveTo(x: number, y: number): void
	public PathLineTo(x: number, y: number): void
	public Path(width: number, fillColor: Color, strokeColor: Color, flags: PathFlags, grayscale: boolean, cap?: LineCap, join?: LineJoin, texID?: number, texOffsetX?: number, texOffsetY?: number, texW?: number, texH?: number): void
	public Rotate(ang: number): void
	public Translate(vecPos: Vector2, round?: boolean): void
	public TranslateRelativeStore(id: number, vecPos: Vector2, round?: boolean): void
	public TranslateRelativeDelete(id: number): void
	public TranslateRelativeLoad(id: number): void
	public TranslateRelativeReset(): void
	public DrawRelative(id: number, cb: () => void): void
	public AllocateAnchorKind(): number
	public UseEntityAnchor(entityIndex: number, kind: number, getPos: () => Nullable<Vector2>): number
	public DrawEntityRelative(entityIndex: number, kind: number, getPos: () => Nullable<Vector2>, cb: () => void): void
}
