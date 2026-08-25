// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * The time a logic rule reads as text: `"5:00"`, `"12:30"`. Seconds below a minute still carry
	 * the minute, so every threshold in a listing lines up.
	 */
	function LogicTimeName(seconds: number): string
	/**
	 * Seconds a `"5"`, `"5:00"` or `"5:30"` spelling stands for, `undefined` when the text is not a
	 * time. A bare number is minutes - typing `5` into the field means the fifth minute, not the
	 * fifth second.
	 */
	function ParseLogicTime(text: string): Nullable<number>
	/**
	 * Adds a logic rule to the entry, holding it after the given match time at the value the entry
	 * carries right now, until the rule is edited. Rules persist in the config.
	 */
	function AddEntryLogic(entry: ToggleEntry, when?: LogicWhen, at?: number): ToggleLogic
	function AddEntryLogic(entry: SliderEntry, when?: LogicWhen, at?: number): SliderLogic
	function AddEntryLogic(entry: DropdownEntry, when?: LogicWhen, at?: number): DropdownLogic
	function AddEntryLogic(entry: MultiSelectEntry, when?: LogicWhen, at?: number): MultiSelectLogic
	function AddEntryLogic(entry: DriverHolder, when?: LogicWhen, at?: number): EntryLogic
	/**
	 * Takes the rule off its entry, putting back whatever the entry held before it engaged.
	 */
	function RemoveEntryLogic(entry: DriverHolder, rule: EntryLogic): void
	/**
	 * Moves the rule to the other side of its threshold, releasing it first so the entry never
	 * keeps a value the new condition does not ask for.
	 */
	function SetEntryLogicWhen(entry: DriverHolder, rule: EntryLogic, when: LogicWhen): void
	/** Moves the rule's threshold on the match clock, in seconds. */
	function SetEntryLogicAt(entry: DriverHolder, rule: EntryLogic, at: number): void
	/**
	 * Walks every logic rule in the tree, in menu order.
	 */
	function ForEachEntryLogic(callback: (entry: DriverHolder, rule: EntryLogic) => void, node?: NodeEntry): void
	/**
	 * Brings every logic rule in line with the match clock, once per frame. A rule engages when the
	 * clock crosses onto its side of the threshold and lets go the moment it does not - which is
	 * also what puts the entry back when the match ends and arms the rule for the next one.
	 */
	function TickEntryLogic(): void
}
