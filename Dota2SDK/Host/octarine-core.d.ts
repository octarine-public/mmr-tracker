// AUTO-GENERATED - do not edit.
/// GLOBAL TYPES

/// GLOBAL OBJECTS
/**
struct CUnitOrder {
	uint32_t order_type; // 0
	uint32_t issuer; // 4
	Vector3 position; // 8
	CEntityIndex target; // 20
	CEntityIndex ability; // 24
	bool show_effects; // 28
	bool queue; // 29
	uint32_t issuers_size; // 30
	CEntityIndex issuers[128]; // 34+
};
 */
declare var LatestUnitOrder: Uint8Array
/**
struct CUserCmd {
	int command_number; // 0
	int tick_count; // 4
	QAngle viewangles; // 8
	float forwardmove; // 20
	float sidemove; // 24
	float upmove; // 28
	uint64_t buttons; // 32, 4 bit => up 5 bit => down 10 bit => left 11 bit => right
	int impulse; // 40
	CEntityIndex weaponselect; // 44
	CEntityIndex weaponsubtype; // 48
	float mousex; // 52
	float mousey; // 56
	int16_t cameraposition[2]; // 60
	uint8_t clickbehavior; // 64
	uint8_t statspanel; // 65, dota_spectator_stats_panel
	uint8_t shoppanel; // 66
	uint8_t stats_dropdown; // 67, spectator_stats_categoryID
	uint8_t stats_dropdown_sort; // 68, spectator_stats_sort_method
	Vector3 crosshairtrace; // 69
	CHandle pawn; // 81
};
 */
declare var LatestUserCmd: Uint8Array
declare var SchemaClassesInheritance: Map<string, string[]>

declare var ConVars: ConVars
declare var CustomGameEvents: CustomGameEvents
declare var Particles: Particles
declare var Renderer: Renderer
declare var WorldUtils: WorldUtils
declare var Camera: Camera
declare const IS_MINIMAL_CORE: boolean

declare interface ConVars {
	Get(convarName: string): Nullable<number | boolean | string | number[]>
	Set(convarName: string, value: number | boolean | string | number[]): void
	SetNetworked(convarName: string, value: number | boolean | string | number[]): void
}

declare interface CustomGameEvents {
	FireEventToClient(name: string, playerEntID: number, data: RecursiveMap): void
	FireEventToAllClients(name: string, data: RecursiveMap): void
	FireEventToServer(name: string, data: RecursiveMap): void
}

declare interface Particles {
	Create(path: string, attach: number, attachedTo: number): Promise<number>
	Destroy(particleID: number, immediate: boolean): void
	SetInFogVisible(particleID: number, value: boolean): void
	SetControlPoint(particleID: number, controlPoint: number): void // pass vec: Vector3 at IOBuffer offset 0
	SetControlPointForward(particleID: number, controlPoint: number): void // pass vec: Vector3 at IOBuffer offset 0
	DeleteAll(): void
}

// must be called only in onDraw!
declare interface Renderer {
	CreateFont(path: string): number
	/**
	 * @returns size: Vector2 to IOBuffer at offset 0
	 */
	GetTextSize(text: string, fontID: number, size: number): void
	/**
	 * Builds a texture and answers its id, or `-1` when the image could not be decoded. Its
	 * width and height land in `IOBuffer[0]` and `IOBuffer[1]`.
	 *
	 * `source` is a path in the game's virtual filesystem, or the bytes of an image the script
	 * already holds — one fetched over the network, say, which has no path because it was never
	 * a file. Bytes are identified by their container, so svg works there too.
	 */
	CreateTexture(source: string | ArrayBuffer | ArrayBufferView): number
	FreeTexture(textureID: number): void
	ExecuteCommandBuffer(buf: Uint8Array): void
}

declare interface WorldUtils {
	/**
	 * @returns MinMapCoords: Vector2 to IOBuffer offset 0,
	 *          MapSize: Vector2 to IOBuffer offset 2,
	 *          and return value is true if function succeeded
	 */
	GetHeightMapData(): boolean

	GetHeightForLocation(x: number, y: number): number
	IsPointUnderWater(x: number, y: number): boolean
	GetLocationAverageHeight(x: number, y: number, count: number, distance: number): number

