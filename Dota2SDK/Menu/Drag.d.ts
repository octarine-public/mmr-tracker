// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function QueueDragMove(x: number, y: number): void
	function FlushDragMove(): void
	function BeginDrag(onMove: (x: number, y: number) => void, onEnd?: () => void): void
	function EndDrag(): void
	function SettleDrag(): void
	function IsDragging(): boolean
}
