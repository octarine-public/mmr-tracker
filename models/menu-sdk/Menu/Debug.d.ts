// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/** Debug entry points, reachable as `MenuSDK.MenuDebug.*`. */
	const MenuDebug: {
		/** Tears the menu down and mounts it again. */
		Rebuild(): void
		/** Records a frame-time profile for `seconds`; zero stops a running one. */
		Profile(seconds?: number): void
		/** Logs window geometry and the number of root entries. */
		State(): void
	}
}
