// AUTO-GENERATED - do not edit.
/**
 * The shared game state with what only Dota reports: which panorama screen is up, whether the game
 * is eating input, and a net channel that measures the two directions apart.
 */
declare class CDotaGameState extends CGameState {
	/** @deprecated use GameState.TickInterval */
	public LatestTickDelta: number
	public IsInputCaptured: boolean
	public UIState: DOTAGameUIState
	public LocalTeam: Team
	constructor()
	/** @deprecated */
	public get Ping(): number
	/** @deprecated */
	public get AvgPing(): number
	public get IOLag(): number
	public get InputLag(): number
	public get IsDemo(): boolean
	/**
	 * Whether a screen overlay would land on the game world right now: connected, with the match
	 * UI up rather than the dashboard or another full-screen panorama page.
	 */
	public get CanDrawOverlays(): boolean
	public GetLatency(flow?: Flow): number
	public GetAvgLatency(flow?: Flow): number
	public GetInputLag(latency: number): number
}
declare const GameState: CDotaGameState
