// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The proportions of the preview stage, in the menu's own units. They live in one place because
	 * three things have to agree on them and none of the three can tell when another moved: the card
	 * lays the band out, the scene renders a target stretched over it, and the camera frames the sample
	 * inside it.
	 *
	 * A stage measured one way and a sample measured another is how room added over a hero's head ends
	 * up going to the hero. The sample stands a height of its own here rather than a share of the
	 * stage — grow the stage and what grows is the room around it, which is the only reason to grow it.
	 */
	/** How wide the card stands, which is the stage's width less its border. */
	const PanelWidth = 300
	/** How tall the stage band inside it stands. */
	const StageHeight = 450
	/**
	 * How tall the sample itself is drawn on that stage, and the room kept over its head. The band
	 * above is not decoration: the game hangs a hero's own health bar well over him, and everything a
	 * page mounts on that bar stands higher again.
	 */
	const SampleHeight = 200
	const SampleHeadroom = 150
	/**
	 * How much finer than the stage the scene renders, so the model's edges hold at the size it is
	 * shown at: the target is laid out from the stage's own on-screen pixels and drawn back down,
	 * which is what antialiases them. The target keeps the stage's proportions exactly — one of
	 * another shape shows the model wider or narrower than it stands.
	 */
	const Supersample = 2
	/** The render target is held under this on either axis, whatever the stage grows to. */
	const MaxRenderDim = 4096
	const RenderWidth: number
	const RenderHeight: number
}
