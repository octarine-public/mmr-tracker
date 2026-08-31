import { MMRChangedType } from "./enum"
import { MenuManager } from "./menu"

const PANEL_HEIGHT = 34
const ICON = 18
const FONT = 13
const RATING_RESERVE = "0000"

export class GUIHelper {
	private rating = -1
	private remainder = -1
	private mmrType = MMRChangedType.None

	private readonly size = new Vector2()
	private readonly box = new Rectangle()
	private readonly iconPos = new Vector2()
	private readonly iconSize = new Vector2()
	private readonly panel: MenuSDK.OverlayPanel

	private readonly basePath = "github.com/octarine-public/mmr-tracker/scripts_files/"
	private readonly stats = this.basePath + "images/stats.svg"
	private readonly up = this.basePath + "images/arrow-up.svg"
	private readonly down = this.basePath + "images/arrow-down.svg"

	private readonly drawContent = (origin: Vector2) => {
		const box = this.box
		box.pos1.CopyFrom(origin)
		box.pos2.SetVector(origin.x + this.size.x, origin.y + this.size.y)
		MenuSDK.HudCard.Frame(box)

		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad),
			icon = MenuSDK.hudW(ICON),
			centerY = box.y + this.size.y / 2

		this.iconPos.SetVector(box.x + pad, centerY - icon / 2)
		this.iconSize.SetVector(icon, icon)
		MenuSDK.HudCard.Image(
			this.iconPath(),
			this.iconPos,
			this.iconSize,
			this.iconColor()
		)

		const shown = this.rating === -1 ? 0 : this.rating
		const label = `${Menu.Localization.Localize("Tracker")}: ${shown}${this.remainder === -1 ? " MMR" : ""}`
		let x = box.x + pad + icon + MenuSDK.hudW(MenuSDK.HudHeaderGap)
		x += MenuSDK.HudText.Left(
			x,
			centerY,
			label,
			FONT,
			MenuSDK.HudColors.title,
			MenuSDK.HudBold
		)

		if (this.remainder === -1) {
			return
		}
		const gained = this.mmrType === MMRChangedType.Add
		MenuSDK.HudText.Left(
			x + MenuSDK.hudW(4),
			centerY,
			`(${gained ? "+" : ""}${this.remainder} MMR)`,
			FONT,
			gained ? MenuSDK.HudColors.ok : MenuSDK.HudColors.kill,
			MenuSDK.HudBold
		)
	}

	constructor(private readonly menu: MenuManager) {
		this.panel = new MenuSDK.OverlayPanel(
			menu.Overlay,
			"hud-mmr-tracker",
			MenuSDK.EPanelLife.Standalone
		)
	}

	public Draw(): void {
		if (!this.menu.IsToggled || (this.rating === -1 && !this.menu.IsOpen)) {
			this.panel.Reset()
			return
		}
		MenuSDK.setHudScale(this.panel.Scale)

		const pad = MenuSDK.hudW(MenuSDK.HudCard.Pad),
			icon = MenuSDK.hudW(ICON),
			gap = MenuSDK.hudW(MenuSDK.HudHeaderGap)

		const shown = this.rating === -1 ? 0 : this.rating
		const label = `${Menu.Localization.Localize("Tracker")}: ${shown}${this.remainder === -1 ? " MMR" : ""}`
		let width =
			pad * 2 +
			icon +
			gap +
			Math.max(
				MenuSDK.HudText.Width(label, FONT, MenuSDK.HudBold),
				MenuSDK.HudText.Width(
					`${Menu.Localization.Localize("Tracker")}: ${RATING_RESERVE} MMR`,
					FONT,
					MenuSDK.HudBold
				)
			)
		if (this.remainder !== -1) {
			width +=
				MenuSDK.hudW(4) +
				MenuSDK.HudText.Width(
					`(+${this.remainder} MMR)`,
					FONT,
					MenuSDK.HudBold
				)
		}
		this.size.SetVector(Math.round(width), MenuSDK.hudH(PANEL_HEIGHT))
		this.panel.Draw(this.size, this.drawContent)
	}

	public SetRating(newValue: number, oldValue: number): void {
		const rem = newValue - oldValue
		this.rating = newValue
		this.remainder = newValue === rem ? -1 : rem
		if (this.remainder === -1) {
			this.mmrType = MMRChangedType.None
			return
		}
		this.mmrType = newValue < oldValue ? MMRChangedType.Subtract : MMRChangedType.Add
	}

	public MouseKeyDown(key: VMouseKeys): boolean {
		return this.panel.MouseKeyDown(key)
	}

	public MouseKeyUp(key: VMouseKeys): boolean {
		return key !== VMouseKeys.MK_LBUTTON || this.panel.MouseKeyUp()
	}

	public Reset(): void {
		this.panel.Reset()
	}

	private iconPath(): string {
		switch (this.mmrType) {
			case MMRChangedType.Add:
				return this.up
			case MMRChangedType.Subtract:
				return this.down
			default:
				return this.stats
		}
	}

	private iconColor(): Color {
		switch (this.mmrType) {
			case MMRChangedType.Add:
				return MenuSDK.HudColors.ok
			case MMRChangedType.Subtract:
				return MenuSDK.HudColors.kill
			default:
				return MenuSDK.HudColors.accent
		}
	}
}
