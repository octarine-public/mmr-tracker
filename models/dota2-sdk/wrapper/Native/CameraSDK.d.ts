// AUTO-GENERATED - do not edit.
declare class CCameraSDK {
	/** @readonly */
	public DefaultDistance: number
	public readonly DefaultAngles: QAngle
	/** @description Camera polygon update only with humanizer */
	public readonly Polygon: WorldPolygon
	constructor()
	public get Angles(): QAngle
	public set Angles(value: QAngle)
	public get FoV(): number
	public get Distance(): number
	public set Distance(value: number)
	public get Position(): Vector3
	public UpdateDefaultValues(): void
}
declare const CameraSDK: CCameraSDK
