import { Menu, Vector2 } from "github.com/octarine-public/wrapper/index"

export class MenuManager {
	public IsToggled = true
	public readonly State: Menu.Toggle
	public readonly Opacity: Menu.Slider
	public readonly ToggleKey: Menu.KeyBind

	public readonly Position: {
		readonly node: Menu.Node
		readonly X: Menu.Slider
		readonly Y: Menu.Slider
		Vector: Vector2
	}

	private readonly tree: Menu.Node
	private readonly baseNode = Menu.AddEntry("Visual")
	private readonly basePath = "github.com/octarine-public/mmr-tracker/scripts_files/"
	private readonly nodeIcon = this.basePath + "menu/icons/review.svg"

	constructor() {
		this.tree = this.baseNode.AddNode("MMR Tracker", this.nodeIcon)
		this.tree.SortNodes = false

		this.State = this.tree.AddToggle("State", true)
		this.Opacity = this.tree.AddSlider("Opacity", 95, 0, 100)
		this.ToggleKey = this.tree.AddKeybind("Key", "None", "Key turn on/off panel")

		this.Position = this.tree.AddVector2(
			"Settings",
			new Vector2(31, 951),
			new Vector2(0, 0),
			new Vector2(1980, 1080)
		)
		this.Position.node.IsHidden = true

		this.tree
			.AddButton("Reset settings", "Reset settings to default")
			.OnValue(() => this.ResetSettings())

		this.ToggleKey.OnRelease(({ assignedKey }) => {
			if (assignedKey < 0) {
				this.IsToggled = true
				return
			}
			this.IsToggled = !this.IsToggled
		})
	}

	public ResetSettings() {
		this.State.value = this.State.defaultValue
		this.Opacity.value = this.Opacity.defaultValue
		this.Position.X.value = this.Position.X.defaultValue
		this.Position.Y.value = this.Position.Y.defaultValue
		this.ToggleKey.assignedKey = -1
		this.ToggleKey.assignedKeyStr = this.ToggleKey.defaultKey
		this.IsToggled = true
		this.ToggleKey.Update()
		this.tree.Update()
	}
}
