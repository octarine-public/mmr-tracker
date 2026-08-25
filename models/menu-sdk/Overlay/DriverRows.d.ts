// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Shell of a driver flyout: the glass panel its rows sit in. */
	const DriverPanelStyle: StyledFactory<{
		[x: string]: {
			[x: string]: RmlStyle
		}
	}>
	/** The small switch a toggle's driven value is set with. */
	function MiniSwitch(props: {
		on: boolean
	}): React.ReactElement
	/**
	 * Text field of a driver row, the same box a slider's number sits in: editable while focused,
	 * committed on blur. `format` prints the stored value, `commit` reads the typed text back.
	 */
	function DriverField(props: {
		width: number
		format: () => string
		commit: (text: string) => void
		field?: React.RefObject<HTMLElement>
	}): React.ReactElement
	/** Value of a picker row, with the chevron that says it opens one. */
	function PickerValue(props: {
		text: string
		anchor: React.RefObject<HTMLElement>
	}): React.ReactElement
	/**
	 * One row of a driver flyout: an icon, a label and whatever control the row carries. `onPress`
	 * runs on click; `onPressRect` receives the row's rect in screen pixels, narrowed to `anchor`
	 * where the row has one, to place a picker against.
	 */
	function DriverRow(props: {
		icon: string
		label: string
		spaced: boolean
		danger?: boolean
		anchor?: React.RefObject<HTMLElement>
		onPress?: () => void
		onPressRect?: (rect: ScreenRect) => void
		children?: React.ReactNode
	}): React.ReactElement
	/** Width the widest of these option names needs in a picker row. */
	function PickerNeed(values: readonly string[]): number
	/** Width a row needs for its label and a control of `right` dp beside it. */
	function RowNeed(label: string, right: number): number
	/** Width a flyout takes for the widest of its rows, never narrower than the panel's floor. */
	function FlyoutWidth(needs: readonly number[]): number
	/** Width the driven-value control of this entry needs. */
	function ValueRowNeed(entry: DriverHolder, driver: EntryDriver): number
	/**
	 * The row a driver's value is set on, in the entry's own control: a switch for a toggle, a
	 * slider for a slider, an option picker for a dropdown or a multiselect.
	 */
	function DriverValueRow(props: {
		entry: DriverHolder
		driver: EntryDriver
		label: string
	}): React.ReactElement
	/** Height a flyout of this many rows takes, its own padding included. */
	function FlyoutHeight(rows: number): number
	/**
	 * Where a driver flyout of this size goes beside its anchor rect, in screen pixels: against the
	 * anchor's right edge at its own height, flipped to the left edge when the screen ends.
	 */
	function FlyoutPlacement(anchor: ScreenRect, widthDp: number, heightDp: number): [number, number]
}