	/**
	 * Pass world_vec: Vector3 at IOBuffer offset 0,
	 *      camera_pos: Vector3 at IOBuffer offset 3,
	 *      camera_ang: QAngle at IOBuffer offset 6,
	 *      camera_dist: float at IOBuffer offset 9,
	 *      window_size: Vector2 at IOBuffer offset 10
	 * 
	 * @returns screen: Vector3 at IOBuffer offset 0,
	 *          return value is true if it succeeded
	 */
	WorldToScreen(): boolean
	/**
	 * Pass world_vec: Vector3 at IOBuffer offset 0
	 * 
	 * @returns screen: Vector3 at IOBuffer offset 0,
	 *          return value is true if it succeeded
	 */
	WorldToScreenNew(): boolean
	/**
	 * Pass screen: Vector2 at IOBuffer offset 0,
	 *      camera_pos: Vector3 at IOBuffer offset 2,
	 *      camera_ang: QAngle at IOBuffer offset 5,
	 *      camera_dist: float at IOBuffer offset 8,
	 *      window_size: Vector2 at IOBuffer offset 9
	 * 
	 * @returns world_vec: Vector3 at IOBuffer offset 0
	 */
	ScreenToWorld(): void
	/**
	 * Pass window_size: Vector2 at IOBuffer offset 0,
	 *      camera_angles: Vector3 at IOBuffer offset 2,
	 *      fov: float at IOBuffer offset 5,
	 *      screen: Vector2 at IOBuffer offset 6
	 * 
	 * @returns ray: Vector3 at IOBuffer offset 0
	 */
	GetCursorRay(): void
	/**
	 * Pass window_size: Vector2 at IOBuffer offset 0,
	 *      camera_pos: Vector3 at IOBuffer offset 2,
	 *      camera_ang: QAngle at IOBuffer offset 5,
	 *      camera_dist: float at IOBuffer offset 8,
	 *      fov: float at IOBuffer offset 9,
	 *      screens_count: float at IOBuffer offset 10,
	 *      screens: Vector2[screens_count] at IOBuffer offset 11
	 * 
	 * @returns screens_results: Vector3[screens_count] at IOBuffer offset 0
	 */
	ScreenToWorldFar(): void
	/**
	 * Pass ray_origin: Vector3 at IOBuffer offset 0,
	 *      ray_dir: QAngle at IOBuffer offset 3,
	 *      count: float at IOBuffer offset 6,
	 *      bboxes: Vector2[count * 2] at IOBuffer offset 7, where 0 is min, 1 is max
	 * 
	 * @returns res: bool[count] at IOBuffer offset 0
	 */
	BatchCheckRayBox(): void
}

// Represents any Panorama panel
declare interface Camera {
	Distance: number
	FoV: number
	Angles: boolean // returns QAngle to IOBuffer offset 0 on get, sets from IOBuffer offset 0 on set
	Position: boolean // returns Vector3 to IOBuffer offset 0 on get, sets from IOBuffer offset 0 on set
}

/// GLOBAL FUNCTIONS

declare function SendToConsole(command: string): void
/**
 * @param path pass empty to read from confings/../settings.json
 */
declare function readConfig(): Promise<string>
declare function writeConfig(data: string): void
declare function listConfigs(): Promise<string>
declare function createConfig(name: string): Promise<string>
declare function deleteConfig(id: string): Promise<string>
declare function setActiveConfig(id: string): Promise<string>
declare function addConfigByCode(code: string, keepBinds: boolean): Promise<string>
declare function setConfigPublic(id: string, isPublic: boolean): Promise<string>
declare function configCommand(op: number, payload: string): Promise<string>
declare function PrepareUnitOrders(obj: {
	// pass Position: Vector3 at IOBuffer offset 0
	OrderType: number
	Target?: number
	Ability?: number
	Issuers?: number[] | number
	Queue?: boolean
	ShowEffects?: boolean
	Flags?: number
}): void
// flow deprecated
declare function GetLatency(flow?: number): number
// flow deprecated
declare function GetAvgLatency(flow?: number): number
declare function SendGCPingResponse(): void
declare function AcceptMatch(): void
declare function ToggleRequestUserCmd(state: boolean): void

