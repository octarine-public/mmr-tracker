// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Resolves a key name from the host key table to its VK-aligned index,
	 * 0 when the name is unknown.
	 */
	function ResolveKeyName(name: string): number
	/**
	 * Name of a single VK-aligned key index, "None" for out-of-range values.
	 */
	function KeyNameOf(index: number): string
	/**
	 * Packs a two-key combination into one bind code:
	 * high byte = the held modifier (first-pressed), low byte = the key.
	 */
	function PackBind(modifier: number, key: number): number
	/**
	 * The key that fires the bind — the low byte, or the whole code for
	 * single-key binds. 0 when the bind is unset.
	 */
	function BindKey(bind: number): number
	/**
	 * The held modifier of a combination bind — the high byte,
	 * 0 for single-key binds.
	 */
	function BindModifier(bind: number): number
	/**
	 * Whether the bind code holds an assigned key. False for 0 and for the
	 * legacy -1 unbound sentinel.
	 */
	function IsBindSet(bind: number): boolean
	/**
	 * Full display name of a bind code: "Ctrl + F" for combinations,
	 * "F" for single keys, "None" when unset.
	 */
	function BindNameOf(bind: number): string
	/**
	 * Whether the capture popup may record this key code: any key with a real
	 * name except the left mouse button and Escape.
	 */
	function IsCapturableKey(code: number): boolean
}
