// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	/**
	 * Registers the hook that hands a freshly attached entry its stored config.
	 * Entries created after the config was read - a hero page opened for the first
	 * time, a script registering late - would otherwise keep their defaults.
	 */
	function SetEntryAdopter(adopt: (parent: NodeEntry, entry: Entry) => void): void
	function SetImagePathResolver(resolver: (value: string) => string): void
	function ResolveImagePath(value: string): string
	function SetAbilityOwnerResolver(resolver: (value: string) => Nullable<[string, number]>): void
	/** The hero behind an ability name and its button number, where the host knows one. */
	function ResolveAbilityOwner(value: string): Nullable<[string, number]>
	const MenuTree: NodeEntry
	function SortEntries(parent: NodeEntry): void
	/**
	 * Registers the host's tables of icons and sort priorities for menu pages, keyed by the page's
	 * path through the tree: `"Visual"` for a tab, `"Visual/Players"` for a page inside it. A page
	 * carries the priority whenever it is created, so a list several scripts fill in separately
	 * still holds the order the game asks for instead of falling back to the alphabet.
	 *
	 * Every page named by a table is placed by its number, lowest first; a page no table names keeps
	 * priority 0 and therefore sorts above a list numbered from 1, where it is seen rather than lost
	 * at the bottom.
	 * @example
	 * SetEntryDefaults(
	 *     { Visual: "menu/icons/eye.svg" },
	 *     { "Visual/Players": 1, "Visual/Orbs": 2 }
	 * )
	 */
	function SetEntryDefaults(icons: Record<string, string>, priorities: Record<string, number>): void
	function CreateNode(parent: NodeEntry, name: string, iconPath?: string, tooltip?: string, iconRound?: number, priority?: number): NodeEntry
	function CreateDescription(parent: NodeEntry, name: string, tooltip?: string, priority?: number, iconPath?: string, iconRound?: number): DescriptionEntry
	function CreateToggle(parent: NodeEntry, name: string, defaultValue: boolean, tooltip?: string, priority?: number, iconPath?: string, iconRound?: number): ToggleEntry
	function CreateSlider(parent: NodeEntry, name: string, defaultValue: number, min: number, max: number, precision: number, tooltip?: string, priority?: number): SliderEntry
	function CreateDropdown(parent: NodeEntry, name: string, values: string[], defaultValue: number, tooltip?: string, priority?: number): DropdownEntry
	function CreateMultiSelect(parent: NodeEntry, name: string, values: string[], defaultValue?: string[], tooltip?: string, priority?: number): MultiSelectEntry
	function CreateKeybind(parent: NodeEntry, name: string, defaultKey: string, tooltip?: string, priority?: number): KeybindEntry
	function CreateButton(parent: NodeEntry, name: string, tooltip?: string, priority?: number, variant?: ButtonVariant, size?: ButtonSize): ButtonEntry
	function CreateColor(parent: NodeEntry, name: string, defaultColor: Color, tooltip?: string, priority?: number): ColorEntry
	function CreateTextInput(parent: NodeEntry, name: string, placeholder: string, priority?: number): TextEntry
	function CreateImages(parent: NodeEntry, name: string, values: string[], defaults: Map<string, boolean> | [string, boolean][], tooltip?: string, priority?: number, createdDefault?: boolean, ordered?: boolean, draggable?: boolean): ImagesEntry
	/**
	 * Hands the picker the catalogue its browse modal lists, and lays every value in it out as a tile
	 * the row can carry, keeping whatever is already chosen. A value the catalogue no longer names
	 * goes with it: the picker speaks for what the catalogue holds and nothing else.
	 */
	function SetImageCatalogue(entry: ImagesEntry, sections: readonly CatalogueSection[]): void
	function ImagePairs(entry: ImagesEntry): [string, boolean][]
	function SetToggleValue(entry: ToggleEntry, value: boolean): void
	/**
	 * Records that a driver — a hotkey or a logic rule — changed: the config is due and the menu
	 * re-renders, both deferred while a slider is being dragged.
	 */
	function MarkDriversChanged(): void
	/**
	 * Adds a hotkey to the entry: toggle mode, listed in the on-screen panel while
	 * it is active, unbound until the capture popup assigns a key. A toggle's
	 * hotkey drives the switch on; every other supported entry captures its
	 * current value.
	 */
	function AddEntryHotkey(entry: ToggleEntry, bind?: number): ToggleHotkey
	function AddEntryHotkey(entry: SliderEntry, bind?: number): SliderHotkey
	function AddEntryHotkey(entry: DropdownEntry, bind?: number): DropdownHotkey
	function AddEntryHotkey(entry: MultiSelectEntry, bind?: number): MultiSelectHotkey
	function AddEntryHotkey(entry: DriverHolder, bind?: number): EntryHotkey
	/** The option values a multiselect currently has on, in the entry's own order. */
	function SelectedMultiValues(entry: MultiSelectEntry): string[]
	function RemoveEntryHotkey(entry: DriverHolder, hotkey: EntryHotkey): void
	function SetEntryHotkeyBind(hotkey: EntryHotkey, bind: number): void
	function SetEntryHotkeyMode(hotkey: EntryHotkey, mode: HotkeyMode): void
	/**
	 * Stores the value a driver — a hotkey or a logic rule — holds its entry at. A slider's value
	 * is clamped and rounded like the slider itself; dropdown and multiselect values must name
	 * existing options or the call is ignored.
	 */
	function SetEntryDriverValue(entry: ToggleEntry, driver: EntryDriver<boolean>, value: boolean): void
	function SetEntryDriverValue(entry: SliderEntry, driver: EntryDriver<number>, value: number): void
	function SetEntryDriverValue(entry: DropdownEntry, driver: EntryDriver<string>, value: string): void
	function SetEntryDriverValue(entry: MultiSelectEntry, driver: EntryDriver<string[]>, value: string[]): void
	function SetEntryHotkeyVisibility(hotkey: EntryHotkey, visibility: HotkeyVisibility): void
	/**
	 * Walks every hotkey in the tree, in menu order — the on-screen panel and
	 * hotkey listings are built from this.
	 */
	function ForEachEntryHotkey(callback: (entry: DriverHolder, hotkey: EntryHotkey) => void, node?: NodeEntry): void
	/**
	 * The value a driver holds its entry at, as text: empty for a toggle, the number
	 * with the slider's precision and suffix, the option of a dropdown, or a
	 * multiselect summary. `localize` translates suffixes and option names.
	 *
	 * @example
	 * DriverValueName(entry, hotkey, name => Localization.Localize(name))
	 */
	function DriverValueName(entry: DriverHolder, driver: EntryDriver, localize?: (name: string) => string): string
	function SetSliderValue(entry: SliderEntry, value: number): void
	function FinishSliderChange(entry: SliderEntry): void
	function SetDropdownValue(entry: DropdownEntry, selectedID: number): void
	function SetMultiSelectValue(entry: MultiSelectEntry, value: string, selected: boolean): void
	/**
	 * Replaces the options at runtime, which is what a list that is discovered rather than
	 * declared needs — the players reporting a media session, say.
	 *
	 * The array is replaced rather than edited in place: the option panel caches the width it
	 * measured against the array it measured, so editing in place would leave that width stale.
	 *
	 * Selection is untouched, and survives an option going away: it is keyed by name, and a player
	 * that is closed and reopened comes back still ticked, which is what ticking it meant. The list
	 * itself is not a setting — only the selection is stored — so this does not dirty the config.
	 */
	/**
	 * Replaces a dropdown's options at runtime, for a list discovered rather than declared.
	 *
	 * The array is replaced rather than edited in place: the option panel caches the width it
	 * measured against the array it measured, so editing in place would leave that width stale.
	 *
	 * The selection follows the option it was on by name where that option survives, because an
	 * index into a list that has just changed points at whatever moved into that slot. A caller
	 * whose list can reorder between runs should still keep its own record of the choice: what a
	 * config stores for a dropdown is the index, and an index outlives nothing.
	 */
	function SetDropdownOptions(entry: DropdownEntry, values: string[]): void
	function SetMultiSelectOptions(entry: MultiSelectEntry, values: string[]): void
	function SetMultiSelectValues(entry: MultiSelectEntry, values: string[]): void
	function SetKeybindValue(entry: KeybindEntry, key: number): void
	/**
	 * What a picker is showing right now: the colour it holds, or the live one it
	 * {@link ColorEntry.follows} while nobody has touched it.
	 *
	 * @example
	 * ...SdfRounded(SwatchRadius, cssColor(ColorOf(entry)))
	 */
	function ColorOf(entry: ColorEntry): Color
	function SetColorValue(entry: ColorEntry, color: Color): void
	function SetTextValue(entry: TextEntry, text: string): void
	function SetImageEnabled(entry: ImagesEntry, value: string, on: boolean): void
	/**
	 * Moves a tile within the grid. `enabled` doubles as the stored order, so it is
	 * rebuilt alongside `values` rather than left to drift out of sync.
	 */
	function MoveImage(entry: ImagesEntry, from: number, to: number): void
	function TriggerButton(entry: ButtonEntry): void
	interface SearchHit {
		readonly entry: Entry
		readonly segments: readonly string[]
		readonly iconPath: string
	}
	/**
	 * Entries whose name — or a translated alias `localize` returns for it — contains the query,
	 * best match first: exact names, then prefixes, then substrings, with ties going to the entry
	 * sitting higher in the tree and finally to menu order. Entries flagged `searchHidden` are
	 * skipped together with their children.
	 */
	function SearchEntries(query: string, localize?: (name: string) => string[]): SearchHit[]
	/**
	 * What the capture popup binds into — a keybind row or one toggle hotkey.
	 * `entry` is set for keybind rows so their chips light up while capturing.
	 */
	interface CaptureTarget {
		readonly name: string
		readonly allowLeftMouse: boolean
		readonly allowCombinations: boolean
		readonly current: number
		readonly entry?: KeybindEntry
		readonly commit: (bind: number) => void
	}
	/**
	 * Starts a capture session for the target; the pending bind previews the
	 * current assignment until input or SetPendingBind replaces it.
	 */
	function BeginBindCapture(target: CaptureTarget): void
	/**
	 * The capture target of a keybind entry — what its row and the capture
	 * popup both hand to BeginBindCapture.
	 */
	function KeybindCaptureTarget(entry: KeybindEntry): CaptureTarget
	/**
	 * Ends the capture session discarding the pending bind.
	 */
	function CancelKeyCapture(): void
	/**
	 * Ends the capture session assigning the pending bind to its entry.
	 */
	function CommitKeyCapture(): void
	/**
	 * The keybind entry currently owning the capture session, if any.
	 */
	function CapturingEntry(): Nullable<KeybindEntry>
	/**
	 * The target of the capture session, if one is running.
	 */
	function CapturingTarget(): Nullable<CaptureTarget>
	/**
	 * The bind code pending in the capture session, 0 when none is pending.
	 */
	function PendingBindCode(): number
	/**
	 * Replaces the pending bind of the capture session; the next physical
	 * press starts a fresh gesture.
	 */
	function SetPendingBind(code: number): void
	/**
	 * Drives the entry to the driver's value, remembering what it held so a release puts it back.
	 * Does nothing for a driver already engaged, or one whose value no longer names an option of
	 * its entry.
	 */
	function EngageEntryDriver(entry: DriverHolder, driver: EntryDriver): void
	/**
	 * Puts back what the entry held before the driver engaged. Does nothing for a driver that is
	 * not engaged.
	 */
	function ReleaseEntryDriver(entry: DriverHolder, driver: EntryDriver): void
	function SetFocusedText(entry: Nullable<TextEntry>): void
	function FocusedText(): Nullable<TextEntry>
	function SetPanicMode(value: boolean): void
	function IsPanicMode(): boolean
	function SetSliderDragging(value: boolean): void
	function PressKey(code: number, menuOpen?: boolean): boolean
	function ReleaseKey(code: number, menuOpen?: boolean): boolean
}
