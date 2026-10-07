import { HeaderPainter } from "./header"
import { IGame, ISummary, SessionLength, Summarize } from "./history"
import { MenuManager } from "./menu"
import { Palette, RefreshPalette, SignColor } from "./palette"
import { Paths } from "./paths"

/** The arrow at the header's right end that opens the history, and the gap before it. */
const CHEVRON = 14
const CHEVRON_GAP = 12
/** The line over the rows naming them, with what they add up to at its right. */
const SECTION_HEIGHT = 26
const ROW_HEIGHT = 40
const EMPTY_HEIGHT = 28
const BODY_BOTTOM = 6
const BODY_MIN_WIDTH = 230
/** A hero's landscape portrait, the shape the game's own match history shows it in. */
const PORTRAIT_W = 48
const PORTRAIT_H = 27
const PORTRAIT_RADIUS = 4
/** The trend glyph standing in for a portrait when the match went by unseen. */
const GLYPH = 14
const TEXT_GAP = 10
const NAME_FONT = 12
const NAME_MAX = 150
const SUB_FONT = 11
const SUB_WEIGHT = 500
/** How far each of a row's two lines sits off the row's middle. */
const LINE_OFFSET = 7.5
const DELTA_FONT = 12
const DELTA_PAD = 7
const DELTA_HEIGHT = 20
const DELTA_RADIUS = 7
const DELTA_RESERVE = "+00"
const CHIP_TINT = 36
const CHIP_EDGE = 107
const FOLD_MS = MenuSDK.Duration.Reveal
const MINUTE = 60_000

/** One game as the panel writes it, worded again only when the game, the clock or the language moves on. */
interface IRow {
	texture: string
	name: string
	sub: string
	delta: string
	gained: boolean
}

export class GUIHelper {
	private rating = -1
	private pressed = false
	/** Where the fold was last sent, or nothing before the config has said where it stands. */
	private foldTarget: Nullable<number>

	private games: readonly IGame[] = []
	private rowCount = 0
	private rowsDirty = true
	private rowsMinute = -1
	private rowsVersion = -1
	private rowsListed = -1
	private rowsSession = false
	private rowsGap = -1
	/** The games the panel counts, all of a session or the listed ones of the history. */
	private counted = 0
	private readonly summary: ISummary = { wins: 0, losses: 0, total: 0 }
	private title = ""
	private empty = ""
	private total = ""
	private totalSign = 0
	private pillWidth = 0
	private readonly rows: IRow[] = []
	private readonly header = new HeaderPainter()
	/**
	 * The history's measured text, kept until the rows are worded again or the size, family or
	 * weight floor they are measured in moves; retried each frame while the host cannot measure.
	 */
	private widthsDirty = true
	private unmeasured = false
	private measuredFamily = ""
	private measuredBold = -1
	private measuredWeight = -1
	private measuredName = -1
	private measuredSub = -1
	private measuredDelta = -1
	private textWidth = 0
	private deltaWidth = 0
	private titleWidth = 0
	private totalWidth = 0
	private emptyWidth = 0

	private readonly size = new Vector2()
	private readonly box = new Rectangle()
	private readonly chevron = new Rectangle()
	private readonly iconPos = new Vector2()
	private readonly iconSize = new Vector2()
	private readonly panel: MenuSDK.OverlayPanel
	/** How far the history stands open, 0 to 1: read at draw time, the tween only carries it. */
	private readonly fold = new MenuSDK.Tween(0, () => undefined)

	private readonly up = `${Paths.Images}/arrow-up.svg`
	private readonly down = `${Paths.Images}/arrow-down.svg`
	private readonly arrow = `${Paths.Images}/chevron-down.svg`

