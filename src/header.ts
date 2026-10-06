import { IGame } from "./history"
import { Palette, SignColor } from "./palette"
import { Paths } from "./paths"

/** How the header line reads the rating and what the counted games came to. */
export const enum EHeaderStyle {
	/** Wins, losses and the total each in a chip of its colour. */
	Chips,
	/** A large rating with the session written small under it, the total large on the right. */
	TwoLines,
	/** Three captioned columns: rating, wins to losses, total. */
	Segments,
	/** The rating with its total, and a square for every game under it, oldest first. */
	Strip,
	/** The rating, the total raised beside it and a dot for every game. */
	Minimal
}

export const HeaderStyles = ["Chips", "Two lines", "Segments", "Game strip", "Minimal"]

const ICON = 18
const ICON_LARGE = 22
const RATING_RESERVE = "0000"
const RATING_FONT = 14
const UNIT_FONT = 11
const UNIT_GAP = 4
const SMALL_FONT = 11
const SMALL_WEIGHT = 500
const CAPTION_FONT = 9
/** The single-line header, and the two-line one the stacked styles take. */
const HEIGHT = 34
const HEIGHT_TALL = 46
const HEIGHT_STRIP = 52
/** How far each of a stacked header's two lines sits off its middle. */
const LINE_OFFSET = 8
const STRIP_ROW = 18
const STRIP_SECOND = 38
const CHIP_FONT = 12
const CHIP_PAD = 7
const CHIP_HEIGHT = 20
const CHIP_RADIUS = 6
const CHIP_GAP = 5
const CHIP_TINT = 36
const CHIP_EDGE = 89
const DIVIDER_ALPHA = 20
const DIVIDER_GAP = 10
const DIVIDER_HEIGHT = 18
const SEGMENT_GAP = 12
const SEGMENT_DIVIDER = 26
const SEGMENT_VALUE = 14
const TOTAL_LARGE = 16
const TOTAL_GAP = 14
const SQUARE = 10
const SQUARE_GAP = 4
const SQUARE_RADIUS = 3
const SQUARE_TINT = 210
const STRIP_MAX = 15
const DOT_RADIUS = 3.5
const DOT_GAP = 4
const DOTS_MAX = 10
const RAISE = 4

/**
 * The header line in each of its styles. Every style is one walk that measures or draws, so the
 * width a card is sized to and what is drawn on it can never disagree. The texts are worded by
 * the panel and handed in; the walk only lays them out.
 */
export class HeaderPainter {
	public Rating = "0"
	public Unit = "MMR"
	/** "3W" and "1L", the session's wins and losses as the chips read them. */
	public Wins = ""
	public Losses = ""
	public WinCount = ""
	public LossCount = ""
	public Total = ""
	/** Which way the total went: above zero a gain, below a loss. */
	public TotalSign = 0
	/** What the counted games are: the session, or the game history. */
	public Caption = ""
	public SegmentCaption = ""
	public RatingCaption = ""
	public TotalCaption = ""
	public NoGames = ""
	public Counted = 0
	public Games: readonly IGame[] = []

	private drawing = false
	private readonly pos = new Vector2()
	private readonly size = new Vector2()
	private readonly icon = `${Paths.Images}/rating.svg`

	public Height(style: EHeaderStyle): number {
		switch (style) {
			case EHeaderStyle.TwoLines:
			case EHeaderStyle.Segments:
				return HEIGHT_TALL
			case EHeaderStyle.Strip:
				return HEIGHT_STRIP
			default:
				return HEIGHT
		}
	}

	/** Where the header's content ends, from its left edge; the arrow is the panel's. */
	public Width(style: EHeaderStyle): number {
		this.drawing = false
		return this.layout(style, 0, 0)
	}

	public Draw(style: EHeaderStyle, x: number, top: number): void {
		this.drawing = true
		this.layout(style, x, top)
	}

	private layout(style: EHeaderStyle, left: number, top: number): number {
		switch (style) {
			case EHeaderStyle.TwoLines:
				return this.twoLines(left, top) - left
			case EHeaderStyle.Segments:
				return this.segments(left, top) - left
			case EHeaderStyle.Strip:
				return this.strip(left, top) - left
			case EHeaderStyle.Minimal:
				return this.minimal(left, top) - left
			default:
				return this.chips(left, top) - left
		}
	}

