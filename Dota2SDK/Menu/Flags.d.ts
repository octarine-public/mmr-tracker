// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface Flashable {
		readonly entry: Entry
	}
	/**
	 * How an entry's tooltip is presented: "bubble" floats a shadowed hint at the
	 * cursor on hover, "inline" prints the same text under the row label, "side"
	 * opens a panel beside an explicit info icon, "off" shows nothing.
	 */
	type TooltipStyle = "bubble" | "inline" | "side" | "off"
	const MenuFlags: {
		/**
		 * Lets keybinds fire while the game has the keyboard — a chat box or a console. Off, because
		 * typing a message should not set off the binds its letters are on.
		 */
		TriggerWhileTyping: boolean
		SaveConfigASAP: boolean
		NoWriteConfig: boolean
		IsLoadingConfig: boolean
		DrawMarksNew: boolean
		DrawMarksNonDefault: boolean
		HoverAnimation: boolean
		IntroAnimation: boolean
		MenuOpenAnimation: boolean
		MenuOpenEffect: number
		MenuOpenDuration: number
		RailAnimation: boolean
		TabOpenAnimation: boolean
		LayoutSwitchAnimation: boolean
		HotkeysPanelAnimation: boolean
		TooltipStyle: TooltipStyle
		Flash(element: Flashable): void
	}
	function FlashedEntry(): Nullable<Entry>
	function ConsumeFlash(entry: Entry): void
}