	private readonly drawContent = (origin: Vector2) => {
		const box = this.box
		box.pos1.CopyFrom(origin)
		box.pos2.SetVector(origin.x + this.size.x, origin.y + this.size.y)
		MenuSDK.HudCard.Frame(box)

		const bottom = this.drawHeader(box)
		const presence = this.fold.Value
		if (presence <= 0) {
			return
		}
		const alpha = MenuSDK.HudAlphaScale()
		MenuSDK.SetHudAlphaScale(alpha * presence)
		this.drawHistory(box, bottom)
		MenuSDK.SetHudAlphaScale(alpha)
	}

	constructor(private readonly menu: MenuManager) {
		this.panel = new MenuSDK.OverlayPanel(
			menu.Overlay,
			"hud-mmr-tracker",
			// The host gate hides a panel on the dashboard opened over a match; the tracker
			// decides itself, by the UI state, that it stands on the main menu only.
			MenuSDK.EPanelLife.Always
		)
	}

	/**
	 * Shut, the card is as wide as its header; it widens to the history together with the fold,
	 * so no empty room stands beside the rating while the games are hidden.
	 */
	public Draw(): void {
		if (!this.menu.IsToggled || (this.rating === -1 && !this.menu.IsOpen)) {
			this.Reset()
			return
		}
		MenuSDK.setHudScale(this.panel.Scale)
		RefreshPalette()
		this.refreshRows()
		const presence = this.presence()
		const header = this.headerWidth()
		const width = header + Math.max(0, this.historyWidth() - header) * presence
		const height =
			MenuSDK.hudH(this.header.Height(this.menu.Style.SelectedID)) +
			this.historyHeight() * presence
		this.size.SetVector(Math.round(width), Math.round(height))
		this.panel.Draw(this.size, this.drawContent)
	}

	public SetRating(rating: number): void {
		this.rating = rating
		this.rowsDirty = true
	}

	/** The recent games, newest first. The panel keeps the array and rewords it on each call. */
	public SetGames(games: readonly IGame[]): void {
		this.games = games
		this.rowsDirty = true
	}

	/** A press on the arrow is the arrow's; anywhere else on the card it carries the card. */
	public MouseKeyDown(key: VMouseKeys): boolean {
		if (key === VMouseKeys.MK_LBUTTON && this.overChevron()) {
			this.pressed = true
			return false
		}
		return this.panel.MouseKeyDown(key)
	}

	public MouseKeyUp(key: VMouseKeys): boolean {
		if (key !== VMouseKeys.MK_LBUTTON) {
			return true
		}
		if (!this.pressed) {
			return this.panel.MouseKeyUp()
		}
		this.pressed = false
		if (this.overChevron()) {
			this.menu.Expanded.value = !this.menu.Expanded.value
		}
		return false
	}

	public Reset(): void {
		this.pressed = false
		this.chevron.pos1.SetVector(0, 0)
		this.chevron.pos2.SetVector(0, 0)
		this.panel.Reset()
	}

	/**
	 * How far the history stands open this frame. The menu row says where it belongs; the first
	 * reading after a load lands there at once, every later change eases over.
	 */
	private presence(): number {
		const target = this.menu.Expanded.value ? 1 : 0
		if (target !== this.foldTarget) {
			if (this.foldTarget === undefined) {
				this.fold.Set(target)
			} else {
				this.fold.To(target, FOLD_MS, MenuSDK.Ease.Out)
			}
			this.foldTarget = target
		}
		return this.fold.Value
	}

	private headerWidth(): number {
		return (
			this.header.Width(this.menu.Style.SelectedID) +
			MenuSDK.hudW(CHEVRON_GAP + CHEVRON + MenuSDK.HudCard.Pad)
		)
	}