	private chips(left: number, top: number): number {
		const cy = top + MenuSDK.hudH(HEIGHT) / 2
		let x = this.lead(left, cy, ICON)
		x = this.rating(x, cy)
		if (this.Counted === 0) {
			return x
		}
		x += MenuSDK.hudW(DIVIDER_GAP)
		this.divider(x, cy, DIVIDER_HEIGHT)
		x += MenuSDK.hudW(1 + DIVIDER_GAP)
		x += this.chip(x, cy, this.Wins, Palette.gain) + MenuSDK.hudW(CHIP_GAP)
		x += this.chip(x, cy, this.Losses, Palette.loss) + MenuSDK.hudW(CHIP_GAP)
		return x + this.chip(x, cy, this.Total, SignColor(this.TotalSign))
	}

	private twoLines(left: number, top: number): number {
		const cy = top + MenuSDK.hudH(HEIGHT_TALL) / 2
		const offset = MenuSDK.hudH(LINE_OFFSET)
		const x = this.lead(left, cy, ICON_LARGE)
		const first = this.rating(x, cy - offset, RATING_FONT + 1)
		const second = this.record(x, cy + offset, true)
		let end = Math.max(first, second)
		if (this.Counted !== 0) {
			end += MenuSDK.hudW(TOTAL_GAP)
			end += this.text(end, cy, this.Total, TOTAL_LARGE, SignColor(this.TotalSign))
		}
		return end
	}

	private segments(left: number, top: number): number {
		const cy = top + MenuSDK.hudH(HEIGHT_TALL) / 2
		const captionY = cy - MenuSDK.hudH(LINE_OFFSET)
		const valueY = cy + MenuSDK.hudH(LINE_OFFSET - 1)
		const caption = Palette.caption
		let x = this.lead(left, cy, ICON)

		const rating = Math.max(
			this.text(x, captionY, this.RatingCaption, CAPTION_FONT, caption),
			this.slot(x, valueY, this.Rating, SEGMENT_VALUE, Palette.title)
		)
		x = this.segmentGap(x + rating, cy)

		let score = x
		score += this.text(score, valueY, this.WinCount, SEGMENT_VALUE, Palette.gain)
		score += this.text(score, valueY, " – ", SEGMENT_VALUE, Palette.faint)
		score += this.text(score, valueY, this.LossCount, SEGMENT_VALUE, Palette.loss)
		const named = this.text(x, captionY, this.SegmentCaption, CAPTION_FONT, caption)
		x = this.segmentGap(Math.max(score, x + named), cy)

		return (
			x +
			Math.max(
				this.text(x, captionY, this.TotalCaption, CAPTION_FONT, caption),
				this.text(x, valueY, this.Total, SEGMENT_VALUE, SignColor(this.TotalSign))
			)
		)
	}

	private strip(left: number, top: number): number {
		const cy = top + MenuSDK.hudH(STRIP_ROW)
		const x = this.lead(left, cy, ICON)
		let first = this.rating(x, cy)
		if (this.Counted !== 0) {
			first += MenuSDK.hudW(DIVIDER_GAP)
			first += this.chip(first, cy, this.Total, SignColor(this.TotalSign))
		}

		const below = top + MenuSDK.hudH(STRIP_SECOND)
		if (this.Counted === 0) {
			const empty = this.small(x, below, this.NoGames, Palette.faint)
			return Math.max(first, x + empty)
		}
		const size = MenuSDK.hudW(SQUARE)
		const step = size + MenuSDK.hudW(SQUARE_GAP)
		let second = x
		for (let i = Math.min(this.Counted, STRIP_MAX) - 1; i >= 0; i--) {
			if (this.drawing) {
				MenuSDK.HudCard.Chip(
					second,
					below - size / 2,
					size,
					size,
					SQUARE_RADIUS,
					this.gameColor(i),
					MenuSDK.hudAlpha(SQUARE_TINT),
					MenuSDK.hudAlpha()
				)
			}
			second += step
		}
		second += MenuSDK.hudW(DIVIDER_GAP - SQUARE_GAP)
		second += this.record(second, below, false)
		return Math.max(first, second)
	}

	private minimal(left: number, top: number): number {
		const cy = top + MenuSDK.hudH(HEIGHT) / 2
		let x = this.lead(left, cy, ICON)
		x += this.slot(x, cy, this.Rating, RATING_FONT, Palette.title)
		if (this.Counted === 0) {
			return x
		}
		x += MenuSDK.hudW(3)
		x += this.text(x, cy - MenuSDK.hudH(RAISE), this.Total, SMALL_FONT, SignColor(this.TotalSign))
		x += MenuSDK.hudW(DIVIDER_GAP)
		const radius = MenuSDK.hudW(DOT_RADIUS)
		const step = radius * 2 + MenuSDK.hudW(DOT_GAP)
		const count = Math.min(this.Counted, DOTS_MAX)
		for (let i = count - 1; i >= 0; i--) {
			if (this.drawing) {
				MenuSDK.HudCard.Disc(x + radius, cy, radius, this.gameColor(i), MenuSDK.hudAlpha())
			}
			x += step
		}
		return x - MenuSDK.hudW(DOT_GAP)
	}

