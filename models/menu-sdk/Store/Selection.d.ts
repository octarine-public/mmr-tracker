// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function RevealEntry(entry: Entry): void
	function NodeDepth(node: NodeEntry): number
	function HasNodeChildren(node: NodeEntry): boolean
	function HasVisibleControls(node: NodeEntry): boolean
	function NodeIsOpen(node: NodeEntry): boolean
	function SetOpenRaw(node: NodeEntry, value: boolean): void
	function OpenNode(node: NodeEntry, value: boolean): void
	function ActiveTab(): Nullable<NodeEntry>
	/**
	 * Moves the selection of `node` onto its pinned page, so the page the host
	 * pinned - the hero being played, the account being used - is the one the tab
	 * shows. Does nothing while that page does not exist yet.
	 */
	function OpenPinned(node: NodeEntry): void
	/**
	 * The tab a page with `tabbedChildren` is showing, or nothing when it has none. A page opens on
	 * its first tab and stays where it was left, so the answer is remembered rather than derived.
	 */
	function ActivePageTab(page: NodeEntry): Nullable<NodeEntry>
	function SetActivePageTab(page: NodeEntry, child: NodeEntry): void
	function ActiveContentNode(): Nullable<NodeEntry>
	function SelectGeneral(): void
	function OpenSettingsTab(): void
	function ForEachEntry(node: NodeEntry, callback: (entry: Entry) => void): void
}
