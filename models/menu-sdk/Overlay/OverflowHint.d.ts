// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface OverflowHintStyle {
		readonly background: string
		readonly color: StyleColor
		readonly fontSizeDp: number
		readonly heightDp: number
		/** Space between the leading icon or dot and the label, as the row lays it out. */
		readonly gapDp: number
		readonly activeBar: boolean
		readonly iconPath?: string
		/** Set when the row wraps its icon in a fixed box, so the hint lays it out the same. */
		readonly iconBoxed?: boolean
		readonly iconSizeDp?: number
		readonly iconTint?: boolean
		readonly iconRound?: number
		readonly dotColor?: StyleColor
	}
	function ShowOverflowHint(row: HTMLElement, label: HTMLElement, text: string, style: OverflowHintStyle): void
	function HideOverflowHint(row?: object): void
}