	/** The icon at the card's left edge. Answers where the content after it starts. */
	private lead(left: number, cy: number, icon: number): number {
		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad)
		const size = MenuSDK.hudW(icon)
		if (this.drawing) {
			this.pos.SetVector(left + pad, cy - size / 2)
			this.size.SetVector(size, size)
			MenuSDK.HudCard.Image(
				this.icon,
				this.pos,
				this.size,
				Palette.icon,
				MenuSDK.hudAlpha()
			)
		}
		return left + pad + size + MenuSDK.hudW(MenuSDK.HudHeaderGap)
	}

	/** "3987 MMR", the number held to the room four digits take. Answers where it ends. */
	private rating(x: number, cy: number, size = RATING_FONT): number {
		x += this.slot(x, cy, this.Rating, size, Palette.title)
		x += MenuSDK.hudW(UNIT_GAP)
		return x + this.text(x, cy, this.Unit, UNIT_FONT, Palette.muted)
	}

	/**
	 * "3W 1L" in their colours, after the caption when it is asked for, or the caption with nothing
	 * yet when no game counts. Answers where it ends when captioned, its width when not.
	 */
	private record(x: number, cy: number, captioned: boolean): number {
		const start = x
		const muted = Palette.muted
		if (captioned) {
			x += this.small(x, cy, this.Caption, muted)
			x += this.small(x, cy, " · ", muted)
			if (this.Counted === 0) {
				return x + this.small(x, cy, this.NoGames, Palette.faint)
			}
		}
		x += this.count(x, cy, this.Wins, captioned ? Palette.gain : muted)
		x += this.small(x, cy, " ", muted)
		x += this.count(x, cy, this.Losses, captioned ? Palette.loss : muted)
		return captioned ? x : x - start
	}

	/** A hairline standing between two segments, with a gap either side. */
	private segmentGap(x: number, cy: number): number {
		x += MenuSDK.hudW(SEGMENT_GAP)
		this.divider(x, cy, SEGMENT_DIVIDER)
		return x + MenuSDK.hudW(1 + SEGMENT_GAP)
	}

	private divider(x: number, cy: number, height: number): void {
		if (!this.drawing) {
			return
		}
		const h = MenuSDK.hudH(height)
		MenuSDK.HudCard.Fill(
			x,
			cy - h / 2,
			MenuSDK.hudW(1),
			h,
			Color.White,
			MenuSDK.hudAlpha(DIVIDER_ALPHA)
		)
	}

	/** A run in a chip of its colour. Answers the chip's width. */
	private chip(x: number, cy: number, text: string, color: Color): number {
		const width =
			MenuSDK.HudText.Width(text, CHIP_FONT, MenuSDK.HudBold) +
			MenuSDK.hudW(CHIP_PAD) * 2
		if (this.drawing) {
			const height = MenuSDK.hudH(CHIP_HEIGHT)
			MenuSDK.HudCard.Chip(
				x,
				cy - height / 2,
				width,
				height,
				CHIP_RADIUS,
				color,
				MenuSDK.hudAlpha(CHIP_TINT),
				MenuSDK.hudAlpha(CHIP_EDGE)
			)
			MenuSDK.HudText.Center(x, cy, width, text, CHIP_FONT, color, MenuSDK.HudBold)
		}
		return width
	}

	/** A number kept to the room four digits take, so the line does not breathe as it moves. */
	private slot(x: number, cy: number, text: string, size: number, color: Color): number {
		return Math.max(
			this.text(x, cy, text, size, color),
			MenuSDK.HudText.Width(RATING_RESERVE, size, MenuSDK.HudBold)
		)
	}

	/** A count in the bold its colour needs to read at the small size. */
	private count(x: number, cy: number, text: string, color: Color): number {
		return this.text(x, cy, text, SMALL_FONT, color)
	}

	private small(x: number, cy: number, text: string, color: Color): number {
		return this.text(x, cy, text, SMALL_FONT, color, SMALL_WEIGHT)
	}

	private text(
		x: number,
		cy: number,
		text: string,
		size: number,
		color: Color,
		weight: number = MenuSDK.HudBold
	): number {
		if (this.drawing) {
			MenuSDK.HudText.Left(x, cy, text, size, color, weight)
		}
		return MenuSDK.HudText.Width(text, size, weight)
	}

	private gameColor(index: number): Color {
		return this.Games[index].delta >= 0 ? Palette.gain : Palette.loss
	}
}
