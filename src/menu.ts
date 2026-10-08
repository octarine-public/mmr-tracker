import { EHeaderStyle, HeaderStyles } from "./header"
import { MaxListed } from "./history"
import { Paths } from "./paths"

/** What the panel counts: the session still going, or the newest games whenever they were played. */
export const enum ETrackMode {
	Session,
	History
}

/** Which way the history unfolds from the rating. */
export const enum EOpenDirection {
	Up,
	Down
}

const HOUR = 60 * 60 * 1000

export class MenuManager {
	public IsToggled = true
	public readonly State: Menu.Toggle
	public readonly ToggleKey: Menu.KeyBind
	public readonly Style: Menu.Dropdown
	public readonly Mode: Menu.Dropdown
	public readonly SessionBreak: Menu.Slider
	public readonly History: Menu.Slider
	public readonly Direction: Menu.Dropdown
	/**
	 * Whether the recent games stand open beside the rating. Kept off the page: the panel's own
	 * arrow flips it, and it only lives here so an opened history stays open after a restart.
	 */
	public readonly Expanded: Menu.Toggle
	public readonly Overlay: MenuSDK.OverlayMenu

	private readonly tree: Menu.Node
	/**
	 * The Insights section, shared with the Overwolf script: the tracker is one of the pages
	 * in its side column, after the Overwolf panel's own (priority 1).
	 */
	private readonly baseNode = Menu.AddEntry(
		"Insights",
		PathData.WrapperMenuPath + "/icons/info.svg"
	)
	private readonly nodeIcon = `${Paths.MenuIcons}/review.svg`

	constructor() {
		// the page was filed under Visual: a config saved there still lands on it
		MenuSDK.AddConfigMigration(raw =>
			MenuSDK.MigrateNodeTab(raw, "Visual", "Insights", "MMR Tracker")
		)
		this.tree = this.baseNode.AddNode("MMR Tracker", this.nodeIcon, "", -1, 1)
		this.tree.SortNodes = false
		this.State = this.tree.AddToggle("State", true)
		this.tree.HeaderControl = this.State
		this.tree.Gate = this.State
		this.ToggleKey = this.tree.AddKeybind("Key", "None", "Key turn on/off panel")
		this.ToggleKey.IconPath = MenuSDK.MenuIcons.Keyboard
		this.Overlay = new MenuSDK.OverlayMenu(this.tree, 31, 951)
		this.Style = this.tree.AddDropdown(
			"Style",
			HeaderStyles,
			EHeaderStyle.Chips,
			"How the panel shows the rating\nand the counted games"
		)
		this.Style.IconPath = MenuSDK.MenuIcons.Palette
		this.Mode = this.tree.AddDropdown(
			"Track",
			["Session", "Game history"],
			ETrackMode.Session,
			"Session: the games played without a long break.\nGame history: the newest games"
		)
		this.Mode.IconPath = MenuSDK.MenuIcons.ListFilter
		this.SessionBreak = this.tree.AddSlider(
			"Session break",
			5,
			1,
			12,
			0,
			"Hours without a ranked game\nafter which a new session starts"
		)
		this.SessionBreak.IconPath = MenuSDK.MenuIcons.Hourglass
		this.History = this.tree.AddSlider(
			"Games in history",
			5,
			1,
			MaxListed,
			0,
			"How many recent ranked games\nthe panel lists when opened"
		)
		this.History.IconPath = MenuSDK.MenuIcons.History
		this.Direction = this.tree.AddDropdown(
			"Open direction",
			["Up", "Down"],
			EOpenDirection.Up,
			"Which way the recent games unfold\nfrom the rating"
		)
		this.Direction.IconPath = MenuSDK.MenuIcons.ChevronsUpDown
		this.Expanded = this.tree.AddToggle("Expanded", false)
		this.Expanded.IsHidden = true
		this.Mode.OnValue(() => (this.SessionBreak.IsHidden = !this.IsSession))
		this.SessionBreak.IsHidden = !this.IsSession
		this.State.OnValue(control => this.Overlay.SetHidden(!control.value))
		this.Overlay.SetHidden(!this.State.value)
		this.ToggleKey.OnRelease(({ assignedKey }) => {
			if (assignedKey < 0) {
				this.IsToggled = true
				return
			}
			this.IsToggled = !this.IsToggled
		})
	}

	public get IsSession(): boolean {
		return this.Mode.SelectedID === ETrackMode.Session
	}

	public get OpensUp(): boolean {
		return this.Direction.SelectedID === EOpenDirection.Up
	}

	/** The break, in ms, that ends a session. */
	public get SessionGap(): number {
		return this.SessionBreak.value * HOUR
	}

	public get IsOpen(): boolean {
		return MenuSDK.MenuManager.IsOpen && this.tree.IsActivePage
	}
}
