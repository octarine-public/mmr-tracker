// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type EntryKind = "node" | "toggle" | "slider" | "dropdown" | "multiSelect" | "keybind" | "button" | "color" | "text" | "images" | "description"
	interface MenuHintMedia {
		kind: "image" | "gif" | "video"
		src: string
		alt?: string
		caption?: string
		ratio?: number
		fit?: "cover" | "contain"
	}
	interface MenuHint {
		/** Trigger glyph: the default (i) states a fact, "help" asks "how does this work". */
		glyph?: "info" | "help"
		title?: string
		text?: string
		bullets?: string[]
		keys?: string[]
		note?: string
		noteTone?: "tip" | "warn"
		media?: MenuHintMedia | MenuHintMedia[]
		mediaFirst?: boolean
		meta?: string
	}
	interface EntryCommon {
		readonly kind: EntryKind
		readonly name: string
		readonly parent: Nullable<NodeEntry>
		tooltip: string
		description?: string
		hint?: MenuHint
		iconPath: string
		priority: number
		visible: boolean
		searchHidden: boolean
		disabled: boolean
		firstTime: boolean
		saveConfig: boolean
		iconColor: Nullable<Color>
		iconRound: number
		markColorToken?: string
		subSettings?: NodeEntry
		hostedBy?: Entry
		/**
		 * Entry this one is a stand-in for. When set, the row's context menu offers
		 * navigation to the target instead of to the row itself, so generated lists
		 * (the keybinds list) can jump to the setting they mirror.
		 */
		revealTarget?: Entry
	}
	function IsEntryVisible(entry: EntryCommon): boolean
	/**
	 * Whether the entry sits under a switch that is off — a page's {@link NodeEntry.gate} or the
	 * header control of a card above it. Nothing is locked and no value is lost; the accent goes
	 * muted so the block reads as set up but not running, and stays as easy to read and to change
	 * as a live one. The switch itself is never inert — it is what turns the block back on.
	 */
	function IsEntryInert(entry: Entry): boolean
	interface MenuFilterGroup {
		id: number
		icon: string
		tooltip?: string
		color?: Color
	}
	interface DisabledNotice {
		title: string
		description: string
		enableText: string
	}
	interface NodeEntry extends EntryCommon {
		readonly kind: "node"
		readonly children: Entry[]
		expanded: boolean
		sortNodes: boolean
		iconTint: boolean
		filterGroup: Nullable<number>
		filterGroups: MenuFilterGroup[]
		filtersOff: Set<number>
		saveUnusedConfigs: boolean
		stored?: Record<string, unknown>
		pinnedName?: string
		pinnedLabel?: string
		subLabel?: string
		searchPlaceholder?: string
		popover?: boolean
		textColor?: Color
		iconGrayScale?: boolean
		tabbedChildren?: boolean
		headerControl?: ValueEntry
		/** Toggle whose off state makes every card of this page read as inert. */
		gate?: ToggleEntry
		disabledNotice?: DisabledNotice
		customPage?: () => React.ReactNode
	}
	interface DescriptionEntry extends EntryCommon {
		readonly kind: "description"
		selected: boolean
		header?: boolean
	}
	/** How a hotkey drives its entry: apply on every press, or follow the key while it is held. */
	type HotkeyMode = "toggle" | "hold"
	/** When a bound hotkey appears in the on-screen hotkeys panel. */
	type HotkeyVisibility = "hidden" | "active" | "always"
	/**
	 * A key bound to an entry from its row's context menu. While the hotkey is active it drives
	 * the entry to {@link value}; a hold-mode hotkey reverts on release, a toggle-mode one
	 * applies on every press.
	 */
	interface EntryHotkey<T = unknown> {
		/** Packed bind code (`PackBind` in Store/Bind), 0 while unbound. */
		bind: number
		/** "toggle" applies the value on every press, "hold" drives it only while the key is down. */
		mode: HotkeyMode
		/** Value the hotkey drives the entry to while active. */
		value: T
		/** When this hotkey appears in the on-screen hotkeys panel. */
		visibility: HotkeyVisibility
		/** Whether the hotkey is currently driving the entry to its value; not persisted. */
		active: boolean
		/** Value the entry held before the hotkey engaged, restored on release; not persisted. */
		restore?: T
	}
	/** Hotkey of a toggle: a press flips the switch or drives it to the stored state. */
	type ToggleHotkey = EntryHotkey<boolean>
	/** Hotkey of a slider: while active the slider holds the stored number. */
	type SliderHotkey = EntryHotkey<number>
	/**
	 * Hotkey of a dropdown: while active the stored option is selected. Keyed by the option's
	 * value rather than by index, so a renamed or reordered list cannot move it onto a
	 * different item.
	 */
	type DropdownHotkey = EntryHotkey<string>
	/** Hotkey of a multiselect: the option values selected while the hotkey is active. */
	type MultiSelectHotkey = EntryHotkey<string[]>
	interface ToggleEntry extends EntryCommon {
		readonly kind: "toggle"
		readonly defaultValue: boolean
		value: boolean
		/** Colours riding this toggle's row, shown while it is on. */
		swatches?: ColorEntry[]
		/** Keys bound to this toggle from its context menu, in creation order. */
		hotkeys: ToggleHotkey[]
		listeners: ((entry: ToggleEntry) => void)[]
	}
	interface SliderEntry extends EntryCommon {
		readonly kind: "slider"
		readonly defaultValue: number
		/** The declared range. A script that only learns the ceiling at runtime may move it. */
		min: number
		max: number
		readonly precision: number
		value: number
		clampMin?: number
		clampMax?: number
		suffix?: string
		ticks?: number[] | true
		callOnRelease: boolean
		/** Keys bound to this slider from its context menu, in creation order. */
		hotkeys: SliderHotkey[]
		listeners: ((entry: SliderEntry) => void)[]
		finishListeners: ((entry: SliderEntry) => void)[]
	}
	interface DropdownEntry extends EntryCommon {
		readonly kind: "dropdown"
		readonly defaultValue: number
		values: string[]
		selectedID: number
		swatches?: OptionSwatches
		/** Keys bound to this dropdown from its context menu, in creation order. */
		hotkeys: DropdownHotkey[]
		listeners: ((entry: DropdownEntry) => void)[]
	}
	/**
	 * Colour pickers riding an option's own row, keyed by the option's value for the same reason
	 * the selection is: a renamed or reordered list must not move them onto a different item.
	 */
	type OptionSwatches = Map<string, ColorEntry[]>
	/**
	 * Selection is keyed by value rather than by index, so reordering or renaming
	 * the list cannot silently move a stored choice onto a different item.
	 */
	interface MultiSelectEntry extends EntryCommon {
		readonly kind: "multiSelect"
		readonly defaultValue: string[]
		values: string[]
		enabled: Map<string, boolean>
		swatches?: OptionSwatches
		/** Keys bound to this multiselect from its context menu, in creation order. */
		hotkeys: MultiSelectHotkey[]
		listeners: ((entry: MultiSelectEntry) => void)[]
	}
	interface KeybindEntry extends EntryCommon {
		readonly kind: "keybind"
		defaultKey: string
		defaultKeyIdx: number
		assignedKey: number
		active: boolean
		activatesInMenu: boolean
		allowLeftMouse: boolean
		allowCombinations: boolean
		listeners: ((entry: KeybindEntry) => void)[]
	}
	/** Visual emphasis of an action button. */
	type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
	/** Height and spacing scale of an action button. */
	type ButtonSize = "sm" | "md"
	interface ButtonEntry extends EntryCommon {
		readonly kind: "button"
		variant: ButtonVariant
		size: ButtonSize
		listeners: ((entry: ButtonEntry) => void)[]
	}
	interface ColorEntry extends EntryCommon {
		readonly kind: "color"
		readonly defaultColor: Color
		color: Color
		listeners: ((entry: ColorEntry) => void)[]
	}
	interface TextEntry extends EntryCommon {
		readonly kind: "text"
		readonly placeholder: string
		text: string
		listeners: ((entry: TextEntry) => void)[]
	}
	type ImageVariant = "square" | "item" | "hero" | "circle"
	interface ImagesEntry extends EntryCommon {
		readonly kind: "images"
		variant?: ImageVariant
		values: string[]
		/** The arrangement the entry was created with, kept for resets. */
		defaultOrder: string[]
		enabled: Map<string, boolean>
		ordered: boolean
		/** Lets the user rearrange the grid by dragging tiles. */
		draggable: boolean
		rawPaths: boolean
		createdDefault: boolean
		defaultPairs: string
		listeners: ((entry: ImagesEntry) => void)[]
	}
	type ValueEntry = ToggleEntry | SliderEntry | DropdownEntry | MultiSelectEntry | KeybindEntry | ButtonEntry | ColorEntry | TextEntry | ImagesEntry | DescriptionEntry
	type Entry = NodeEntry | ValueEntry
	/** Entries whose rows carry hotkeys from the context menu. */
	type HotkeyHolder = ToggleEntry | SliderEntry | DropdownEntry | MultiSelectEntry
	/**
	 * Whether the entry's row offers hotkeys in its context menu.
	 */
	function IsHotkeyHolder(entry: Entry): entry is HotkeyHolder
	function EntryPath(entry: Entry): string
}
