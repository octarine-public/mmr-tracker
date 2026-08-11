// AUTO-GENERATED - do not edit.
/**
 * The Dota view of the shared renderer: the same instance, plus the projections that take an
 * explicit camera and the pacing of the persisted 2D layer.
 */
type IDotaRenderer = CRenderer & {
	/** Camera distance the game is actually using, falling back to `dota_camera_distance`. */
	readonly CameraDistance: number
	/** Marks the persisted 2D layer stale, so the next frame rebuilds it off-schedule. */
	InvalidateDraw2D(): void
	/** True when the persisted 2D layer is due for a rebuild this frame. */
	ShouldEmitDraw2D(): boolean
	BeforeDraw2D(): void
	AfterDraw2D(): void
	/** Records when the last server update landed, so a rebuild does not land on top of one. */
	OnTick(): void
	/**
	 * Projects a world position through a camera given explicitly rather than the live one.
	 * @returns screen position with x and y in `0..1`, or `undefined` when it falls too far out
	 */
	WorldToScreenCustom(position: Vector2 | Vector3, cameraPosition: Vector2 | Vector3, cameraDistance?: number, cameraAngles?: QAngle, windowSize?: Vector2): Nullable<Vector2>
	/** Projects a screen position onto a camera given explicitly rather than the live one. */
	ScreenToWorldCustom(screen: Vector2, cameraPosition: Vector2 | Vector3, cameraDistance?: number, cameraAngles?: QAngle, windowSize?: Vector2): Vector3
	/** Projects several screen positions onto the camera's far plane in one native call. */
	ScreenToWorldFar(screens: Vector2[], cameraPosition: Vector2 | Vector3, cameraDistance?: number, cameraAngles?: QAngle, windowSize?: Vector2, fov?: number): Vector3[]
}
declare const RendererSDK: IDotaRenderer