declare function setFireEvent(
	cb: (eventName: string, cancellable: boolean, ...args: any) => boolean
): void
declare function require(absolutePath: string): any
declare function SetTreeModel(
	modelName: string,
	scale: number,
	height_offset: number,
	resetRotation: boolean,
	colorU32: number
): void
declare function EmitStartSoundEvent( // pass location: Vector2 at IOBuffer offset 0
	soundeventGUID: number,
	soundeventName: string,
	sourceEntityID: number,
	seed: number
): void
declare function EmitStopSoundEvent( // pass location: Vector2 at IOBuffer offset 0
	soundeventGUID: number,
	soundeventName: Nullable<string>,
	sourceEntityID: number
): void
/**
 * @param customEntityID (entityID << 1) or (binaryID << 1) | 1
 * @param renderMode RenderMode
 */
declare function SetEntityColor(
	customEntityID: number,
	colorU32: number,
	renderMode: number
): void
/**
 * @param customEntityID (entityID << 1) or (binaryID << 1) | 1
 */
declare function SetEntityGlow(customEntityID: number, colorU32: number): void
/**
 * Bounds of the entity's hitboxes in the pose it stands in right now, relative to its origin.
 * False when it has no skeleton or no hitbox set yet - a model that is still loading.
 *
 * @param customEntityID (entityID << 1) or (binaryID << 1) | 1
 * @returns mins: Vector3 to IOBuffer offset 0, maxs: Vector3 to IOBuffer offset 3
 */
declare function GetHitboxBounds(customEntityID: number): boolean
declare function GetPlayerMuteFlags(steamid64: bigint): number
/**
 * Pass location: Vector2 at IOBuffer offset 0
 */
declare function SendMinimapPing(
	type?: number,
	directPing?: boolean,
	target?: number
): void
declare function WriteUserCmd(): void
declare function IsShopOpen(): boolean
declare function GetQueryUnit(): number
declare function GetSelectedEntities(): number

declare function GetPathByHash(hash: bigint): Nullable<string>

declare function GetSoundPathToName(): Map<string, string>
declare function LookupSoundNameByHash(hash: number): Nullable<string>

declare function GetModelData(path: string): Promise<ModelData>

declare function GetOriginalParticlePath(path: string): string
declare function GetEconItemName(id: number): string
declare function GetEconItemHealthBarOffset(id: number): Nullable<number>

/**
 * @description Pass boolean to clear banned heroes
 */
declare function ToggleBanHeroes(bannedHeroIds: number[] | false): void

declare function SetChangerEnabled(enabled: boolean): void
declare function AddPrismaticGem(r: number, g: number, b: number): void
declare function AddGreevil(quas: number, wex: number, exort: number, shadow: number, unusual: number): void
declare function SetEmblemAttackEffectOverride(itemDefID: number): void

/**
 * FileSystem API for file redirection and override management
 * 
 * Allows redirecting game file requests to custom files on disk.
 * Useful for modding, testing custom assets, or replacing game resources.
 */
declare interface FileSystem {
	/**
	 * Adds a new file redirection list
	 * @param name - Unique identifier for this redirection list
	 * @param obj - Object mapping original file paths to custom file paths
	 * @returns handle - Numeric handle for managing this redirection list
	 * 
	 * @example
	 * // add file redirection list
	 * const listHandle = FileSystem.AddRedirectList("test", {
	 *     "materials/blends/mod_dire_000.vmat_c": "D:/TEST/materials/blends/mod_dire_000.vmat_c",
	 *     "materials/blends/mod_dire_000_vmat_g_tspecular0_83163e7b_png_d3f7b418.vtex_c": "D:/TEST/materials/blends/mod_dire_000_vmat_g_tspecular0_83163e7b_png_d3f7b418.vtex_c"
	 * });
	 */
	AddRedirectList(name: string, obj: { [key: string]: string }): number
	
	/**
	 * Removes a specific redirection list by its handle
	 * @param handle - Numeric handle returned by AddRedirectList
	 * 
	 * @example
	 * // remove redirection list
	 * FileSystem.RemoveRedirectList(listHandle);
	 */
	RemoveRedirectList(handle: number): void
	
	/**
	 * Removes all redirection lists
	 * 
	 * @example
	 * // remove all redirection lists
	 * FileSystem.ResetRedirects();
	 */
	ResetRedirects(): void
	
	/**
	 * Enables or disables all file redirections globally
	 * @param enable - true to enable, false to disable
	 * 
	 * @example
	 * // enable/disable all redirections
	 * FileSystem.EnableRedirects(true);
	 */
	EnableRedirects(enable: boolean): void
	
	/**
	 * Checks if file redirections are currently enabled
	 * @returns true if redirections are enabled, false otherwise
	 * 
	 * @example
	 * // returns true if enabled
	 * const isEnabled = FileSystem.RedirectsEnabled();
	 */
	RedirectsEnabled(): boolean
}

