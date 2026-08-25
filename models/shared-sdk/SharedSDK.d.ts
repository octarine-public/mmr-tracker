// AUTO-GENERATED - do not edit.
declare const SharedSDK: {
	readonly SharedSdkSurfaceHash: string
	readonly AABB: typeof AABB
	readonly AbortController: typeof AbortController
	readonly AbortSignal: typeof AbortSignal
	readonly ArrayBuffersEqual: (ab1: ArrayBuffer, ab2: ArrayBuffer) => boolean
	readonly CMaterial: typeof CMaterial
	readonly CMsgQAngleToQAngle: (vec: Nullable<RecursiveProtobuf>) => QAngle
	readonly CMsgQuaternionToVector4: (vec: Nullable<RecursiveProtobuf>) => Vector4
	readonly CMsgVector2DToVector2: (vec: Nullable<RecursiveProtobuf>) => Vector2
	readonly CMsgVectorToVector3: (vec: Nullable<RecursiveProtobuf>) => Vector3
	readonly Color: typeof Color
	readonly ComputeSurfaceHash: (names: string[]) => string
	readonly EntityDataLumps: typeof EntityDataLumps
	readonly EntityDataMap: typeof EntityDataMap
	readonly EventEmitter: typeof EventEmitter
	readonly EventPriority: typeof EventPriority
	readonly FixPanoramaPath: (origName: Nullable<string>) => string
	readonly GetMapNumberProperty: (map: RecursiveMap, key: string, defaultValue?: number) => number
	readonly GetMapStringProperty: (map: RecursiveMap, key: string) => string
	readonly HSVToRGB: (h: number, s: number, v: number) => [number, number, number]
	readonly Headers: typeof Headers
	readonly KeyNames: typeof KeyNames
	readonly MapToObject: (map: Map<unknown, unknown>) => Record<string, unknown>
	readonly MapValueToBoolean: (value: unknown) => boolean
	readonly MapValueToNumber: (value: unknown, defaultValue?: number) => number
	readonly MapValueToString: (value: unknown, defaultValue?: string) => string
	readonly MaterialFlags: typeof MaterialFlags
	readonly Matrix3x4: typeof Matrix3x4
	readonly MediaSessionError: typeof MediaSessionError
	readonly MenuLanguageID: typeof MenuLanguageID
	readonly NetError: typeof NetError
	readonly NetErrorCode: typeof NetErrorCode
	readonly NumberToColor: (num: Nullable<number>) => Color
	readonly ParseEntityLump: (path: string) => void
	readonly ParseMapName: (path: string) => Nullable<string>
	readonly ParseMaterial: (path: string) => CMaterial
	readonly ParseProtobuf: (data: Uint8Array, protoDesc: ProtoDescription) => RecursiveProtobuf
	readonly ParseProtobufDesc: (str: string) => void
	readonly ParseProtobufDescLine: (str: string) => [number, ProtoFieldDescription]
	readonly ParseProtobufNamed: (data: Uint8Array, name: string) => RecursiveProtobuf
	readonly ParseTRMP: (stream: ViewBinaryStream) => [Map<string, [number, Vector2][]>, number]
	readonly PathFlags: typeof PathFlags
	readonly Polygon2D: typeof Polygon2D
	readonly Polygon3D: typeof Polygon3D
	readonly ProfileBegin: () => boolean
	readonly ProfileEnd: (name: string, source: Nullable<string>, active: boolean) => void
	readonly ProfilePause: () => number
	readonly ProfileResume: (started: number) => void
	readonly ProjectionInfo: typeof ProjectionInfo
	readonly ProtoCache: typeof ProtoCache
	readonly ProtoFieldType: typeof ProtoFieldType
	readonly ProtoType: typeof ProtoType
	readonly QAngle: typeof QAngle
	readonly Quaternion: typeof Quaternion
	readonly RGBToHSV: (r: number, g: number, b: number) => [number, number, number]
	readonly React: typeof React
	readonly ReactReconciler: typeof ReactReconciler
	readonly Rectangle: typeof Rectangle
	readonly ResetEntityLump: () => void
	readonly Response: typeof Response
	readonly SetListenerPerfReporter: (reporter: Nullable<(registeredAt: string, tookMs: number) => void>) => void
	readonly SetProfileSink: (next: Nullable<ProfileSink>) => void
	readonly Sleeper: typeof Sleeper
	readonly StringToUTF8: (str: string) => Uint8Array
	readonly StringToUTF8Cb: (str: string, writeByte: (b: number) => void) => void
	readonly TextFlags: typeof TextFlags
	readonly UTF8ToString: (bytes: ArrayBuffer | ArrayBufferView) => string
	readonly VKeys: typeof VKeys
	readonly VMouseKeys: typeof VMouseKeys
	readonly VXMouseKeys: typeof VXMouseKeys
	readonly Vector2: typeof Vector2
	readonly Vector3: typeof Vector3
	readonly Vector4: typeof Vector4
	readonly ViewBinaryStream: typeof ViewBinaryStream
	readonly WebSocket: typeof WebSocket
	readonly createMapFromMergedIterators: <K, V>(...iters: IterableIterator<[K, V]>[]) => Map<K, V>
	readonly fetch: (url: string, init?: FetchInit) => Promise<Response>
	readonly parseEnumString: { (enumObject: Record<string, unknown>, str: string, defaultVal: number): number; (enumObject: Record<string, unknown>, str: string, defaultVal: bigint): bigint }
	readonly qsort: <T>(items: T[], cmpFunc: CompareFunc<T>, left?: number, right?: number) => T[]
	readonly readFile: (path: string, callstackDepth?: number) => Nullable<string>
	readonly readJSON: <T = unknown>(path: string) => T
	readonly readMediaSession: (options?: MediaReadOptions) => Promise<MediaSessionSnapshot>
	readonly readNowPlaying: (options?: MediaReadOptions) => Promise<Nullable<NowPlaying>>
	readonly readPlayerLevel: (source?: string) => Promise<number>
	readonly readPlayerVolume: (source?: string) => Promise<number>
	readonly sendMediaCommand: (command: MediaCommand, source?: string) => Promise<Nullable<number>>
	readonly tryFindFile: (path: string, callstackDepth?: number) => Nullable<string>
}
