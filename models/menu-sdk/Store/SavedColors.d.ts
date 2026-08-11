// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const SavedColorsKey = "__savedColors"
	const ColorFormatKey = "__colorFormat"
	type ColorFormat = "Hex" | "RGB"
	function PickerFormat(): ColorFormat
	function SetPickerFormat(next: ColorFormat): void
	function ApplyColorFormat(stored: unknown): void
	interface SavedColor {
		color: string
		opacity: number
	}
	function SavedColorsList(): readonly SavedColor[]
	function SetSavedColorsList(next: SavedColor[]): void
	function SerializeSavedColors(): SavedColor[]
	function ApplySavedColors(stored: unknown): void
}
