// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Side of a tab icon in the rail, in dp — what the General «Icon size» setting picks. */
	function RailIconSize(): number
	/**
	 * Draws the rail icons at the compact size instead of the default one. The caller
	 * invalidates; nothing else in the rail changes size with them.
	 */
	function SetRailIconsSmall(small: boolean): void
	function BeginWindowDrag(event: Event, state: WindowState): void
	function TopCompressOf(state: {
		w: number
	}, tabs: NodeEntry[], current: number): number
	function TopNav(props: {
		nodes: NodeEntry[]
		activeTab: Nullable<NodeEntry>
		state: WindowState
		compress: number
	}): React.ReactElement
	function SetLayoutSwitcher(switcher: Nullable<() => void>): void
	function Rail(props: {
		nodes: NodeEntry[]
		activeTab: Nullable<NodeEntry>
		state: WindowState
		widths: WindowColumns
		rootRef: React.RefCallback<HTMLElement>
		contentRef: React.RefCallback<HTMLElement>
		dividerRef: React.RefCallback<HTMLElement>
		onToggle: (update: () => void) => void
	}): React.ReactElement
	function SubPanel(props: {
		tab: NodeEntry
		nodes: NodeEntry[]
		content: Nullable<NodeEntry>
		state: WindowState
		widths: WindowColumns
		rootRef: React.RefCallback<HTMLElement>
	}): React.ReactElement
	function TopBar(props: {
		tab: Nullable<NodeEntry>
		content: Nullable<NodeEntry>
		header?: ValueEntry
		state: WindowState
	}): React.ReactElement
	function Resizers(props: {
		state: WindowState
	}): React.ReactElement
	function WindowSuppressed(): boolean
	function CursorInWindow(state: WindowState): boolean
}
