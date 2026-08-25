// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The pulse whatever `RevealEntry` was sent to answers with: the accent lit in its hover pill,
	 * blinking twice and fading out. Opening the page and scrolling there says the menu moved, not
	 * which of the rows now on screen was the one asked for - which is the whole of what a search
	 * hit, a context menu's «show in menu» or a script sending the user to one of its options is
	 * for.
	 *
	 * `target` is the row's hover pill, and it is written to straight rather than re-rendered: the
	 * fill is a shader decorator, and every row of the page would lay itself out again for each of
	 * the frames. The pill is handed back to the stylesheet once the last step has run.
	 *
	 * Anything that draws an entry may play it - a control row, a card header, a nested accordion -
	 * and the first of them to see the flag takes the flash, so an entry drawn in two places at once
	 * still pulses once.
	 *
	 * @example
	 * const pill = React.useRef<HTMLElement>()
	 * useRevealFlash(pill, entry, RowPillRadius)
	 * return <div ref={RefTo(pill)} className={Classes.Pill} style={rowPillStyle({}, fill)} />
	 */
	function useRevealFlash(target: React.RefObject<HTMLElement>, entry: Entry, radius: number): void
}
