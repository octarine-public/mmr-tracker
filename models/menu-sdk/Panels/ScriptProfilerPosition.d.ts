// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const ScriptProfilerPanelRef: {
		current: Nullable<HTMLElement>
	}
	/** Config key holding the draggable profiler panel position. */
	const ScriptProfilerPanelConfigKey = "ScriptProfilerPanel"
	/** Stored profiler position, [-1, -1] until the panel has been moved. */
	function ScriptProfilerPanelConfigValue(): [number, number]
	/** Restores the profiler position saved in a menu config. */
	function ApplyScriptProfilerPanelConfig(value: unknown): void
	/** Current position-store version for React's external-store subscription. */
	function ScriptProfilerPanelPositionVersion(): number
	/** Subscribes an RmlUi panel to restored profiler-position changes. */
	function SubscribeScriptProfilerPanelPosition(onChange: () => void): () => void
	/** Position fragment for the profiler root, clamped after viewport changes. */
	function ScriptProfilerPanelPositionStyle(): RmlStyle
	/** Whether the cursor is over the profiler while the menu is open. */
	function CursorOverScriptProfilerPanel(): boolean
	/** Starts dragging the profiler by its header while the menu is open. */
	function BeginScriptProfilerPanelDrag(event: Event): void
}
