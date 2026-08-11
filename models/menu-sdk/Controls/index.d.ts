// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function MarkColorOf(entry: Entry): string
	/**
	 * Expands rows whose height was still unknown when they mounted. A row is
	 * clamped to zero height on mount, so it never displaces the rows below it,
	 * but a node RmlUi has not formatted yet measures as nothing — its content
	 * height only becomes readable one document update later, which is what this
	 * waits for. Called once per frame from the menu tick.
	 */
	function TickReveals(): void
	function VisibleRows(children: Entry[], skip?: Entry): Entry[]
	function CloseSubSettings(): void
	function DescriptionRow(props: {
		entry: DescriptionEntry
		divider: boolean
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
