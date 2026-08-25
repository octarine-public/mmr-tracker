// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface IOverlayMenu {
		Position: Vector2
		Scale?: number
		readonly SetupEntry?: Entry
	}
	class OverlayMenu implements IOverlayMenu {
		/**
		 * The panel's place is carried by the hand that drags it, so the two sliders holding it stay
		 * out of the page: they are where the place is kept and read back from a config, not how it
		 * is set.
		 *
		 * The size can be carried the same way, by a panel that offers a corner to pull, but its
		 * slider stays on the page: aiming at a corner is not the only way anyone should be able to
		 * resize a card. Sizes use whole percentages by default; pass `1` as `scalePrecision` for
		 * tenths of a percent.
		 */
		constructor(node: Node, defaultX: number, defaultY: number, scalePrecision?: number)
		public get Scale(): number
		/** Held to the range the slider offers, so a pulled corner cannot leave it unreachable. */
		public set Scale(next: number)
		public get Position(): Vector2
		public set Position(position: Vector2)
		/** Takes the whole block off the page, or gives back the one row of it a page ever shows. */
		public SetHidden(hidden: boolean): void
	}
	/**
	 * A card pinned to a point in the world rather than to the screen. Same immediate-mode content
	 * callback as {@link OverlayPanel}, but there is nothing to drag and nothing to persist: the
	 * anchor comes from the caller every frame.
	 *
	 * @example
	 * if (!panel.Draw(head, size, distance, origin => HudCard.Frame(new Rectangle(origin, origin.Add(size))))) {
	 *     // off screen this frame, nothing was drawn
	 * }
	 */
	class WorldPanel {
		constructor(key?: string)
		/** Draws the card centred above `world`, or hides it and answers `false` when off screen. */
		public Draw(world: Vector3, size: Vector2, distance: number, content: (origin: Vector2) => void): boolean
		public Hide(): void
	}
	class OverlayPanel {
		/**
		 * @param menuBound whether this panel stands with the menu rather than over the world. The
		 * host's overlay gate closes on the game's own screens and outside a match; a window the user
		 * opened the menu to use answers to the menu being open instead, so it is there on the main
		 * menu too.
		 */
		constructor(menu: IOverlayMenu, key?: string, menuBound?: boolean)
		public get Scale(): number
		/**
		 * Brings this panel in front of every other one, in what is drawn and in what takes a click.
		 * A window calls it the moment it is clicked, which is what click-to-front is.
		 */
		public Focus(): void
		/**
		 * Whether this panel owns the cursor right now: true only while it is the front-most one
		 * under it. A window with anything clickable of its own gates that on this, so the window
		 * behind does not answer a click that landed on the one in front.
		 */
		public HandlesInput(): boolean
		/**
		 * Extra ground that counts as part of this panel while a click is arbitrated - a dropdown or
		 * a context menu standing outside its rect. Pass nothing to clear it.
		 */
		public SetInputExtent(extent?: Rectangle): void
		/**
		 * @param dragHandleHeight how much of the panel's top edge starts a drag, in px. Nothing (the
		 * default) makes the whole panel grabbable; a window with anything draggable of its own gives
		 * its title bar's height, so a drag inside the content never moves the window.
		 */
		public Draw(size: Vector2, content: (origin: Vector2) => void, dragHandleHeight?: number): void
		public MouseKeyDown(key?: VMouseKeys): boolean
		public MouseKeyUp(): boolean
		public Reset(): void
	}
}
