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
	const MenuTree: NodeEntry
	function SortEntries(parent: NodeEntry): void
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
	function ImagePairs(entry: ImagesEntry): [string, boolean][]
	function SetToggleValue(entry: ToggleEntry, value: boolean): void
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
	function AddEntryHotkey(entry: HotkeyHolder, bind?: number): EntryHotkey
	function RemoveEntryHotkey(entry: HotkeyHolder, hotkey: EntryHotkey): void
	function ClearEntryHotkeys(entry: HotkeyHolder): void
	function SetEntryHotkeyBind(hotkey: EntryHotkey, bind: number): void
	function SetEntryHotkeyMode(hotkey: EntryHotkey, mode: HotkeyMode): void
	/**
	 * Stores the value the hotkey drives its entry to. A slider's value is
	 * clamped and rounded like the slider itself; dropdown and multiselect values
	 * must name existing options or the call is ignored.
	 */
	function SetEntryHotkeyValue(entry: ToggleEntry, hotkey: ToggleHotkey, value: boolean): void
	function SetEntryHotkeyValue(entry: SliderEntry, hotkey: SliderHotkey, value: number): void
	function SetEntryHotkeyValue(entry: DropdownEntry, hotkey: DropdownHotkey, value: string): void
	function SetEntryHotkeyValue(entry: MultiSelectEntry, hotkey: MultiSelectHotkey, value: string[]): void
	function SetEntryHotkeyVisibility(hotkey: EntryHotkey, visibility: HotkeyVisibility): void
	/**
	 * Walks every hotkey in the tree, in menu order — the on-screen panel and
	 * hotkey listings are built from this.
	 */
	function ForEachEntryHotkey(callback: (entry: HotkeyHolder, hotkey: EntryHotkey) => void, node?: NodeEntry): void
	/**
	 * The value a hotkey drives, as text: empty for a toggle, the number with the
	 * slider's precision and suffix, the option of a dropdown, or a multiselect
	 * summary. `localize` translates suffixes and option names.
	 *
	 * @example
	 * HotkeyValueName(entry, hotkey, name => Localization.Localize(name))
	 */
	function HotkeyValueName(entry: HotkeyHolder, hotkey: EntryHotkey, localize?: (name: string) => string): string
	function SetSliderValue(entry: SliderEntry, value: number): void
	function FinishSliderChange(entry: SliderEntry): void
	function SetDropdownValue(entry: DropdownEntry, selectedID: number): void
	function SetMultiSelectValue(entry: MultiSelectEntry, value: string, selected: boolean): void
	function SetMultiSelectValues(entry: MultiSelectEntry, values: string[]): void
	function SetKeybindValue(entry: KeybindEntry, key: number): void
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
	 * Starts a capture session writing into the keybind entry.
	 */
	function BeginKeyCapture(entry: KeybindEntry): void
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
	function SetFocusedText(entry: Nullable<TextEntry>): void
	function FocusedText(): Nullable<TextEntry>
	function SetPanicMode(value: boolean): void
	function IsPanicMode(): boolean
	function SetSliderDragging(value: boolean): void
	function IsSliderDragging(): boolean
	function PressKey(code: number, menuOpen?: boolean): boolean
	function ReleaseKey(code: number, menuOpen?: boolean): boolean
}
