// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type StatusTone = "success" | "error"
	/**
	 * Floats a transient status pill over the bottom of the menu window — the outcome of a cloud
	 * operation («Theme saved», «Theme not found — check the code») shown without reflowing the
	 * page underneath. One toast lives at a time; a new status replaces the visible one. Errors
	 * stay a few seconds longer than confirmations, and a click anywhere on the pill dismisses it.
	 *
	 * @example
	 * ShowStatusToast(t("Theme saved"), "success")
	 */
	function ShowStatusToast(text: string, tone: StatusTone): void
	/**
	 * Keeps the toast pinned to the bottom center of the menu window while it moves or resizes,
	 * falling back to the screen when the window is closed; ticked once per frame with the other
	 * overlays.
	 */
	function TickStatusToast(): void
	interface IStatusSource {
		Status: string
		StatusIsError: boolean
		ClearStatus(): void
	}
	/**
	 * Routes a cloud store's status field into the floating toast: whenever the store reports an
	 * outcome, the message pops up over the window and the store is cleared right away, so the
	 * page itself never grows a banner that pushes its content down.
	 *
	 * @example
	 * useStatusToast(ThemeCloud)
	 */
	function useStatusToast(source: IStatusSource): void
}
