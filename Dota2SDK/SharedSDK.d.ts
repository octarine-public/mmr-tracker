// AUTO-GENERATED - do not edit.
declare const SharedSDK: {
	readonly AABB: typeof AABB
	readonly AbortController: typeof AbortController
	readonly AbortSignal: typeof AbortSignal
	readonly Color: typeof Color
	readonly EventEmitter: typeof EventEmitter
	readonly EventPriority: typeof EventPriority
	readonly HSVToRGB: (h: number, s: number, v: number) => [number, number, number]
	readonly Headers: typeof Headers
	readonly KeyNames: typeof KeyNames
	readonly MapToObject: (map: Map<unknown, unknown>) => Record<string, unknown>
	readonly MaterialFlags: typeof MaterialFlags
	readonly Matrix3x4: typeof Matrix3x4
	readonly MediaSessionError: typeof MediaSessionError
	readonly MenuLanguageID: typeof MenuLanguageID
	readonly NetError: typeof NetError
	readonly NetErrorCode: typeof NetErrorCode
	readonly PathFlags: typeof PathFlags
	readonly Polygon2D: typeof Polygon2D
	readonly Polygon3D: typeof Polygon3D
	readonly ProfileBegin: () => boolean
	readonly ProfileEnd: (name: string, source: Nullable<string>, active: boolean) => void
	readonly ProfilePause: () => number
	readonly ProfileResume: (started: number) => void
	readonly ProjectionInfo: typeof ProjectionInfo
	readonly QAngle: typeof QAngle
	readonly Quaternion: typeof Quaternion
	readonly RGBToHSV: (r: number, g: number, b: number) => [number, number, number]
	readonly React: typeof React
	readonly ReactReconciler: typeof ReactReconciler
	readonly Rectangle: typeof Rectangle
	readonly Response: typeof Response
	readonly Sleeper: typeof Sleeper
	readonly StringToUTF8: (str: string) => Uint8Array
	readonly TextFlags: typeof TextFlags
	readonly UTF8ToString: (bytes: ArrayBuffer | ArrayBufferView) => string
	readonly VKeys: typeof VKeys
	readonly VMouseKeys: typeof VMouseKeys
	readonly VXMouseKeys: typeof VXMouseKeys
	readonly Vector2: typeof Vector2
	readonly Vector3: typeof Vector3
	readonly Vector4: typeof Vector4
	readonly WebSocket: typeof WebSocket
	readonly fetch: (url: string, init?: FetchInit) => Promise<Response>
	readonly readJSON: <T = unknown>(path: string) => T
	readonly readMediaSession: (options?: MediaReadOptions) => Promise<MediaSessionSnapshot>
	readonly readNowPlaying: (options?: MediaReadOptions) => Promise<Nullable<NowPlaying>>
	readonly readPlayerLevel: (source?: string) => Promise<number>
	readonly readPlayerVolume: (source?: string) => Promise<number>
	readonly sendMediaCommand: (command: MediaCommand, source?: string) => Promise<Nullable<number>>
	readonly tryFindFile: (path: string, callstackDepth?: number) => Nullable<string>
}
