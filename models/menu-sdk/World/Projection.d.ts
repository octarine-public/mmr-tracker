// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The one engine seam of the world surface. Everything below touches the `Source2SDK` global
	 * lazily and behind this module: the standalone menu host runs menu-sdk without an engine, and
	 * a module-scope touch would crash it there. Extend this file when the world surface needs
	 * more of the engine — do not scatter new `Source2SDK` references.
	 */
	/** Whether an engine is present; without one every world layer simply stays dormant. */
	function WorldReady(): boolean
	/**
	 * Captures the camera for this frame's projections, once however many layers ask for it: every
	 * layer of a frame projects through the same camera, and the capture reads the engine's own -
	 * its position, its angles, its distance - which is not worth doing again for each of them.
	 */
	function BeginProjection(width: number, height: number): void
	/** Opens the next frame's capture. The menu tick calls this once the frame has been drawn. */
	function EndProjectionFrame(): void
	/**
	 * Projects a world point into screen px, `false` when it is off screen or behind the camera.
	 * Allocation-free: the result lands in `out`.
	 */
	function ProjectInto(x: number, y: number, z: number, out: [number, number]): boolean
}
