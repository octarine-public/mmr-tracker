// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The 3d stage behind a preview page: one GFX scene showing whichever model it is given,
	 * published to RmlUi through its scene texture slot. The scene knows nothing of what the model
	 * stands for — its owner names it — and only renders while the page keeps it active.
	 *
	 * On a host without the GFX scene manager the scene never becomes ready, so a preview built on
	 * it simply never appears.
	 */
	class CPreviewScene {
		/** The vg texture slot to embed as `octarine://scene/<id>`, once a model is loaded and rendering. */
		public get TextureId(): Nullable<number>
		/** Skeleton segments of the shown model, as bone index pairs. */
		public get Links(): readonly [number, number][]
		/** The bone names of each link, parallel to {@link Links}, for telling body parts apart. */
		public get LinkNames(): readonly [string, string][]
		/** The chain each link belongs to, parallel to `Links` and contiguous by construction. */
		public get ChainIds(): readonly number[]
		/**
		 * How much of the stage's height the model stands, as a share of it. The default leaves
		 * room for a frame and readings around the sample; a page that draws on the model itself
		 * asks for more. Held as well as applied, so a scene reframes live and one set up before
		 * its model loads comes up at the asked size.
		 */
		public SetFill(fill: number): void
		/**
		 * Silhouette glow around the model, 0 turns it off. Held as well as applied, and forwarded
		 * only when the value changes: the pages call this every frame, and the scene is created
		 * lazily, so a fresh scene replays the held glow instead of coming up glowless.
		 */
		public SetGlow(color: number, width: number): void
		/**
		 * One material over every submesh of the shown model, as inline KV3, or the model's own back
		 * when nothing is given. Call it every frame; binding happens only when the text changes.
		 *
		 * Held rather than only applied, because a distinct text mints a material the scene then keeps
		 * — and because the model reloads out from under it. A page that switches the hero it shows
		 * would otherwise get its stock materials back with nothing here noticing.
		 */
		public SetOverrideMaterial(material: Nullable<string>): void
		/**
		 * Overrides one parameter of whatever the model draws with, for this instance alone. Mints
		 * nothing, so it is the right home for anything that moves — a color picker above all.
		 *
		 * Held as well as applied, for the same reason the material is: an override lives on the
		 * instance, and a freshly bound material carries its own declared defaults instead. The page
		 * unloads its model every time it leaves the screen, so without this a color survives exactly
		 * until the menu is closed and reopened, and then reads as whatever the material declared.
		 */
		public SetOverrideParam(name: string, value: number[]): void
		/**
		 * Projects the eight corners of the model's bounds into stage pixels, `x, y` pairs in the
		 * base-then-top order the wireframe edges expect. False until a model is shown.
		 */
		public ProjectCorners(width: number, height: number, out: Float64Array): boolean
		/**
		 * Screen position of a link's bones inside a stage of the given size, mirroring the scene's
		 * orthographic camera. False when either bone has no transform yet.
		 */
		public ProjectLink(link: number, width: number, height: number, out: [number, number, number, number]): boolean
		/** Subscribes to the stage becoming ready or unloading; answers with the unsubscribe. */
		public OnChange(listener: () => void): () => void
		/**
		 * The stage's on-screen size in pixels, which the render target follows at the supersample so
		 * the model's edges are antialiased at exactly the size it is shown at. Held as well as
		 * applied, because the scene is created lazily and after the stage has already been measured;
		 * the target only rebuilds when the stage actually changed.
		 */
		public SetStageSize(width: number, height: number): void
		/**
		 * The scene renders only while the page is open. Remembered as well as applied: the page
		 * usually says so before there is a scene to say it to.
		 */
		public SetActive(active: boolean): void
		/**
		 * Turns the model on its stage, in degrees. Held as well as applied, because the model
		 * reloads out from under the pose and a page poses the stage before its model is up.
		 */
		public SetModelAngles(pitch: number, yaw: number): void
		/**
		 * Leans the model's upper body to a view pitch, in degrees, positive looking down — the bend
		 * an aim pose puts on a pawn. Spread over the spine chain and the neck so the model curls the
		 * way a body does instead of folding at one joint; a rig missing some of those bones shares
		 * the angle over the ones it has. Held as well as applied, because the model reloads out from
		 * under the lean.
		 */
		public SetViewPitch(pitch: number): void
		/**
		 * The model on the stage, and the clip file it is to be shown in when its owner knows one.
		 * Call it every frame; loading starts only when the path changes.
		 *
		 * A named clip is for models that carry no animation of their own — a walker keeps every one
		 * of its as a loose file beside it, and no search of the model can find them.
		 */
		public SetModel(path: Nullable<string>, clip?: string): void
	}
}
