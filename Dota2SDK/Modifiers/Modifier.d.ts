// AUTO-GENERATED - do not edit.
type ModifierHandlerValue = (modifierParams?: IModifierParams) => [number, boolean]
type ModifierMapFieldHandler = Map<EModifierfunction, ModifierHandlerValue>
declare class Modifier {
	public kv: IModifier
	public static readonly DebuffHeal: string[]
	public static readonly DebuffTrueSight: Set<string>
	public static readonly DebuffVisibleForEnemies: Set<string>
	public static HasTrueSightBuff(buffs: Modifier[]): boolean
	public static HasVisibleForEnemies(buffs: Modifier[]): boolean
	public static HasScepterBuff(buffs: Modifier[]): boolean
	public static HasShardBuff(buffs: Modifier[]): boolean
	public static CanBeHealed(unit: Unit): boolean
	public static CanBeHealed(buffs: Modifier[]): boolean
	public readonly Name: string
	public readonly IsAura: boolean
	public readonly Index: number
	public readonly SerialNumber: number
	public readonly DDAbilityName: string
	public readonly CreationTick: number
	public NetworkArmor: number
	public NetworkDamage: number
	public NetworkFadeTime: number
	public NetworkBonusMana: number
	public NetworkBonusHealth: number
	public NetworkAttackSpeed: number
	public NetworkChannelTime: number
	public NetworkMovementSpeed: number
	public NetworkBonusAllStats: number
	public NetworkSubtle: boolean
	public NetworkIsActive: boolean
	public NetworkAuraWithInRange: boolean
	public NetworkActivity: number
	public CreationTime: number
	public CustomEntity: Nullable<Unit>
	public InternalStackCount: number
	public InternalDuration: number
	public AbilityLevel: number
	public IsGhost: boolean
	public IsHidden: boolean
	public IsGlobally: boolean
	public Parent: Nullable<Unit>
	public Ability: Nullable<Ability>
	public Caster: Nullable<Unit>
	public AuraOwner: Nullable<Unit>
	public IsValid: boolean
	public HasVisualShield: boolean
	public ShouldDoFlyHeightVisual: boolean
	public HasShard: boolean
	public HasScepter: boolean
	protected CanPostDataUpdate: boolean
	protected DeclaredFunction: Nullable<ModifierMapFieldHandler>
	protected CachedAbilityName: Nullable<string>
	public get StackCount(): number
	public get ForceVisible(): boolean
	public get Duration(): number
	public get InvisibilityLevel(): number
	public get DeltaZ(): number
	public get DieTime(): number
	public get ElapsedTime(): number
	public get RemainingTime(): number
	public get DDModifierID(): Nullable<number>
	public get vStart(): Vector4
	public get vEnd(): Vector4
	public get IsBreakable(): boolean
	public get IsDispellable(): boolean
	public get CanHitSpellImmuneEnemy(): boolean
	public Update(force?: boolean): void
	public GetTexturePath(): string
	public IsEnemy(ent?: Entity): boolean
	public IsBuff(): this is IBuff
	public IsDebuff(): this is IDebuff
	public IsDisable(): this is IDisable
	public IsShield(): this is IShield
	public IsChannel(): this is IChannel
	public OnAbilityLevelChanged(): void
	public PostDataUpdate(): void
	public ForceUpdateSpecialValues(): void
	public Remove(): boolean
	public HasTargetFlags(flag: DOTA_UNIT_TARGET_FLAGS): boolean
	public IsMagicImmune(owner?: Nullable<Unit>, ignoreFlags?: boolean): boolean
	public IsPassiveDisabled(source?: Unit): boolean
	public IsSuppressCrit(source?: Unit): boolean
	public TestSpecialValue(): void
	protected HasMeleeAttacksBonuses(source?: Unit): boolean
	protected AddModifier(): boolean
	/**
	 * @param specialName name of the special
	 * @param abilityName (e.g. "item_smoke_of_deceit", "item_moon_shard")
	 * @param level optional (e.g. invoker_ghost_walk#WexLevel)
	 * @return number
	 */
	protected GetSpecialValue(specialName: string, abilityName: string, level?: number, optional?: ISpecialValueOptions): number
	protected UnitModifierChanged(): void
	protected UpdateSpecialValues(): void
	protected UnitPropertyChanged(_changed?: boolean): boolean
}
