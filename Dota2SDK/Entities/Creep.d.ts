// AUTO-GENERATED - do not edit.
declare class Creep extends Unit {
	public readonly Index: number
	public Lane: MapArea
	public PredictedIsWaitingToSpawn: boolean
	public readonly BaseHPRegen: number
	public get HPRegen(): number
	public get IsEidolon(): boolean
	public get IsLaneCreep(): boolean
	public get IsNeutral(): boolean
	public get IsSuperCreep(): boolean
	public get IsMegaCreep(): boolean
	public get IsDeniable(): boolean
	public get RingRadius(): number
	public get HealthBarSize(): Vector2
	public get HealthBarPositionCorrection(): Vector2
	public TryAssignLane(): void
}
