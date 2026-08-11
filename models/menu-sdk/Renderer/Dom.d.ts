// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function cssName(key: string): string
	function dp(value: number): string
	function applyStyle(element: HTMLElement, style: RmlStyle): void
	function clearStyle(element: HTMLElement, keys: string[]): void
	function retintStyles(root: HTMLElement): void
	function listen(element: HTMLElement, name: string, callback: (event: Event) => void): void
	function unlisten(element: HTMLElement, name: string, callback: (event: Event) => void): void
	/**
	 * Detaches the element and hands it to the destroy queue. Pass `parent` when the element is
	 * still attached; without it the caller asserts the element is already detached. A failed
	 * detach keeps the element alive — destroying an attached element is worse than leaking one —
	 * but once detached it is always queued: skipping the queue leaks the native element.
	 */
	function deferDestroy(element: HTMLElement, parent?: HTMLElement): void
	function runAfterFrame(action: () => void): void
	/**
	 * Defers an action until the engine has performed a document update, so
	 * element offsets and sizes read fresh layout. Unlike runAfterFrame, whose
	 * queue drains at several points inside one frame and runs re-queued actions
	 * immediately, this queue drains once per menu frame and an action queued
	 * while draining runs on the next frame — rescheduling from the callback
	 * retries at most once per document update.
	 */
	function runAfterLayout(action: () => void): void
	function flushAfterLayout(): void
	function flushDestroyQueue(): void
}
