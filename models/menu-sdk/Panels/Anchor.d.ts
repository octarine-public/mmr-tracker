// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type PanelAnchor = "top-left" | "top-center" | "top-right" | "center-left" | "center" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right"
	function SetViewport(width: number, height: number): void
	function ViewportVersion(): number
	function Viewport(): [number, number]
	function OnViewportChanged(listener: () => void): () => void
	function AnchorStyle(anchor: PanelAnchor, offsetX: number, offsetY: number): RmlStyle
}
