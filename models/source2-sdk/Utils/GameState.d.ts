// AUTO-GENERATED - do not edit.
declare class CGameState {
	public static Current: CGameState
	public readonly DefaultTickInterval: number
	public TickInterval: number
	public CurrentServerTick: number
	public CurrentGameTick: number
	public CurrentFrame: number
	public IsDedicatedServer: boolean
	public MapName: string
	public AddonName: string
	public IsInDraw: boolean
	public IsShopOpen: boolean
	/**
	 * True while the in-game menu covers the HUD. The engine reports no such flag, so each game
	 * fills it in from its own UI.
	 */
	public IsEscapeMenuOpen: boolean
	public RawGameTime: number
	public RawServerTime: number
	public LocalTeam: number
	constructor(defaultTickInterval?: number)
	/**
	 * Round-trip time to the server. A method rather than a property because a game whose net
	 * channel reports the two directions apart passes which one it means.
	 */
	public GetLatency(): number
	public GetAvgLatency(): number
	public get IOLag(): number
	public get InputLag(): number
	public get IsConnected(): boolean
	public ExecuteCommand(command: string): void
	public GetIOLag(latency: number): number
	public GetInputLag(latency: number): number
}
