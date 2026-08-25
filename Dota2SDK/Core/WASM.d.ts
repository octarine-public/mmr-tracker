// AUTO-GENERATED - do not edit.
declare function ScreenToWorld(screen: Vector2, cameraPosition: Vector3, cameraDistance: number, cameraAngles: QAngle, windowSize: Vector2): Vector3
declare function WorldToScreen(position: Vector3, windowSize: Vector2, cull?: boolean): Nullable<Vector2>
declare const WASM: {
	ScreenToWorld: typeof ScreenToWorld
	WorldToScreen: typeof WorldToScreen
}
