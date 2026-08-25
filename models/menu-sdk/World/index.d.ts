// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The world drawing surface for one script, created on first use and kept for the session.
	 * Draw from a `Draw` listener with the immediate calls, or set up retained nodes once and
	 * let them follow their anchors. On a host without an engine — the standalone menu — every
	 * call is a quiet no-op.
	 */
	function CreateWorldLayer(key: string): IWorldLayer
	/**
	 * Opens the shader slot pool for the frame ahead. The menu ticks after the game has drawn, so
	 * this is the end of its tick: a card pinned to the screen claims its slots from a `Draw` of the
	 * game's, a world overlay claims from the tick that follows, and both belong to the same frame -
	 * resetting between them handed one slot to two writers and the second one's geometry won.
	 */
	function EndWorldFrame(): void
	/** Ticks every unit overlay, then flushes every world layer; the menu tick drives this. */
	function TickWorldLayers(): void
}
