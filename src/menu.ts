import { EHeaderStyle, HeaderStyles } from "./header"
import { MaxListed } from "./history"
import { Paths } from "./paths"

/** What the panel counts: the session still going, or the newest games whenever they were played. */
export const enum ETrackMode {
	Session,
	History
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
	/**
	 * Whether the recent games stand open under the rating. Kept off the page: the panel's own
	 * arrow flips it, and it only lives here so an opened history stays open after a restart.
	 */
	public readonly Expanded: Menu.Toggle
	public readonly Overlay: MenuSDK.OverlayMenu

	private readonly tree: Menu.Node
	private readonly baseNode = Menu.AddEntry("Visual")
	private readonly nodeIcon = `${Paths.MenuIcons}/review.svg`

	constructor() {
		this.tree = this.baseNode.AddNode("MMR Tracker", this.nodeIcon)
		this.tree.SortNodes = false
		this.State = this.tree.AddToggle("State", true)
		this.tree.HeaderControl = this.State
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

	/** The break, in ms, that ends a session. */
	public get SessionGap(): number {
		return this.SessionBreak.value * HOUR
	}

	public get IsOpen(): boolean {
		return MenuSDK.MenuManager.IsOpen && this.tree.IsOpen
	}
}
