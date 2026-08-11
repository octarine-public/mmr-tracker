interface EventsMap {
	/**
	 * Emitted before all EntityCreateds.
	 * Same as EntityCreated, but have much less global guarantees
	 * [such as Owner might not be initialized if it was emitted in the same entities packet,
	 * white EntityCreated guarantees that it'll be initialized in that case]
	 */
	PreEntityCreated: [ent: Entity]
	/**
	 * Emitted after all entity properties handlers were called, a.k.a. entity is fully set up
	 * This callback is best suited for use.
	 */
	EntityCreated: [ent: Entity]
	EntityDestroyed: [ent: Entity]
	EntityTeamChanged: [ent: Entity]
	/**
	 * @description Equivalently to Entity#IsVisible
	 */
	EntityVisibleChanged: [entity: Entity]
	UnitVisibleStateChanged: [data: TeamData]
	UnitTeamVisibilityChanged: [unit: Unit]
	FakeUnitCreated: [unit: FakeUnit]
	FakeUnitDestroyed: [unit: FakeUnit]
	/**
	 * Emitted every time GameRules.RawGameTime changes, a.k.a. tick,
	 * right after PostUpdate
	 * @deprecated
	 */
	Tick: [dt: number]
	ControllableByPlayerMaskChanged: [npc: Unit]
	TrueSightedChanged: [npc: Unit]
	HasScepterChanged: [npc: Unit]
	HasShardChanged: [npc: Unit]
	Draw2D: []
	ParticleCreated: [particle: DotaNetworkedParticle]
	ParticleUpdated: [particle: DotaNetworkedParticle]
	ParticleUnitPositionUpdated: [unit: Nullable<FakeUnit | Unit>, particle: Nullable<DotaNetworkedParticle>]
	ParticleReleased: [particle: DotaNetworkedParticle]
	ParticleDestroyed: [particle: DotaNetworkedParticle]
	PrepareUnitOrders: [order: ExecuteOrder]
	DebuggerPrepareUnitOrders: [order: ExecuteOrder, is_user_input: boolean, was_cancelled: boolean]
	LinearProjectileCreated: [proj: LinearProjectile]
	LinearProjectileDestroyed: [proj: LinearProjectile]
	TrackingProjectileCreated: [proj: TrackingProjectile]
	TrackingProjectileUpdated: [proj: TrackingProjectile]
	TrackingProjectileDestroyed: [proj: TrackingProjectile]
	TrackingProjectilesDodged: [ent: Unit | FakeUnit, attacks_only: boolean]
	UnitAnimation: [npc: Nullable<Unit | FakeUnit>, sequenceVariant: number, playbackrate: number, castpoint: number, type: number, activity: GameActivity, lagCompensationTime: number, rawCastPoint: number]
	UnitAnimationEnd: [npc: Unit | FakeUnit, snap: boolean]
	GameEvent: [eventName: string, obj: any]
	/**
	 * The engine's Speech message has no level field, so the argument list follows the wire
	 * format: `recipient_type` is followed directly by `muteable`.
	 */
	UnitSpeech: [npc: Nullable<Unit | FakeUnit>, concept: number, response: string, recipient_type: number, muteable: boolean, predelay_start: number, predelay_range: number, flags: number, responseType: number]
	UnitSpeechMute: [npc: Nullable<Unit | FakeUnit>, delay: number]
	UnitAddGesture: [npc: Nullable<Unit | FakeUnit>, activity: GameActivity, slot: number, fade_in: number, fade_out: number, playback_rate: number, sequence_variant: number]
	UnitRemoveGesture: [npc: Nullable<Unit | FakeUnit>, activity: number]
	UnitRemoveAllGestures: [npc: Nullable<Unit | FakeUnit>]
	UnitFadeGesture: [npc: Nullable<Unit | FakeUnit>, activity: number]
	GameStateChanged: [newState: DOTAGameState]
	LifeStateChanged: [ent: Entity]
	UnitAbilitiesChanged: [ent: Unit]
	UnitWearablesChanged: [ent: Unit]
	UnitItemsChanged: [ent: Unit]
	/**
	 * @description Emitted if the properties of an unit have changed
	 * example:
	 * Unit#IsClone
	 * Unit#IsRanged
	 * Unit#IsIllusion
	 * Unit#AttackCapabilities
	 * Unit#IsStrongIllusion
	 * SpiritBear#ShouldRespawn
	 * UNit#IsWaitingToSpawn
	 * */
	UnitPropertyChanged: [unit: Unit]
	NetworkActivityChanged: [npc: Unit]
	ModifierCreated: [mod: Modifier]
	ModifierChanged: [mod: Modifier]
	ModifierChangedVBE: [mod: Modifier]
	UnitVBEModifierChanged: [unit: Unit]
	ModifierRemoved: [mod: Modifier]
	UnitAbilityDataUpdated: []
	/**
	 * @description Includes fog of war
	 */
	UnitLevelChanged: [unit: Unit]
	StartSound: [name: string, source_ent: Nullable<Unit | FakeUnit>, position: Vector3, seed: number, start_time: number]
	ChatEvent: [type: DOTA_CHAT_MESSAGE, value: number, playerid_1: number, playerid_2: number, playerid_3: number, playerid_4: number, playerid_5: number, playerid_6: number, value2: number, value3: number]
	MatchmakingStatsUpdated: [msg: RecursiveMap]
	SharedObjectChanged: [typeID: SOType, reason: number, msg: RecursiveMap]
	HumanizerStateChanged: []
	PlayerResourceUpdated: [playerResource: CPlayerResource]
	/**
	 * @description Includes PlayerResourceUpdated
	 */
	PlayerCustomDataUpdated: [player: PlayerCustomData]
	AttackStarted: [unit: Unit, castPoint: number, animationNames: string[]]
	AttackEnded: [unit: Unit, isCancelled: boolean]
	AbilityPhaseChanged: [ability: Ability]
	AbilityChannelingChanged: [ability: Ability]
	/**
	 * @description Includes fog of war
	 */
	AbilityLevelChanged: [abil: Ability]
	/**
	 * @description NOTE: Includes only changed by network
	 */
	AbilityCooldownChanged: [ability: Ability]
	AbilityHiddenChanged: [ability: Ability]
	MenuConfigChanged: [config: Record<string, unknown>]
	EntityPositionChanged: [entity: Entity]
	UnitStateChanged: [entity: Unit]
	UnitPortalChanged: [model: UnitPortalData]
	UnitPortalDestroyed: [model: UnitPortalData]
	StockInfoChanged: [stock: StockInfo]
}

interface NativeEventsMap {
	UIStateChanged: [newState: DOTAGameUIState]
	RequestUserCmd: []
	MatchmakingStatsUpdated: [msg: ArrayBuffer]
	RankData: [
		rankType: ERankType,
		rankValue: number,
		rankData1: number,
		rankData2: number,
		rankData3: number,
		rankData4: number
	]
	DOTAFullHeroGlobalDataUpdated: [obj: unknown]
}