declare const FileSystem: FileSystem

declare interface GFXModel {
	IsLoaded(): boolean
	GetBoneIdx(name: string): number
	GetBoneCount(): number
	GetBoneName(index: number): string
	GetBoneParent(index: number): number
	GetMeshCount(): number
	GetSubmeshCount(meshIndex: number): number
	GetSubmeshMaterial(meshIndex: number, submeshIndex: number): string
	GetMeshGroupMask(meshIndex: number): number
	GetAnimationCount(): number
	GetAnimationName(index: number): string
	GetAnimationDuration(index: number): number
	GetBoundsMin(): number[]
	GetBoundsMax(): number[]
	GetAttachmentCount(): number
	GetAttachmentName(index: number): string
	GetAttachmentBone(index: number): number
	GetAttachmentOffset(index: number): number[]
	GetAttachmentRotation(index: number): number[]
	/** Whether a clip of this name is already loaded, so LoadAGClip can be skipped. */
	HasClip(name: string): boolean
	LoadAGClip(path: string, name?: string): Promise<boolean>
}

declare interface GFXInstance {
	SetModel(model: GFXModel): void
	SetParent(parent: GFXInstance): void
	SetAttachmentBone(boneIndex: number): void
	SetTransform(position: number[], angles: number[], scale?: number): void
	PlayAnimation(name: string): void
	Stop(): void
	/**
	 * Leans a bone and everything under it about the model's left axis at the bone's origin, in
	 * degrees, positive pitching forward the way a Source pitch does; zero straightens it again.
	 * Composed onto every pose sampled after the call — this is how a preview shows an aim pitch,
	 * since the renderer plays plain clips and never runs the animation graph's aim pose.
	 */
	SetBoneBend(boneIndex: number, degrees: number): void
	GetGroupCount(): number
	GetGroupName(index: number): string
	IsGroupVisible(index: number): boolean
	SetGroupVisible(index: number, visible: boolean): void
	GetBoneMatrix(boneIndex: number): Nullable<number[]>
	/**
	 * Replaces one submesh's material, given either as a `.vmat` path or as an inline KV3
	 * definition — the same text a material is authored in, parsed on the calling thread so a bad
	 * one is reported here rather than failing silently inside a render task.
	 *
	 * Each distinct definition mints a material the scene then holds, so this is for a material
	 * that CHANGES rarely. Anything that moves per frame belongs in {@link SetMaterialParam}.
	 */
	SetSubmeshMaterial(
		meshIndex: number,
		submeshIndex: number,
		material: string
	): void
	/**
	 * Overrides one parameter of whatever material a submesh draws with, for this instance only.
	 * Mints nothing and is safe to call every frame. A submesh of -1 applies to every submesh of
	 * that mesh. A scalar is broadcast to all four components.
	 */
	SetMaterialParam(
		meshIndex: number,
		submeshIndex: number,
		name: string,
		value: number | number[]
	): void
	/** Drops the parameter overrides on one mesh, or on every mesh when none is named. */
	ClearMaterialParams(meshIndex?: number): void
	ClearMaterialOverrides(): void
}

declare interface GFXScene {
	CreateInstance(model?: GFXModel): GFXInstance
	AddLight(type: number, position: number[], rotation?: number[], color?: number): void
	GetLightCount(): number
	SetLight(
		index: number,
		type: number,
		position: number[],
		rotation?: number[],
		color?: number
	): void
	RemoveLight(index: number): void
	ClearLights(): void
	SetUpdating(updating: boolean): void
	IsUpdating(): boolean
	SetSize(width: number, height: number): void
	SetSamples(samples: number): void
	SetCamera(position: number[], target: number[], fov: number, up?: number[]): void
	SetOrthoCamera(position: number[], target: number[], size: number, up?: number[]): void
	ResetCamera(): void
	GetTextureId(): number
	/** Silhouette glow around the scene's content: 0xRRGGBBAA (0 = off), width in target px. */
	SetGlow(color: number, width?: number): void
}

declare interface GFX {
	CreateScene(width: number, height: number): GFXScene
	DestroyScene(scene: GFXScene): void
	LoadModel(path: string): Promise<Nullable<GFXModel>>
	readonly LIGHT_DIRECTIONAL: number
	readonly LIGHT_POINT: number
}

declare var GFX: GFX
