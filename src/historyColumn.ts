import { IGame } from "./history"
import { HistoryRuntimeSource, IHistoryTick } from "./historyRuntime"
import { EHistoryShow, MenuManager } from "./menu"
import { PanoramaColors } from "./palette"

/**
 * Keeps the rating each tracked game moved in the result column of the profile's match history.
 * The page is built with the dashboard and reused for every profile, so a poll looks it up about
 * once a second until it is found. After that it calls the runtime only when there is something
 * new for it: other games, the option switched, or a table it has not filled yet - more rows, a
 * first row it has not marked, another player's name in the header.
 */
export class HistoryColumn {
	private static readonly PollMs = 500
	private static readonly LookupMs = 1000

	private page: Nullable<IUIPanel>
	private lookedAt = -Infinity
	private polledAt = -Infinity
	private polling = false
	private account: Nullable<number>
	private games: readonly IGame[] = []
	private revision = 0
	/** What the page was last filled in for; empty once it must be filled in again. */
	private sent = ""
	/** Whether the runtime may have left anything on the page that a switch-off must take away. */
	private filled = false
	private readonly mark = Panorama.MakeSymbol("mt")
	private readonly label = Panorama.MakeSymbol("Label")

	constructor(private readonly menu: MenuManager) {
		this.menu.State.OnValue(() => this.revision++)
		this.menu.MatchHistory.OnValue(() => this.revision++)
		EventsSDK.on("Draw", () => this.Draw())
		EventsSDK.on("PanoramaWindowCreate", window => this.WindowChanged(window))
		EventsSDK.on("PanoramaWindowDestroy", window => this.WindowChanged(window))
	}

	private get Enabled(): boolean {
		return this.menu.State.value && this.Show !== EHistoryShow.Off
	}
	private get Show(): EHistoryShow {
		return this.menu.MatchHistory.SelectedID
	}

	/** The games of the account the client is signed in with, newest first. */
	public SetGames(account: number, games: readonly IGame[]): void {
		this.account = account
		this.games = games
		this.revision++
	}

	private Draw(): void {
		if (!this.Enabled && !this.filled) {
			return
		}
		const now = hrtime()
		if (this.polling || now - this.polledAt < HistoryColumn.PollMs) {
			return
		}
		this.polledAt = now
		this.polling = true
		MainThread.Queue(() => this.Poll(now))
			.catch(error => console.error("[mmr-tracker] history:", error))
			.finally(() => (this.polling = false))
	}
	private WindowChanged(window: string): void {
		if (window === PanoramaWindow.Dashboard) {
			this.page = undefined
			this.lookedAt = -Infinity
			this.sent = ""
			this.filled = false
		}
	}

	private Poll(now: number): void {
		const page = this.Resolve(now)
		if (page === undefined) {
			return
		}
		const enabled = this.Enabled
		const account = this.account
		if (!enabled || account === undefined) {
			if (this.filled) {
				this.Run(page, this.Tick(account ?? 0, true))
				this.filled = false
				this.sent = ""
			}
			return
		}
		if (!page.BIsVisible()) {
			return
		}
		const table = page.FindChildTraverse("RecentGamesTable")
		if (table === undefined) {
			return
		}
		const key = this.TableKey(table, page)
		if (key === this.sent && !this.IsUnmarked(table)) {
			return
		}
		this.Run(page, this.Tick(account, false))
		this.sent = key
		this.filled = true
	}
	private Resolve(now: number): Nullable<IUIPanel> {
		if (this.page !== undefined) {
			if (HistoryColumn.IsAlive(this.page)) {
				return this.page
			}
			this.page = undefined
			this.sent = ""
			this.filled = false
		}
		if (now - this.lookedAt < HistoryColumn.LookupMs) {
			return undefined
		}
		this.lookedAt = now
		this.page = Panorama.FindRootPanel(PanoramaWindow.Dashboard)?.FindChildTraverse(
			"DOTAProfileHeroStatsPage"
		)
		return this.page
	}
	/**
	 * What the table holds as far as the poll can tell without reading it: the games, the rows,
	 * whose profile it is.
	 */
	private TableKey(table: IUIPanel, page: IUIPanel): string {
		return `${this.revision}|${table.GetChildCount()}|${this.Owner(page)}`
	}
	/** A first row the runtime has not marked: the table was built anew. */
	private IsUnmarked(table: IUIPanel): boolean {
		const first = table.GetChildCount() !== 0 ? table.GetChild(0) : undefined
		return first !== undefined && first.GetAttribute(this.mark, "") === ""
	}
	/** The name in the page's header: whose games the table lists. */
	private Owner(page: IUIPanel): string {
		const name = page.FindChildTraverse("ProfileName")
		const count = name?.GetChildCount() ?? 0
		for (let index = 0; index < count; index++) {
			const child = name?.GetChild(index)
			if (child !== undefined && child.GetPanelType() === this.label) {
				return (child as CLabel).GetText()
			}
		}
		return ""
	}
	private Tick(account: number, dispose: boolean): IHistoryTick {
		return {
			account,
			games: dispose ? [] : this.games,
			tz: new Date().getTimezoneOffset(),
			colors: PanoramaColors,
			show: this.Show,
			dispose
		}
	}
	private Run(page: IUIPanel, tick: IHistoryTick): void {
		Panorama.ExecuteScript(page, `${HistoryRuntimeSource}(${JSON.stringify(tick)})`)
	}

	private static IsAlive(panel: IUIPanel): boolean {
		try {
			panel.BIsLoaded()
			return true
		} catch {
			return false
		}
	}
}
