// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Icon at the right edge of a context-menu row. With `run` it is a button:
	 * clicking it runs the action and keeps the menu open — the rows rebuild in
	 * place. Without `run` it is a passive indicator, like the chevron of a row
	 * that opens a side panel.
	 */
	interface ContextMenuTrailing {
		readonly icon: string
		readonly run?: () => void
	}
	/**
	 * One row of the context menu. A disabled row is greyed out, keeps its hover
	 * fill off and swallows the click. `run` runs on click and closes the menu; a
	 * row with `flyout` instead keeps the menu open and receives the menu rect at
	 * its own height, in screen pixels, to place a side panel against. `open`
	 * keeps the hover fill on while the row's side panel is showing.
	 */
	interface ContextMenuItem {
		readonly icon: string
		readonly label: string
		readonly disabled: boolean
		readonly run?: () => void
		readonly trailing?: ContextMenuTrailing
		readonly flyout?: (anchor: ScreenRect) => void
		readonly open?: boolean
	}
	/**
	 * Opens the context menu at a screen position with rows of your own, so a
	 * surface that is not an {@link Entry} gets the same panel and hit behaviour.
	 * An empty list opens nothing.
	 *
	 * @example
	 * OpenContextMenuAt(
	 *     [{ icon: "menu/ui/rotate-ccw.svg", label: "Reset", disabled: false, run: reset }],
	 *     Number(event.data.screenX ?? 0),
	 *     Number(event.data.screenY ?? 0)
	 * )
	 */
	function OpenContextMenuAt(items: readonly ContextMenuItem[], x: number, y: number): void
	function OpenContextMenu(entry: Entry, x: number, y: number): void
	function CloseContextMenu(): void
}
