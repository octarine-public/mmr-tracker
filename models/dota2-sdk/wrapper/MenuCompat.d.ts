// AUTO-GENERATED - do not edit.
declare namespace Menu {
	type Base = MenuSDK.AnyHandle
	type Node = MenuSDK.Node
	type Toggle = MenuSDK.Toggle
	type Slider = MenuSDK.Slider
	type Dropdown = MenuSDK.Dropdown
	type MultiSelect = MenuSDK.MultiSelect
	type KeyBind = MenuSDK.Keybind
	type Button = MenuSDK.Button
	type ColorPicker = MenuSDK.ColorPicker
	type TextInput = MenuSDK.TextInput
	type ImageSelector = MenuSDK.ImageSelector
	type ImageSelectorArray = MenuSDK.ImageSelector
	type ShortDescription = MenuSDK.ShortDescription
	type DynamicImageSelector = MenuSDK.ImageSelector
	type IMenuParticlePicker = MenuSDK.ParticlePicker
	type IMenuVector2 = MenuSDK.Vector2Handle
	type PaletteColorToken = MenuSDK.PaletteColorToken
	type IThemeSeeds = MenuSDK.IThemeSeeds
	type IThemePalette = MenuSDK.IThemePalette
	const Base: {
		TriggerWhileTyping: boolean
		SaveConfigASAP: boolean
		NoWriteConfig: boolean
		IsLoadingConfig: boolean
		DrawMarksNew: boolean
		DrawMarksNonDefault: boolean
		HoverAnimation: boolean
		IntroAnimation: boolean
		MenuOpenAnimation: boolean
		MenuOpenEffect: number
		MenuOpenDuration: number
		RailAnimation: boolean
		TabOpenAnimation: boolean
		LayoutSwitchAnimation: boolean
		HotkeysPanelAnimation: boolean
		TooltipStyle: MenuSDK.TooltipStyle
		Flash(element: MenuSDK.Flashable): void
	}
	const Node: typeof MenuSDK.Node
	const Toggle: typeof MenuSDK.Toggle
	const Slider: typeof MenuSDK.Slider
	const Dropdown: typeof MenuSDK.Dropdown
	const MultiSelect: typeof MenuSDK.MultiSelect
	const KeyBind: typeof MenuSDK.Keybind
	const Button: typeof MenuSDK.Button
	const ColorPicker: typeof MenuSDK.ColorPicker
	const TextInput: typeof MenuSDK.TextInput
	const ImageSelector: typeof MenuSDK.ImageSelector
	const ShortDescription: typeof MenuSDK.ShortDescription
	const Localization: MenuSDK.CLocalization
	const MenuManager: MenuSDK.CMenuManager
	const Theme: MenuSDK.CTheme
	const ThemePresets: Map<string, MenuSDK.IThemeSeeds>
	const DefaultSeeds: MenuSDK.IThemeSeeds
	const PaletteGroups: MenuSDK.IPaletteGroup[]
	const PaletteTokenNames: Record<MenuSDK.PaletteColorToken, string>
	const BuildPalette: typeof MenuSDK.BuildPalette
	const cssColor: typeof MenuSDK.cssColor
	const parseHex: typeof MenuSDK.parseHex
	const Icons: {
		readonly Activity: "menu/ui/activity.svg"
		readonly Animation: "menu/ui/animation.svg"
		readonly ArrowLeft: "menu/ui/arrow-left.svg"
		readonly ArrowRight: "menu/ui/arrow-right.svg"
		readonly ArrowUpDown: "menu/ui/arrow-up-down.svg"
		readonly Baseline: "menu/ui/baseline.svg"
		readonly Blur: "menu/ui/blur.svg"
		readonly Check: "menu/ui/check.svg"
		readonly Checkerboard: "menu/ui/checkerboard.svg"
		readonly ChevronDown: "menu/ui/chevron-down.svg"
		readonly ChevronRight: "menu/ui/chevron-right.svg"
		readonly ChevronUp: "menu/ui/chevron-up.svg"
		readonly ChevronsLeft: "menu/ui/chevrons-left.svg"
		readonly ChevronsRight: "menu/ui/chevrons-right.svg"
		readonly ChevronsUpDown: "menu/ui/chevrons-up-down.svg"
		readonly CircleAlert: "menu/ui/circle-alert.svg"
		readonly Clock: "menu/ui/clock.svg"
		readonly Eraser: "menu/ui/eraser.svg"
		readonly Expand: "menu/ui/expand.svg"
		readonly Files: "menu/ui/files.svg"
		readonly Globe: "menu/ui/globe.svg"
		readonly GridPick: "menu/ui/grid-pick.svg"
		readonly Heart: "menu/ui/heart.svg"
		readonly HeartFilled: "menu/ui/heart-filled.svg"
		readonly History: "menu/ui/history.svg"
		readonly HoverArrow: "menu/ui/hover-arrow.svg"
		readonly ImageOff: "menu/ui/image-off.svg"
		readonly Info: "menu/ui/info.svg"
		readonly Keyboard: "menu/ui/keyboard.svg"
		readonly Logo: "menu/ui/logo.svg"
		readonly Maximize2: "menu/ui/maximize-2.svg"
		readonly MenuOpen: "menu/ui/menu-open.svg"
		readonly Minimize2: "menu/ui/minimize-2.svg"
		readonly PaintRoller: "menu/ui/paint-roller.svg"
		readonly Palette: "menu/ui/palette.svg"
		readonly PanelLeft: "menu/ui/panel-left.svg"
		readonly PanelTop: "menu/ui/panel-top.svg"
		readonly Pipette: "menu/ui/pipette.svg"
		readonly Power: "menu/ui/power.svg"
		readonly PowerOff: "menu/ui/power-off.svg"
		readonly Radius: "menu/ui/radius.svg"
		readonly RefreshCw: "menu/ui/refresh-cw.svg"
		readonly RotateCcw: "menu/ui/rotate-ccw.svg"
		readonly Rows3: "menu/ui/rows-3.svg"
		readonly Scan: "menu/ui/scan.svg"
		readonly Search: "menu/ui/search.svg"
		readonly SearchSolid: "menu/ui/search-solid.svg"
		readonly Settings: "menu/ui/settings.svg"
		readonly Settings2: "menu/ui/settings-2.svg"
		readonly SettingsSolid: "menu/ui/settings-solid.svg"
		readonly GlobeSolid: "menu/ui/globe-solid.svg"
		readonly ShieldCheck: "menu/ui/shield-check.svg"
		readonly Sparkles: "menu/ui/sparkles.svg"
		readonly SquareStack: "menu/ui/square-stack.svg"
		readonly TabOpen: "menu/ui/tab-open.svg"
		readonly TextSize: "menu/ui/text-size.svg"
		readonly Timer: "menu/ui/timer.svg"
		readonly Type: "menu/ui/type.svg"
		readonly Undo2: "menu/ui/undo-2.svg"
		readonly X: "menu/ui/x.svg"
		readonly Zap: "menu/ui/zap.svg"
		readonly IconAlert: "menu/icons/alert.svg"
		readonly IconCamera: "menu/icons/camera.svg"
		readonly IconChanger: "menu/icons/changer.svg"
		readonly IconCheck: "menu/icons/check.svg"
		readonly IconCloudConfig: "menu/icons/cloud-config.svg"
		readonly IconColorPickerPaintPalette: "menu/icons/color_picker_paint_palette.svg"
		readonly IconCreeps: "menu/icons/creeps.svg"
		readonly IconDebugger: "menu/icons/debugger.svg"
		readonly IconDocument1: "menu/icons/document1.svg"
		readonly IconDodger: "menu/icons/dodger.svg"
		readonly IconExploits: "menu/icons/exploits.svg"
		readonly IconEye: "menu/icons/eye.svg"
		readonly IconEyeTrueSight: "menu/icons/eye_true_sight.svg"
		readonly IconEyeVbe: "menu/icons/eye_vbe.svg"
		readonly IconGlobe: "menu/icons/globe.svg"
		readonly IconHome: "menu/icons/home.svg"
		readonly IconInfo: "menu/icons/info.svg"
		readonly IconJuggernaut: "menu/icons/juggernaut.svg"
		readonly IconLang: "menu/icons/lang.svg"
		readonly IconMisc: "menu/icons/misc.svg"
		readonly IconNotification: "menu/icons/notification.svg"
		readonly IconReload: "menu/icons/reload.svg"
		readonly IconSearch: "menu/icons/search.svg"
		readonly IconSettings: "menu/icons/settings.svg"
		readonly IconTools: "menu/icons/tools.svg"
	}
	function AddEntry(name: string, iconPath?: string, tooltip?: string, iconRound?: number, priority?: number): MenuSDK.Node
	function AddEntryDeep(names: string[], iconPaths?: string[]): MenuSDK.Node
}
