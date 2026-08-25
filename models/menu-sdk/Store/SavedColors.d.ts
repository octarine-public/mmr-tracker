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
	/** The colour last copied off a picker row, or `undefined` while nothing has been copied. */
	function CopiedColor(): Nullable<Color>
	/**
	 * Holds a colour for the rest of the session so any other picker row can paste it. The value is
	 * kept as given — pass a clone when the source keeps mutating its own.
	 */
	function SetCopiedColor(color: Color): void
	function SavedColorsList(): readonly SavedColor[]
	function SetSavedColorsList(next: SavedColor[]): void
	function SerializeSavedColors(): SavedColor[]
	function ApplySavedColors(stored: unknown): void
}
