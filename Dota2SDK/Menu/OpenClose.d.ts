// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The open/close motion of the menu window. A linear progress value runs from
	 * 0 (fully closed) to 1 (fully open) across `MenuFlags.MenuOpenDuration`; the
	 * selected effect shapes it into the frame's opacity multiplier and backdrop
	 * blur fraction, both landing on the theme's own opacity and blur at 1.
	 * Closing runs the progress backwards at the same rate, so it is the exact
	 * time reverse of opening, from any point mid-flight. Surfaces that stand
	 * beside the window rather than inside it - a preview card and its stage -
	 * follow the same progress, so the menu opens as one thing. The module also
	 * owns the native backdrop capture, keeping it alive until a closing window
	 * has fully faded out.
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
	 * Puts a surface standing outside the window on the window's own open motion, or takes it off
	 * again; `glass` is the layer inside it carrying the backdrop blur, for one that is frosted.
	 * The progress is written the moment it registers, so a card mounting into an open window is on
	 * screen the same frame and one mounting mid-open joins the fade where it stands.
	 */
	function SetMenuMotionFollower(key: string, element: Nullable<HTMLElement>, glass?: Nullable<HTMLElement>): void
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
