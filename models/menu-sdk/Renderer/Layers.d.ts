// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface LayerSet {
		readonly root: HTMLElement
		readonly panels: HTMLElement
		readonly main: HTMLElement
		readonly portal: HTMLElement
	}
	function Layers(): LayerSet
	function TickLayers(now: number): boolean
	function SetMainFilter(filter: Nullable<string>): void
	function ResetLayers(): void
	function ApplyRootFont(): void
}
