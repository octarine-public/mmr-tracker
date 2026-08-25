// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** The node whose settings are on screen, or nothing while none are. */
	function ElementSettingsNode(): Nullable<Node>
	/**
	 * Opens one element's settings beside `stage`, the preview the element was clicked on. `shared`
	 * answers with the node the element is drawn by while those rows are not its own, and is asked
	 * again on every render — the panel is where an element is taken off them.
	 */
	function OpenElementSettings(node: Node, stage: Readonly<ScreenRect>, shared?: () => Nullable<Node>): void
	/** Opens a grouped set of existing menu cards under one settings header beside a preview. */
	function OpenGroupedSettings(header: Node, stage: Readonly<ScreenRect>, sections: () => readonly Node[]): void
	function CloseElementSettings(): void
}
