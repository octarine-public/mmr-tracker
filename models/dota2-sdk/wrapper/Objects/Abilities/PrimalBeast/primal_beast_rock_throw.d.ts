// AUTO-GENERATED - do not edit.
declare class primal_beast_rock_throw extends Ability implements INuke {
	public IsNuke(): this is INuke
	public GetBaseDamageForLevel(level: number): number
	public GetBaseAOERadiusForLevel(level: number): number
	public GetFragmentAOERadiusForLevel(level?: number): number
	public GetTravelTime(distance: number, clampMinDistance?: number, rangeMax?: number, minTravelTime?: number, maxTravelTime?: number): number
	public GetEndRadius(startPos: Vector3, endPos: Vector3, startRadius: number, angleDeg?: number): number
}
