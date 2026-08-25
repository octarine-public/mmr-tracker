// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function MarkColorOf(entry: Entry): string
	function VisibleRows(children: Entry[], skip?: Entry): Entry[]
	function CloseSubSettings(): void
	function DescriptionRow(props: {
		entry: DescriptionEntry
		divider: boolean
	}): React.ReactElement
	/**
	 * The switch itself, detached from any entry: the same track, knob, classes and easing the
	 * menu's toggle rows wear, driven by a plain boolean — for a surface whose state lives
	 * somewhere no entry stands for, a floating window's sidebar being the one so far.
	 */
	function SwitchFace(props: {
		on: boolean
		inert?: boolean
		scope?: EThemeScope
		style?: RmlStyle
	}): React.ReactElement
	function ToggleTrack(props: {
		entry: ToggleEntry
	}): React.ReactElement
	function ToggleRow(props: {
		entry: ToggleEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function SliderRow(props: {
		entry: SliderEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function SliderTrack(props: {
		entry: SliderEntry
	}): React.ReactElement
	function DropdownRow(props: {
		entry: DropdownEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function MultiSelectRow(props: {
		entry: MultiSelectEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function KeybindRow(props: {
		entry: KeybindEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ButtonRow(props: {
		entry: ButtonEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ColorSwatch(props: {
		entry: ColorEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function TextField(props: {
		entry: TextEntry
		style?: RmlStyle
		radius?: number
		leadIcon?: string
		placeholder?: string
		/**
		 * Laid-out width of the field in dp. Only the placeholder needs it: a hint that does not fit
		 * the remaining room falls back to the generic "Search" instead of running past the field.
		 */
		width?: number
		/**
		 * Drops the field's own chrome — the surface fill, border, focus ring and horizontal
		 * padding — so typing starts where the host lays the field out. For hosts that draw
		 * the surroundings themselves, like the search modal's input row.
		 */
		bare?: boolean
		/**
		 * Paints the border in the danger tone while the entered value is known to be rejected —
		 * a share code the server refused. The host derives it from the current text, so the
		 * tint clears as soon as the value is edited.
		 */
		invalid?: boolean
		autoFocus?: boolean
		onKeyDown?: (event: Event) => boolean
	}): React.ReactElement
	function TextInputRow(props: {
		entry: TextEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement
	function ImageSelectorRow(props: {
		entry: ImagesEntry
		divider: boolean
		nested?: boolean
	}): React.ReactElement | null
	function RenderControl(entry: Entry, divider?: boolean, nested?: boolean): React.ReactNode
}
