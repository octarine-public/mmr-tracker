// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Where the chip sits against its anchor. "bottom" centres under it; "below" hangs under the
	 * anchor's left edge instead, for rail rows whose right side is somebody else's content.
	 */
	type ChipPlacement = "right" | "top" | "bottom" | "below"
	function ShowChipTooltip(anchor: HTMLElement, text: string, placement: ChipPlacement, caption?: string, elevation?: "flat" | "raised", icon?: string): void
	function HideChipTooltip(anchor?: object): void
}
