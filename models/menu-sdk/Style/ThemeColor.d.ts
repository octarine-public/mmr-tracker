// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	function toHex2(value: number): string
	function cssColor(color: Color): string
	function cssAlpha(hex: string, alpha: number): string
	function parseHex(hex: string): [number, number, number, number]
	function composeHex(r: number, g: number, b: number, a: number): string
	function mixHex(from: string, to: string, ratio: number): string
	function lerpHex(from: string, to: string, ratio: number): string
	function fadeHex(hex: string, alpha: number): string
	function opaqueHex(hex: string): string
	function shiftHex(hex: string, ratio: number): string
}
