import { Paths } from "./paths"

export class MenuManager {
	public IsToggled = true
	public readonly State: Menu.Toggle
	public readonly ToggleKey: Menu.KeyBind
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

	public get IsOpen(): boolean {
		return MenuSDK.MenuManager.IsOpen && this.tree.IsOpen
	}
}
