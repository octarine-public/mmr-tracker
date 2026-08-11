// AUTO-GENERATED - do not edit.
declare class Ability extends Entity {
	public readonly AbilityData: AbilityData
	public readonly AnimTime: number
	public readonly IsInIndefiniteCooldown: boolean
	public readonly MaxLevelOverride: number
	public readonly IsActivated: boolean
	public readonly AltCastState: boolean
	public readonly IsAutoCastEnabled: boolean
	public readonly IsCooldownFrozen: boolean
	public readonly IsReplicated: boolean
	public readonly IsStolen: boolean
	public readonly NetworkedManaCost: number
	public readonly OverrideCastPoint: number
	public readonly CastStartTime: number
	public readonly IsToggled: boolean
	public readonly DirtyButtons: number
	public readonly GrantedByFacet: boolean
	public readonly IsStealable: boolean
	public readonly HeroFacetKey: number
	public readonly ReflectionSourceAbility: number
	public readonly HiddenAbilityForDisplay: number
	public Level: number
	public IsEmpty: boolean
	public IsAbility: boolean
	public IsHidden: boolean
	public ChannelStartTime: number
	public AbilityChargeRestoreTimeRemaining: number
	/** @deprecated use by index */
	public AbilitySlot: EAbilitySlot
	public Prediction: Nullable<any>
	/** @private NOTE: this is internal field, use IsInAbilityPhase */
	public IsInAbilityPhase_: boolean
	public IsInAbilityPhaseChangeTime: number
	/** @private NOTE: this is internal field, use Owner or Cooldown */
	public Cooldown_: number
	public CooldownChangeTime: number
	/** @private NOTE: this is internal field, use CooldownRestore */
	public CooldownRestore_: number
	public CooldownRestoreTime: number
	/**@deprecated */
	public readonly ProjectilePath: Nullable<string>
	constructor(index: number, serial: number, name: string)
	public get PredictionSkillShotType(): ESkillShotType
	public get ProjectileAttachment(): string
	public get CastDelay(): number
	public get IsInvisibility(): boolean
	/** NOTE: @override in child classes */
	public get ShouldBeDrawable(): boolean
	public get IsUltimate(): boolean
	public get IsBreakable(): boolean
	public get IsAttributes(): boolean
	public get CanHitSpellImmuneEnemy(): boolean
	public get CanHitSpellImmuneAlly(): boolean
	public get CanBeUsable(): boolean
	public get Owner(): Nullable<Unit>
	public get OwnerHasShard(): boolean
	public get OwnerHasScepter(): boolean
	public get AbilityBehaviorMask(): DOTA_ABILITY_BEHAVIOR
	public get TargetTypeMask(): DOTA_UNIT_TARGET_TYPE
	public get TargetTeamMask(): DOTA_UNIT_TARGET_TEAM
	public get TargetFlagsMask(): DOTA_UNIT_TARGET_FLAGS
	public get SpellDispellableType(): SPELL_DISPELLABLE_TYPES
	public get BonusStatsMask(): EDOTASpecialBonusStats
	public get AbilityDamage(): number
	public get AbilityType(): ABILITY_TYPES
	public get IsInnate(): boolean
	public get IsDispellable(): boolean
	public get IsInnateHidden(): boolean
	public get EndRadius(): number
	public get CastPoint(): number
	public get ActivationDelay(): number
	public get MaxChannelTime(): number
	public get ChannelTime(): number
	public get ChannelEndTime(): number
	public get MaxCharges(): number
	public get MaxChargeRestoreTime(): number
	public get DamageType(): DAMAGE_TYPES
	public get ID(): number
	public get IsChanneling(): boolean
	public get IsInAbilityPhase(): boolean
	public get CooldownLength(): number
	public get IsCooldownReady(): boolean
	public get IsReady(): boolean
	public get BaseManaCost(): number
	public get ManaCost(): number
	public get HealthCost(): number
	public get IsGrantedByScepter(): boolean
	public get IsItem(): boolean
	public get LevelsBetweenUpgrades(): number
	public get MaxLevel(): number
	public get RequiredLevel(): number
	public get SharedCooldownName(): string
	public get DependentOnAbility(): string
	public get AbilityImmunityType(): SPELL_IMMUNITY_TYPES
	public get TargetFlags(): number[]
	public get TargetTeam(): number[]
	public get TargetType(): number[]
	public get TexturePath(): string
	public get IsPassive(): boolean
	public get IsNotLearnable(): boolean
	public get NoTarget(): boolean
	public get IgnoreBackSwing(): boolean
	public get IsUIInnate(): boolean
	public get CooldownRestore(): number
	public get Cooldown(): number
	public get CooldownPercent(): number
	public get CooldownPercentDecimal(): number
	public get CooldownDuration(): number
	public get CooldownDurationPercent(): number
	public get CooldownDurationPercentDecimal(): number
	public get StackCount(): number
	public get Speed(): number
	public get MaxDuration(): number
	public get MaxCooldown(): number
	public get BaseCastRange(): number
	public get CastRange(): number
	public get AOERadius(): number
	public get MinAOERadius(): number
	public get SkillshotRange(): number
	public get IsCastRangeFake(): boolean
	public get UsesRotation(): boolean
	public get CurrentCharges(): number
	public set CurrentCharges(newVal: number)
	public get SpellAmplify(): number
	protected get CanBeCastedWhileRooted(): boolean
	protected get CanBeCastedWhileStunned(): boolean
	protected get CanBeCastedWhileSilenced(): boolean
	public GetProjectileStartingPosition(pos: Vector3, ang: QAngle, scale?: number): Vector3
	public GetMaxCooldownForLevel(level: number): number
	public GetChargeRestoreTimeForLevel(level: number): number
	public GetMaxChargesForLevel(level: number): number
	public GetMaxDurationForLevel(level: number): number
	public GetBaseCastPointForLevel(level: number): number
	public GetBaseDamageForLevel(level: number): number
	public GetBaseManaCostForLevel(level: number): number
	public GetBaseHealthCostForLevel(level: number): number
	public GetCastRangeForLevel(level: number): number
	public GetBaseCastRangeForLevel(level: number): number
	public GetBaseActivationDelayForLevel(_level: number): number
	public GetBaseSpeedForLevel(_level: number): number
	public GetBaseAOERadiusForLevel(_level: number): number
	public GetBaseMinAOERadiusForLevel(_level: number): number
	public GetBaseChannelTimeForLevel(level: number): number
	public GetCastDelay(unit?: Unit | Vector3, movement?: boolean, directionalMovement?: boolean, currentTurnRate?: boolean): number
	public GetHitTime(unit: Unit | Vector3, movement?: boolean, directionalMovement?: boolean, currentTurnRate?: boolean): number
	/**
	 * @description Returns the raw damage of the ability without any amplification
	 */
	public GetRawDamage(_target: Unit): number
	public GetDamage(target: Unit): number
	public UseAbility(target?: Vector3 | Entity, checkAutoCast?: boolean, checkToggled?: boolean, queue?: boolean, showEffects?: boolean): void | undefined
	public UpgradeAbility(): void | undefined
	public PingAbility(): void | undefined
	public GetSpecialValue(specialName: string, level?: number, optional?: ISpecialValueOptions, checkShard?: boolean, checkScepter?: boolean): number
	public IsManaEnough(bonusMana?: number): boolean
	public HasBehavior(flag: DOTA_ABILITY_BEHAVIOR): boolean
	public HasBonusStats(flag: EDOTASpecialBonusStats): boolean
	public HasTargetFlags(flag: DOTA_UNIT_TARGET_FLAGS): boolean
	public HasTargetTeam(flag: DOTA_UNIT_TARGET_TEAM): boolean
	public HasTargetType(flag: DOTA_UNIT_TARGET_TYPE): boolean
	public CanHit(target: Unit | Vector3): boolean
	public CanBeCasted(bonusMana?: number): boolean
	public IsDoubleTap(_order: ExecuteOrder): boolean
	public IsNuke(): this is INuke
	public IsBuff(): this is IBuff
	public IsShield(): this is IShield
	public IsDebuff(): this is IDebuff
	public IsHealthCost(): this is IHealthCost
	public IsManaRestore(): this is IManaRestore<Unit>
	public IsHealthRestore(): this is IHealthRestore<Unit>
	public GetHealthCost(baseManaCost: number): number
	public GetManaCostModifier(baseManaCost: number): number
	protected GetCastPointModifier(baseCastPoint: number): number
	protected GetManaCostModifierSpellSteal(owner: Unit): number
	protected GetSpellAmpModifierSpellSteal(owner?: Nullable<Unit>): number
	protected IsAbsoluteNoDamage(source: Unit, target: Unit, damageType: DAMAGE_TYPES): boolean
}
