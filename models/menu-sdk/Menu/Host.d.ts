// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface MenuHost {
		readonly onFrame?: (tick: () => void) => void
		readonly onTeardown?: (teardown: () => void) => void
		readonly onServerInfo?: (handler: () => void) => void
		readonly onKeyDown?: (handler: (code: number) => boolean) => void
		readonly onKeyUp?: (handler: (code: number) => boolean) => void
		readonly onMouseDown?: (handler: (code: number) => boolean) => void
		readonly onMouseUp?: (handler: (code: number) => boolean) => void
		readonly onMouseWheel?: (handler: (up: boolean) => boolean) => void
		readonly onCharInput?: (handler: () => boolean) => void
		readonly onViewportChanged?: (handler: () => void) => void
		readonly viewport?: () => [number, number]
		readonly resolveAsset?: (path: string) => string
		readonly resolveImage?: (value: string) => string
		/**
		 * The hero behind an ability name, where the name is a hero's own ability rather than an
		 * item: the hero's data name — {@link MenuHost.resolveImage} turns it into their portrait —
		 * and the number of the button that casts it, 1 to 4. A window's sidebar shows it as a
		 * quick hint over the row; a host that does not answer simply shows none.
		 */
		readonly abilityOwner?: (name: string) => Nullable<[hero: string, slot: number]>
		readonly scale?: () => number
		readonly cursor?: () => [number, number]
		readonly measureText?: (text: string, font: string, sizePx: number, weight: number) => Nullable<[number, number]>
		readonly imageSize?: (path: string) => Nullable<[number, number]>
		readonly inGame?: () => boolean
		/**
		 * Whether an overlay may draw right now: the game is in a match and has none of its own
		 * screens over it. Panels stand down while it says no - they stop drawing, stop holding
		 * their place in the snapping guides and stop taking the clicks that land where they were.
		 * A host that does not answer lets them draw whenever the game is running.
		 */
		readonly canDrawOverlays?: () => boolean
		/**
		 * True while the game has taken the keyboard — a chat box or a console. Keybinds stay quiet
		 * then, so typing a message does not fire them, unless {@link MenuFlags.TriggerWhileTyping}
		 * says otherwise.
		 */
		readonly inputCaptured?: () => boolean
		/**
		 * Seconds on the match clock, `undefined` while no match is running - a menu, a hero select,
		 * an intro. Logic rules stand down without an answer and let go of whatever they were
		 * holding, so leaving a match puts every driven entry back where the user left it.
		 */
		readonly gameTime?: () => Nullable<number>
		readonly onConfigWritten?: (config: Record<string, unknown>) => void
		readonly onConfigsChanged?: (handler: () => void) => void
		readonly reloadScripts?: () => void
		/**
		 * The user moved the menu-scale slider in the shared Settings tab. The game
		 * stores the value it serves back through {@link MenuHost.scale} and
		 * relayouts whatever depends on it. Without this the slider is not shown.
		 */
		readonly menuScaleChanged?: (scale: number) => void
		/**
		 * The server pushed a UI language for this account. The settings menu
		 * applies it through Localization, ignoring the first push when the config
		 * already chose a language.
		 */
		readonly onSetLanguage?: (handler: (language: number) => void) => void
		/**
		 * Icons the game pins to menu pages, keyed by path — `"Visual"`, `"Visual/Players"`.
		 * @see {@link SetEntryDefaults}
		 */
		readonly entryIcons?: () => Record<string, string>
		/**
		 * The order the game puts menu pages in, keyed by path — `"Visual"`, `"Visual/Players"` —
		 * lowest number first. It is what a list of pages several scripts register has instead of
		 * the alphabet.
		 * @see {@link SetEntryDefaults}
		 */
		readonly entryPriorities?: () => Record<string, number>
	}
	function CurrentHost(): Nullable<MenuHost>
	function SetMenuHost(next: MenuHost): void
	/**
	 * Marks the host frame tick — the phase where the host is able to measure text and images.
	 * Measurement misses recorded outside this phase request one revalidating render inside it.
	 */
	function SetHostFrameActive(value: boolean): void
	/**
	 * True when a measurement fell back since the last call because the host could not answer.
	 * The frame tick consumes it and re-renders once, so every size settles on a host-measured
	 * value and never changes again.
	 */
	function ConsumeHostMeasureMiss(): boolean
	function MenuScale(): number
	/** Whether an overlay may draw right now; see {@link MenuHost.canDrawOverlays}. */
	function HostCanDrawOverlays(): boolean
	function HostCursorPosition(): [number, number]
	/**
	 * Text size in px, cached after the first successful host measurement, so the answer is
	 * identical no matter which phase asks for it. An unknown string measured while the host
	 * cannot answer returns undefined and records a measure miss.
	 */
	function HostMeasureText(text: string, font: string, sizePx: number, weight: number): Nullable<[number, number]>
	/** Image size in px, cached like HostMeasureText. */
	function HostImageSize(path: string): Nullable<[number, number]>
	function HostInGame(): boolean
	function HostInputCaptured(): boolean
	/** Seconds on the match clock; see {@link MenuHost.gameTime}. */
	function HostGameTime(): Nullable<number>
	const PanicEntryTitle = "Try to reload"
	/**
	 * Registered by Store/Config (importing it here would be a cycle): flushes the
	 * pending config before the runtime dies, so a change made in the same frame as
	 * a reload still reaches disk.
	 */
	function SetBeforeScriptsReload(fn: () => void): void
	/**
	 * Registered by the bootstrap (same cycle): takes the menu and its layer documents off the
	 * screen before the runtime dies. The render thread goes on compositing whatever documents
	 * exist while the new runtime compiles, with every asset of this one already freed — a ghost
	 * of white tiles and missing text for the whole freeze. Nothing on screen beats that.
	 */
	function SetOnScriptsReload(fn: () => void): void
	function ReloadScripts(): void
	/**
	 * Whether a reload is on its way, ticked once per frame by the bootstrap. The first tick takes
	 * the menu down — here rather than in {@link ReloadScripts}, which a button handler calls, and
	 * an unmount from inside the dispatch destroys the dispatching element under its own feet. The
	 * tick that reaches zero kills the runtime; every one until then keeps the menu from remounting
	 * into the frames the renderer is clearing.
	 */
	function TickScriptsReload(): boolean
}
