// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** One visited menu location: the tab, the page it showed and, when that page renders its node children as tabs, the tab that was open. `content === tab` is the tab's General page. */
	interface MenuPlace {
		tab: NodeEntry
		content: NodeEntry
		page: Nullable<NodeEntry>
	}
	/**
	 * Remembers the location the window is rendering. Called once per render with the
	 * current selection; a repeated location is ignored, a new one truncates the
	 * forward stack, and the location a Back/Forward step just applied is settled
	 * instead of re-pushed.
	 */
	function RecordNavigation(tab: NodeEntry, content: NodeEntry, page: Nullable<NodeEntry>): void
	/** The location a Back step would show, or nothing when every earlier one is gone or hidden. */
	function HistoryBackPlace(): Nullable<MenuPlace>
	/** The location a Forward step would show, or nothing when every later one is gone or hidden. */
	function HistoryForwardPlace(): Nullable<MenuPlace>
	/** Reopens the nearest earlier location that is still visible. */
	function NavigateBack(): void
	/** Reopens the nearest later location that is still visible. */
	function NavigateForward(): void
	/** The localization key naming a location, mirroring the breadcrumb: the page name, or "General" for a tab that shows controls next to its pages. */
	function PlaceLabel(place: MenuPlace): string
}
