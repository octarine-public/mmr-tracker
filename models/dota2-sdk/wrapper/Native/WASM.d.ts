// AUTO-GENERATED - do not edit.
declare class CHeightMap {
	constructor(minMapCoords_: Vector2, mapSize_: Vector2)
	public get MinMapCoords(): Vector2
	public get MapSize(): Vector2
	public get MaxMapCoords(): Vector2
	public Contains(pos: Vector2 | Vector3): boolean
}
declare function GetEyeVector(cameraAngles: QAngle): Vector3
