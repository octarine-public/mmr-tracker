// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Where the preview card and its stage sit on screen this frame, in pixels. */
	interface PreviewLayout {
		readonly left: number
		readonly top: number
		readonly width: number
		readonly height: number
		readonly stageLeft: number
		readonly stageTop: number
		readonly stageWidth: number
		readonly stageHeight: number
	}
	const HeaderHeight = 40
	/**
	 * Puts the card where its placement says it stands and derives the stage rectangle inside it.
	 * Both panels lay out from this, so the stage always covers the card's middle band exactly: the
	 * card sizes to its border box, which leaves the band its border narrower on either side.
	 */
	function ComputeLayout(window: WindowState, ratio: number, height: number): PreviewLayout
	/**
	 * What one page shows on its preview: the scene, the model on it, what is drawn over it, and
	 * whatever it puts in the card's header and footer. Everything else — where the card sits, when
	 * it is on screen, how the stage is sized and driven — is the host's, and the same for all of
	 * them.
	 */
	interface PreviewSource {
		/** Distinguishes this preview's panels from another page's. */
		readonly key: string
		readonly scene: CPreviewScene
		/** Whether the page this belongs to is the one on screen. */
		Shown(): boolean
		Title(): string
		/** The model on the stage this frame; the scene reloads only when it changes. */
		Model(): Nullable<string>
		/** A clip file to show the model in, for one that carries no animation of its own. */
		Clip?(): Nullable<string>
		/** The elements drawn over the stage, as structure — the frame pass positions them. */
		Stage(): React.ReactNode
		Header?(): React.ReactNode
		Footer?(): React.ReactNode
		/** Frame pass over the stage, in its own pixels. */
		Tick(visible: boolean, width: number, height: number): void
		/** Where the stage landed on screen, for a preview that can be dragged on. */
		Frame?(left: number, top: number, width: number, height: number): void
	}
	/** Mounts one page's preview: the glass card, the stage over it, and the pass that drives it. */
	function MountPreview(source: PreviewSource): void
}