	/**
	 * Wide enough for the longest name and the widest change, and never narrower than a row reads
	 * at; with no games, only as wide as the line saying so.
	 */
	private historyWidth(): number {
		this.measureHistory()
		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad)
		const gap = MenuSDK.hudW(TEXT_GAP)
		this.pillWidth = Math.round(this.deltaWidth + MenuSDK.hudW(DELTA_PAD) * 2)
		if (this.rowCount === 0) {
			return pad * 2 + Math.max(this.titleWidth, this.emptyWidth)
		}
		const rows =
			pad * 2 +
			MenuSDK.hudW(PORTRAIT_W) +
			gap +
			Math.min(this.textWidth, MenuSDK.hudW(NAME_MAX)) +
			gap +
			this.pillWidth
		const section = pad * 2 + this.titleWidth + gap + this.totalWidth
		return Math.max(MenuSDK.hudW(BODY_MIN_WIDTH), rows, section)
	}

	private measureHistory(): void {
		const family = MenuSDK.Theme.FontFamily
		const bold = MenuSDK.MenuFontWeight(MenuSDK.HudBold)
		const weight = MenuSDK.MenuFontWeight(SUB_WEIGHT)
		const name = MenuSDK.hudFont(NAME_FONT)
		const sub = MenuSDK.hudFont(SUB_FONT)
		const delta = MenuSDK.hudFont(DELTA_FONT)
		if (
			!this.widthsDirty &&
			family === this.measuredFamily &&
			bold === this.measuredBold &&
			weight === this.measuredWeight &&
			name === this.measuredName &&
			sub === this.measuredSub &&
			delta === this.measuredDelta
		) {
			return
		}
		this.measuredFamily = family
		this.measuredBold = bold
		this.measuredWeight = weight
		this.measuredName = name
		this.measuredSub = sub
		this.measuredDelta = delta
		this.unmeasured = false

		let text = 0
		let deltaWidth = this.measure(DELTA_RESERVE, DELTA_FONT, MenuSDK.HudBold)
		for (let i = 0; i < this.rowCount; i++) {
			const row = this.rows[i]
			text = Math.max(
				text,
				this.measure(row.name, NAME_FONT, MenuSDK.HudBold),
				this.measure(row.sub, SUB_FONT, SUB_WEIGHT)
			)
			deltaWidth = Math.max(
				deltaWidth,
				this.measure(row.delta, DELTA_FONT, MenuSDK.HudBold)
			)
		}
		this.textWidth = text
		this.deltaWidth = deltaWidth
		this.titleWidth = this.measure(this.title, SUB_FONT, MenuSDK.HudBold)
		this.totalWidth = this.measure(this.total, SUB_FONT, MenuSDK.HudBold)
		this.emptyWidth = this.measure(this.empty, SUB_FONT, SUB_WEIGHT)
		this.widthsDirty = this.unmeasured
	}

	/** A run's width, noting when the host could not measure it yet so the next frame asks again. */
	private measure(text: string, size: number, weight: number): number {
		const width = MenuSDK.HudText.Width(text, size, weight)
		if (width === 0 && text !== "") {
			this.unmeasured = true
		}
		return width
	}

	private historyHeight(): number {
		const rows =
			this.rowCount === 0
				? MenuSDK.hudH(EMPTY_HEIGHT)
				: MenuSDK.hudH(ROW_HEIGHT) * this.rowCount
		return MenuSDK.hudH(SECTION_HEIGHT) + rows + MenuSDK.hudH(BODY_BOTTOM)
	}

	/** The rating line with the arrow at its right end. Answers where the header stops. */
	private drawHeader(box: Rectangle): number {
		const style = this.menu.Style.SelectedID
		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad),
			height = MenuSDK.hudH(this.header.Height(style)),
			centerY = box.y + height / 2
		this.header.Draw(style, box.x, box.y)

		const chevron = MenuSDK.hudW(CHEVRON)
		const right = box.pos2.x
		this.chevron.pos1.SetVector(right - chevron - pad * 2, box.y)
		this.chevron.pos2.SetVector(right, box.y + height)
		this.iconPos.SetVector(right - pad - chevron, centerY - chevron / 2)
		this.iconSize.SetVector(chevron, chevron)
		MenuSDK.HudCard.Image(
			this.arrow,
			this.iconPos,
			this.iconSize,
			this.overChevron() ? Palette.icon : Palette.muted,
			MenuSDK.hudAlpha(),
			0,
			180 * this.fold.Value
		)
		return box.y + height
	}

	/**
	 * The recent games under the header, cut to the height the card has opened to: a row stands
	 * only once the card has room for all of it, so the list fills in as the card grows.
	 */
	private drawHistory(box: Rectangle, top: number): void {
		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad)
		const left = box.x + pad
		const right = box.pos2.x - pad
		const bottom = box.pos2.y
		MenuSDK.HudCard.Separator(left, top, right - left)

		const section = MenuSDK.hudH(SECTION_HEIGHT)
		const sectionY = top + section / 2
		MenuSDK.HudText.Left(
			left,
			sectionY,
			this.title,
			SUB_FONT,
			Palette.muted,
			MenuSDK.HudBold
		)
		let y = top + section
		if (this.rowCount === 0) {
			const line = MenuSDK.hudH(EMPTY_HEIGHT)
			if (y + line <= bottom) {
				MenuSDK.HudText.Left(
					left,
					y + line / 2,
					this.empty,
					SUB_FONT,
					Palette.faint,
					SUB_WEIGHT
				)
			}
			return
		}
		MenuSDK.HudText.Right(
			right,
			sectionY,
			this.total,
			SUB_FONT,
			SignColor(this.totalSign),
			MenuSDK.HudBold
		)
		const height = MenuSDK.hudH(ROW_HEIGHT)
		for (let i = 0; i < this.rowCount && y + height <= bottom; i++) {
			if (i !== 0) {
				MenuSDK.HudCard.Separator(left, y, right - left)
			}
			this.drawRow(this.rows[i], left, right, y + height / 2)
			y += height
		}
	}

	private drawRow(row: IRow, left: number, right: number, centerY: number): void {
		const tint = row.gained ? Palette.gain : Palette.loss
		const portraitW = MenuSDK.hudW(PORTRAIT_W)
		const portraitH = MenuSDK.hudH(PORTRAIT_H)
		this.iconPos.SetVector(left, centerY - portraitH / 2)
		this.iconSize.SetVector(portraitW, portraitH)
		if (row.texture !== "") {
			MenuSDK.HudCard.Image(
				row.texture,
				this.iconPos,
				this.iconSize,
				Color.White,
				MenuSDK.hudAlpha(),
				MenuSDK.hudRadius(PORTRAIT_RADIUS),
				0,
				"cover"
			)
		} else {
			MenuSDK.HudCard.Chip(
				left,
				centerY - portraitH / 2,
				portraitW,
				portraitH,
				PORTRAIT_RADIUS,
				tint,
				MenuSDK.hudAlpha(CHIP_TINT),
				MenuSDK.hudAlpha(CHIP_EDGE)
			)
			const glyph = MenuSDK.hudW(GLYPH)
			this.iconPos.SetVector(left + (portraitW - glyph) / 2, centerY - glyph / 2)
			this.iconSize.SetVector(glyph, glyph)
			MenuSDK.HudCard.Image(
				row.gained ? this.up : this.down,
				this.iconPos,
				this.iconSize,
				tint,
				MenuSDK.hudAlpha()
			)
		}

		const pillW = this.pillWidth
		const pillH = MenuSDK.hudH(DELTA_HEIGHT)
		const pillX = right - pillW
		MenuSDK.HudCard.Chip(
			pillX,
			centerY - pillH / 2,
			pillW,
			pillH,
			DELTA_RADIUS,
			tint,
			MenuSDK.hudAlpha(CHIP_TINT),
			MenuSDK.hudAlpha(CHIP_EDGE)
		)
		MenuSDK.HudText.Center(
			pillX,
			centerY,
			pillW,
			row.delta,
			DELTA_FONT,
			tint,
			MenuSDK.HudBold
		)

		const gap = MenuSDK.hudW(TEXT_GAP)
		const x = left + portraitW + gap
		const room = pillX - gap - x
		const offset = MenuSDK.hudH(LINE_OFFSET)
		MenuSDK.HudText.Left(
			x,
			centerY - offset,
			MenuSDK.HudText.Clip(row.name, room, NAME_FONT, MenuSDK.HudBold),
			NAME_FONT,
			Palette.title,
			MenuSDK.HudBold
		)
		MenuSDK.HudText.Left(
			x,
			centerY + offset,
			MenuSDK.HudText.Clip(row.sub, room, SUB_FONT, SUB_WEIGHT),
			SUB_FONT,
			Palette.muted,
			SUB_WEIGHT
		)
	}

	private refreshRows(): void {
		const now = Date.now()
		const minute = Math.floor(now / MINUTE)
		const version = Menu.Localization.Version
		const session = this.menu.IsSession
		const gap = this.menu.SessionGap
		const listed = Math.min(this.games.length, this.menu.History.value)
		if (
			!this.rowsDirty &&
			listed === this.rowsListed &&
			minute === this.rowsMinute &&
			version === this.rowsVersion &&
			session === this.rowsSession &&
			gap === this.rowsGap
		) {
			return
		}
		this.rowsDirty = false
		this.rowsListed = listed
		this.rowsMinute = minute
		this.rowsVersion = version
		this.rowsSession = session
		this.rowsGap = gap
		this.widthsDirty = true
		this.counted = session ? SessionLength(this.games, now, gap) : listed
		const count = Math.min(this.counted, listed)
		this.rowCount = count

		for (let i = 0; i < count; i++) {
			const game = this.games[i]
			let row = this.rows[i]
			if (row === undefined) {
				row = this.rows[i] = {
					texture: "",
					name: "",
					sub: "",
					delta: "",
					gained: false
				}
			}
			const hero = game.hero
			row.texture = hero === undefined ? "" : ImageData.GetHeroTexture(hero)
			row.name = Menu.Localization.Localize(hero ?? "Ranked match")
			row.sub = `${ago(game.at, now)} · ${game.rating} MMR`
			row.delta = signed(game.delta)
			row.gained = game.delta >= 0
		}
		const { wins, losses, total } = Summarize(this.games, this.counted, this.summary)
		const localize = (name: string) => Menu.Localization.Localize(name)
		this.title = localize(session ? "Session" : "Recent games")
		this.empty = localize(
			session ? "No ranked games this session" : "No ranked games yet"
		)
		this.total = `${signed(total)} MMR`
		this.totalSign = Math.sign(total)

		const header = this.header
		header.Rating = (this.rating === -1 ? 0 : this.rating).toString()
		header.WinCount = wins.toString()
		header.LossCount = losses.toString()
		header.Wins = `${wins}${localize("W")}`
		header.Losses = `${losses}${localize("L")}`
		header.Total = signed(total)
		header.TotalSign = this.totalSign
		header.Caption = localize(session ? "Session" : "Game history")
		header.SegmentCaption = header.Caption.toUpperCase()
		header.RatingCaption = localize("Rating").toUpperCase()
		header.TotalCaption = localize("Total").toUpperCase()
		header.NoGames = localize("No games")
		header.Counted = this.counted
		header.Games = this.games
	}

	/** Whether the cursor stands on the arrow of the panel that owns it. */
	private overChevron(): boolean {
		return (
			this.panel.HandlesInput() &&
			this.chevron.Contains(InputManager.CursorOnScreen)
		)
	}


}

function signed(value: number): string {
	return value > 0 ? `+${value}` : value.toString()
}

/** "5 min ago": how long since `at`, in the largest whole unit. */
function ago(at: number, now: number): string {
	const minutes = Math.max(1, Math.floor((now - at) / MINUTE))
	if (minutes < 60) {
		return `${minutes} ${Menu.Localization.Localize("min ago")}`
	}
	const hours = Math.floor(minutes / 60)
	if (hours < 24) {
		return `${hours} ${Menu.Localization.Localize("h ago")}`
	}
	return `${Math.floor(hours / 24)} ${Menu.Localization.Localize("d ago")}`
}
