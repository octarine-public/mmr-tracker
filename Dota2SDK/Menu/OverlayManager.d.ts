// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface OverlayRegistration {
		readonly rect: Rectangle
		lastDrawTime: number
		/**
		 * Which of two overlapping panels is in front. Higher wins, and the counter only ever goes
		 * up, so raising one panel never disturbs the order of the rest.
		 */
		order: number
		/**
		 * Extra ground that counts as part of the panel while arbitrating a click - a dropdown or a
		 * context menu standing outside its rect. Cleared when it closes.
		 */
		extent: Nullable<Rectangle>
	}
	class COverlayManager {
		constructor()
		public Register(rect: Rectangle): OverlayRegistration
		/**
		 * Takes a registration out for good, so a destroyed panel stops being walked by every click
		 * and every drag; the counterpart of {@link COverlayManager.Register}.
		 */
		public Unregister(registration: OverlayRegistration): void
		/**
		 * Brings a panel in front of the ones it overlaps, and answers where it now stands so the
		 * caller can put its surface there too.
		 */
		public Raise(registration: OverlayRegistration): number
		/** @see OverlayRegistration.extent */
		public SetExtent(registration: OverlayRegistration, extent?: Rectangle): void
		/**
		 * The front-most panel standing under the cursor, of those drawn recently enough to be there.
		 * A click belongs to that one alone: without this the panel that registered first takes it,
		 * however far behind it is drawn.
		 */
		public TopUnderCursor(x: number, y: number, now: number): Nullable<OverlayRegistration>
		public Update(registration: OverlayRegistration, now: number): void
		public IsVisible(registration: OverlayRegistration, now: number): boolean
		public IsActive(registration: OverlayRegistration): boolean
		public Begin(registration: OverlayRegistration, now: number): boolean
		public End(registration: OverlayRegistration): void
		public Reset(registration: OverlayRegistration): void
		public Snap(registration: OverlayRegistration, position: Vector2, width: number, height: number, viewWidth: number, viewHeight: number, now: number): void
		public DrawGuides(registration: OverlayRegistration): void
	}
	const OverlayManager: COverlayManager
}
