// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The open/close motion of the menu window. A linear progress value runs from
	 * 0 (fully closed) to 1 (fully open) across `MenuFlags.MenuOpenDuration`; the
	 * selected effect shapes it into the frame's opacity multiplier and backdrop
	 * blur fraction, both landing on the theme's own opacity and blur at 1.
	 * Closing runs the progress backwards at the same rate, so it is the exact
	 * time reverse of opening, from any point mid-flight. The module also owns
	 * the native backdrop capture, keeping it alive until a closing window has
	 * fully faded out.
	 */
	interface OpenEffect {
		readonly name: string
		/** Frame opacity as a fraction of the theme opacity, over progress 0..1. */
		readonly opacity: (t: number) => number
		/** Backdrop blur as a fraction of the theme blur, over progress 0..1. May overshoot 1. */
		readonly blur: (t: number) => number
	}
	const OpenEffects: OpenEffect[]
	/** True while the closing animation still needs the window mounted. */
	function MenuMotionHolds(): boolean
	/**
	 * Registers the menu window frame with the motion driver. Mounting an opened
	 * window with the progress below 1 plays the open animation, so the first
	 * mount and a reopen both fade in through the same path; a rebuild remounts
	 * at progress 1 and shows the window untouched.
	 */
	function SetMenuMotionFrame(element: Nullable<HTMLElement>): void
	/** Wires the driver to window open/close transitions and takes over the backdrop capture. */
	function SetupOpenClose(): void
}
