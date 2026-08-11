// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function PerfEnabled(): boolean
	function PerfBegin(): number
	function PerfEnd(name: string, started: number): void
	function PerfCount(name: string, amount?: number): void
	function PerfDetail(group: string, key: string, amount?: number): void
	function StartPerf(seconds?: number): void
	function StopPerf(): void
	function TickPerf(now: number): void
}
