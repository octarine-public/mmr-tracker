// AUTO-GENERATED - do not edit.
type NetworkedParticleClass = new (index: number, path: string, particleSystemHandle: bigint, attach: number, attachedTo: Nullable<INativePredictionTarget>, modifiersAttachedTo: Nullable<INativePredictionTarget>) => NetworkedParticle
declare class NetworkedParticle {
	public readonly Index: number
	public readonly Path: string
	public readonly ParticleSystemHandle: bigint
	public readonly Attach: number
	public AttachedTo: Nullable<INativePredictionTarget>
	public ModifiersAttachedTo: Nullable<INativePredictionTarget>
	public static readonly Instances: Map<number, NetworkedParticle>
	public readonly ControlPoints: Map<number, Vector3>
	public readonly ControlPointsSnapshot: Map<number, string>
	public readonly ControlPointsModel: Map<number, string>
	public readonly ControlPointsForward: Map<number, Vector3>
	public readonly ControlPointsQuaternion: Map<number, Vector4>
	public readonly ControlPointsFallback: Map<number, Vector3>
	public readonly ControlPointsOrient: Map<number, [Vector3, Vector3, Vector3]>
	public readonly ControlPointsOffset: Map<number, [Vector3, QAngle]>
	public readonly ControlPointsEnt: Map<number, [INativePredictionTarget, number, number, boolean]>
	public readonly TextureAttributes: Map<string, string>
	public readonly EndTime: number
	public readonly PathNoEcon: string
	public Released: boolean
	public ShouldDraw: boolean
	public FrozenAt: number
	public Text: string
	public Destroy(): void
}
