// AUTO-GENERATED - do not edit.
declare const Source2SDK: {
	readonly Source2SdkSurfaceHash: string
	readonly AllEntitiesAsMap: Map<number, INativeEntity>
	readonly AnchorKind: typeof AnchorKind
	readonly CCameraManager: typeof CCameraManager
	readonly CConVars: typeof CConVars
	readonly CEntityManager: typeof CEntityManager
	readonly CGameState: typeof CGameState
	readonly CInputManager: typeof CInputManager
	readonly CMainThread: typeof CMainThread
	readonly CPanorama: typeof CPanorama
	readonly CProjection: typeof CProjection
	readonly CRenderer: typeof CRenderer
	readonly CStringTablesManager: typeof CStringTablesManager
	readonly CTaskManager: typeof CTaskManager
	readonly CachedFieldHandlers: typeof CachedFieldHandlers
	readonly ClassToEntities: typeof ClassToEntities
	readonly ClassToEntitiesAr: typeof ClassToEntitiesAr
	readonly ConVarsSDK: typeof ConVarsSDK
	readonly CreateEntityInternal: (entity: INativeEntity) => void
	readonly CreateNetworkedParticle: (index: number, path: string, particleSystemHandle: bigint, attach: number, attachedTo: Nullable<INativePredictionTarget>, modifiersAttachedTo: Nullable<INativePredictionTarget>) => NetworkedParticle
	readonly DeleteEntity: (entID: number) => void
	readonly EPropertyType: typeof EPropertyType
	readonly EntitiesSymbols: typeof EntitiesSymbols
	readonly EntityManager: CEntityManager<INativeEntity>
	readonly EntityPropertiesNode: typeof EntityPropertiesNode
	readonly Events: typeof Events
	readonly FieldHandlers: typeof FieldHandlers
	readonly GetConstructorByName: (className: string, constructorNameHint?: string) => Nullable<Constructor<INativeEntity>>
	readonly GetNameByConstructor: (constructor: Constructor<INativeEntity>) => Nullable<string>
	readonly IgnoreUnmappedClass: (className: string) => void
	readonly InputManager: CInputManager
	readonly InputMessage: typeof InputMessage
	readonly LineCap: typeof LineCap
	readonly LineJoin: typeof LineJoin
	readonly MainThread: typeof MainThread
	readonly ModifierSDKClass: typeof ModifierSDKClass
	readonly NativeEvents: EventEmitter<NativeEventsMap>
	readonly NetworkedBasicField: (networkedFieldName: string, propType?: EPropertyType, networkedType?: EPropertyType) => (target: object, propName: string) => void
	readonly NetworkedParticle: typeof NetworkedParticle
	readonly Panel: typeof Panel
	readonly Panorama: CPanorama
	readonly Projection: CProjection
	readonly QuantitizedVecCoordToCoord: (cell: Nullable<number>, inside: Nullable<number>) => number
	readonly QuantizePlaybackRate: (f: number) => number
	readonly QueueEvent: (cb: () => void) => void
	readonly ReencodeProperty: (prop: unknown, newType: EPropertyType, networkedType?: EPropertyType) => PropertyType
	readonly RegisterClass: (name: string, constructor: Constructor<INativeEntity>) => void
	readonly RegisterClassModifier: (name: string, constructor: Constructor<object>) => void
	readonly RegisterClassNameFix: (from: string, to: string) => void
	readonly RegisterFieldHandler: <T extends INativeEntity, A extends EntityPropertyType>(constructor: Constructor<T>, fieldName: string, handler: (entity: T, newValue: A) => unknown) => void
	readonly RegisterServerMessage: (msgID: number, handler: (buf: ArrayBuffer) => void) => void
	readonly RenderList: typeof RenderList
	readonly Renderer: CRenderer
	readonly SDKClasses: typeof SDKClasses
	readonly SetBaseEntityClass: (next: Constructor<INativeEntity>) => void
	readonly SetCellWidth: (next: number) => void
	readonly SetEntityFieldsApplied: <T extends INativeEntity>(handler: (entity: T) => void) => void
	readonly SetEntitySymbolMapper: (next: (symbol: string) => string) => void
	readonly SetEntityVisualHasVelocity: (next: boolean) => void
	readonly SetGameRulesSink: (next: (entity: Nullable<INativeGameRules>) => void) => void
	readonly SetGroundHeightSource: (next: (position: Vector2) => number) => void
	readonly SetLatestTickDelta: (delta: number) => void
	readonly SetLocalPlayerSink: (next: (entity: Nullable<INativeEntity>) => void) => void
	readonly SetNativeEntityChangeReader: (next: NativeEntityChangeReader) => void
	readonly SetNetworkedParticleClass: (next: NetworkedParticleClass) => void
	readonly StringTables: typeof StringTables
	readonly TaskManager: typeof TaskManager
	readonly WASM: typeof WASM
	readonly WrapperClass: (networkedClassName: string) => (constructor: Constructor<INativeEntity>) => void
	readonly WrapperClassModifier: (name?: string) => (constructor: Constructor<object>) => void
	readonly latestTickDelta: typeof latestTickDelta
}
