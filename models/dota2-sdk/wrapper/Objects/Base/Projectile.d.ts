// AUTO-GENERATED - do not edit.
declare class Projectile {
	public readonly ID: number
	public ParticlePath: string
	public ParticleSystemHandle: bigint
	public Source: Nullable<Unit | FakeUnit>
	public readonly ColorGemColor: Color
	public Speed: number
	public IsValid: boolean
	public ParticlePathNoEcon: string
	public AbilityIndex: Nullable<number>
	public readonly OriginalSpeed: number
	public readonly CreateTime: number
	public readonly VisualPosition: Vector3
	constructor(iD: number, particlePath: string, particleSystemHandle: bigint, source: Nullable<Unit | FakeUnit>, colorGemColor: Color, speed: number)
	public UpdateParticlePathNoEcon(): void
	protected UpdateData(): void
}
declare class LinearProjectile extends Projectile {
	public readonly MaxSpeed: number
	public readonly FowRadius: number
	public readonly StickyFowReveal: boolean
	public readonly Distance: number
	public readonly Origin: Vector3
	public readonly Velocity: Vector2
	public readonly Acceleration: Vector2
	public readonly Position: Vector3
	public readonly Forward: Vector3
	public readonly TargetLoc: Vector3
	constructor(projID: number, ent: Nullable<Unit | FakeUnit>, path: string, particleSystemHandle: bigint, maxSpeed: number, fowRadius: number, stickyFowReveal: boolean, distance: number, origin: Vector3, velocity: Vector2, acceleration: Vector2, colorgemcolor: Color)
	public get Ability(): Nullable<Ability>
	public GetRemainingTime(start?: Vector3, end?: Vector3): number
	protected UpdateData(): void
}
declare class TrackingProjectile extends Projectile {
	public Target: Nullable<Unit | FakeUnit>
	public readonly SourceAttachment: string
	public readonly MaxImpactTime: Nullable<number>
	public LaunchTick: number
	public readonly TargetLoc: Vector3
	public readonly OriginalMoveSpeed: number
	public readonly Ability?: Nullable<Ability>
	public readonly TargetProjectileHandle?: number | undefined
	public readonly Position: Vector3
	public IsDodged: boolean
	constructor(projID: number, source: Nullable<Unit | FakeUnit>, target: Nullable<Unit | FakeUnit>, speed: number, sourceAttachment: string, path: string, particleSystemHandle: bigint, dodgeable: boolean, isAttack: boolean, expireTime: number, maxImpactTime: Nullable<number>, launchTick: number, targetLoc: Vector3 | undefined, colorgemcolor: Color, originalMoveSpeed: number, ability?: Nullable<Ability>, targetProjectileHandle?: number | undefined)
	public get IsDodgeable(): boolean
	public get IsAttack(): boolean
	public get ExpireTime(): number
	/** @internal */
	public Update(targetEntity: Nullable<Unit | FakeUnit>, speed: number, path: string, particleSystemHandle: bigint, dodgeable: boolean, isAttack: boolean, expireTime: number, launchTick: number, targetLoc: Vector3): void
	/** @internal */
	public UpdateProjectileSpeed(): void
	protected ModifierDistortionAura(source: Unit): number
	protected ModifierTimeZoneAura(source: Unit): number
}
