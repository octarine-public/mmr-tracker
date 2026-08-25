// AUTO-GENERATED - do not edit.
declare class CGUIInfo {
	public debugDraw: boolean
	public TopBar: CTopBar
	public Minimap: CMinimap
	public Shop: CShop
	public MenuScale: number
	public OpenShopMini: COpenShop
	public OpenShopLarge: COpenShop
	public PreGame: CPreGame
	public Scoreboard: CScoreboard
	public HUDFlipped: boolean
	constructor()
	public OnDraw(): void
	public GetVisibleAbilitiesForUnit(ent: Nullable<Entity>): number
	public GetLowerHUDForUnit(unit?: Nullable<Unit>): CLowerHUD
	public DebugDraw(): void
	public GetWidthScale(screenSize?: Vector2): number
	public GetHeightScale(screenSize?: Vector2): number
	public ScaleWidth(w: number, screenSize?: Vector2): number
	public ScaleHeight(h: number, screenSize?: Vector2): number
	public ScaleVector(w: number, h: number, screenSize?: Vector2): Vector2
	public ScaleWidthMenu(w: number, screenSize?: Vector2): number
	public ScaleHeightMenu(h: number, screenSize?: Vector2): number
	public Contains(position: Vector2, unit?: Nullable<Unit>): boolean
	public ContainsTopBar(panelPosition: Vector2): boolean
	public ContainsLowerHUD(panelPosition: Vector2, unit?: Nullable<Unit>): boolean
	public ContainsMiniMap(position: Vector2): boolean
	public ContainsShop(position: Vector2): boolean
	public ContainsShopButtons(position: Vector2): boolean
	public ContainsScoreboard(position: Vector2): boolean
	public ContainsTimeOfDayTimeUntil(position: Vector2): boolean
}
declare const GUIInfo: CGUIInfo
