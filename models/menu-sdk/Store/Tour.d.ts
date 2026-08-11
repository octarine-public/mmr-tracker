// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Config key holding whether the menu tour was already shown. */
	const TourSeenKey = "__tourSeen"
	/**
	 * Whether the tour was already shown (closed or walked to the end). Reads as
	 * seen when the config cannot persist, so a host without storage is not
	 * greeted by the tour on every launch.
	 */
	function HasSeenTour(): boolean
	/** Marks the tour as shown; called on any close of the tour. */
	function MarkTourSeen(): void
	function SerializeTourSeen(): boolean
	function ApplyTourSeen(stored: unknown): void
}
