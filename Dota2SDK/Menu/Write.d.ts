// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Writes `${value}px` when the number differs from the last one written. */
	function WritePx(element: HTMLElement, name: string, value: number): void
	/**
	 * Whether `value` differs from what this element was last marked with under `name`, marking it
	 * with it either way. Nothing reaches the document: this is the writers' own gate, offered to a
	 * caller whose whole run of writes follows one number and who would rather skip the run than
	 * have every write in it compare for itself. The mark rides the element, so one the document
	 * replaced answers true and is laid out afresh.
	 *
	 * `name` must not be a property any writer uses on the same element - the placement writer's
	 * `p:x` is the pattern to follow.
	 *
	 * @example
	 * if (MarkValue(cell, "m:layout", size)) { ...the cell's whole layout... }
	 */
	function MarkValue(element: HTMLElement, name: string, value: number): boolean
	/** Writes `${value}${suffix}` when the number differs from the last one written. */
	function WriteFmt(element: HTMLElement, name: string, value: number, suffix: string): void
	/** Writes a ready-made value when it differs from the last one written. */
	function WriteStyle(element: HTMLElement, name: string, value: string): void
	/**
	 * Shows or hides an absolutely positioned element; `display` is what showing means for it.
	 * Hiding writes `visibility` alone and leaves `display` in place: visibility does not dirty
	 * layout, so a marker that flaps with projection costs no document reformat — only its
	 * first show pays one.
	 */
	function WriteShown(element: HTMLElement, shown: boolean, display?: string): void
	/**
	 * Places an element by one `transform` write, gated on all three numbers together. On hosts
	 * with the fast path the primitives cross as numbers and skip the transform parser.
	 */
	function WritePlacement(element: HTMLElement, x: number, y: number, angle: number): void
	/**
	 * Writes text by replacing the element's text node, never by rewriting markup: RmlUi hands a
	 * removed child back to the caller instead of freeing it, so a readout that ticks every frame
	 * would strand one node per frame. The stale node goes to the renderer's destroy queue.
	 */
	function WriteText(element: HTMLElement, text: string): void
	/**
	 * Points an image element at its artwork cut for the box it is drawn in. Mip selection lands only
	 * on a power-of-two level and rounds toward the smaller one, so art drawn at a size the chain does
	 * not hold reads soft however well the chain was built; a source minted for that box is cut once,
	 * straight to it, and an element that only moved re-mints nothing.
	 *
	 * Sizes are in whole screen pixels, not dp. An empty path clears the element. What the source was
	 * minted from rides the element, so the one it replaces is handed back only once the new one is
	 * registered - a host counts the holders of a source, and dropping the last one first would free
	 * artwork the element is still drawing. An element the document lets go of is passed to
	 * {@link ReleaseSizedArt}.
	 *
	 * @example
	 * WriteSizedArt(icon, ability.TexturePath, size, size)
	 */
	function WriteSizedArt(element: HTMLElement, path: string, width: number, height: number): void
	/**
	 * Hands the source an element took from {@link WriteSizedArt} back to the host, for an element the
	 * document has let go of. An element still standing keeps its own until its artwork or its box
	 * changes: the source it draws from is the one it names, and freeing that while it is on screen
	 * leaves it naming artwork nothing holds.
	 */
	function ReleaseSizedArt(element: HTMLElement): void
}
