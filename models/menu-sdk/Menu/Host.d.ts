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
		readonly scale?: () => number
		readonly cursor?: () => [number, number]
		readonly measureText?: (text: string, font: string, sizePx: number, weight: number) => Nullable<[number, number]>
		readonly imageSize?: (path: string) => Nullable<[number, number]>
		readonly inGame?: () => boolean
		/**
		 * True while the game has taken the keyboard — a chat box or a console. Keybinds stay quiet
		 * then, so typing a message does not fire them, unless {@link MenuFlags.TriggerWhileTyping}
		 * says otherwise.
		 */
		readonly inputCaptured?: () => boolean
		readonly onConfigWritten?: (config: Record<string, unknown>) => void
		readonly onConfigsChanged?: (handler: () => void) => void
		readonly reloadScripts?: () => void
		readonly entryIcons?: () => Record<string, string>
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
	const PanicEntryTitle = "Try to reload"
	function ReloadScripts(): void
}
