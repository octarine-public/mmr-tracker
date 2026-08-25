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
	 * Whether this entry's rows live in a floating window rather than on a page or in a popover:
	 * some ancestor is a hosted node that is not a popover — the combination only a window's page
	 * carries. Such a row offers no context menu; the window itself answers the right button.
	 */
	function IsWindowHosted(entry: EntryCommon): boolean
	/**
	 * Whether this node is a page of its own, rather than a row of the one holding it. A node that
	 * opens in a popover is a row wherever rows are listed and a page nowhere: the extra settings of
	 * another row, or a settings row of its own.
	 */
	function IsPageNode(entry: Entry): entry is NodeEntry
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
		collapsible?: boolean
		sortNodes: boolean
		iconTint: boolean
		filterGroup: Nullable<number>
		filterGroups: MenuFilterGroup[]
		filtersOff: Set<number>
		groupHeadings?: boolean
		saveUnusedConfigs: boolean
		stored?: Record<string, unknown>
		pinnedName?: string
		pinnedLabel?: string
		subLabel?: string
		searchPlaceholder?: string
		/**
		 * Whether this node opens in a popover instead of on the page: the extra settings of a row,
		 * or a settings row of its own carrying nothing but its name, its swatches and the button.
		 */
		popover?: boolean
		/** Colour pickers riding this node's settings row, which lose rows of their own. */
		swatches?: ColorEntry[]
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
	 * What holds an entry at a stored value: a hotkey while its key is engaged, a logic rule while
	 * its condition holds. Both drive the entry and let it go the same way — only what turns them
	 * on differs.
	 */
	interface EntryDriver<T = unknown> {
		/** Value the driver holds the entry at while it is active. */
		value: T
		/** Whether the driver is currently holding the entry at its value; not persisted. */
		active: boolean
		/** Value the entry held before the driver engaged, restored on release; not persisted. */
		restore?: T
	}
	/**
	 * A key bound to an entry from its row's context menu. While the hotkey is active it drives
	 * the entry to {@link EntryDriver.value}; a hold-mode hotkey reverts on release, a toggle-mode
	 * one applies on every press.
	 */
	interface EntryHotkey<T = unknown> extends EntryDriver<T> {
		/** Packed bind code (`PackBind` in Store/Bind), 0 while unbound. */
		bind: number
		/** "toggle" applies the value on every press, "hold" drives it only while the key is down. */
		mode: HotkeyMode
		/** When this hotkey appears in the on-screen hotkeys panel. */
		visibility: HotkeyVisibility
	}
	/** Which side of its threshold a logic rule holds its value on. */
	type LogicWhen = "after" | "before"
	/**
	 * A condition bound to an entry from its row's context menu. While the match clock stands on the
	 * {@link when} side of {@link at} the rule drives the entry to its value, and puts back whatever
	 * the entry held before as soon as it does not — so the next match arms the rule again.
	 */
	interface EntryLogic<T = unknown> extends EntryDriver<T> {
		/** Whether the rule holds its value after the threshold or before it. */
		when: LogicWhen
		/** Threshold on the match clock, in seconds. */
		at: number
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
	/** Logic rule of a toggle: while its condition holds the switch sits at the stored state. */
	type ToggleLogic = EntryLogic<boolean>
	/** Logic rule of a slider: while its condition holds the slider sits at the stored number. */
	type SliderLogic = EntryLogic<number>
	/**
	 * Logic rule of a dropdown: while its condition holds the stored option is selected. Keyed by
	 * the option's value for the same reason a dropdown hotkey is.
	 */
	type DropdownLogic = EntryLogic<string>
	/** Logic rule of a multiselect: the option values selected while its condition holds. */
	type MultiSelectLogic = EntryLogic<string[]>
	interface ToggleEntry extends EntryCommon {
		readonly kind: "toggle"
		readonly defaultValue: boolean
		value: boolean
		/** Colours riding this toggle's row, shown while it is on. */
		swatches?: ColorEntry[]
		/** Keys bound to this toggle from its context menu, in creation order. */
		hotkeys: ToggleHotkey[]
		/** Conditions bound to this toggle from its context menu, in creation order. */
		logic: ToggleLogic[]
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
		/** Conditions bound to this slider from its context menu, in creation order. */
		logic: SliderLogic[]
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
		/** Conditions bound to this dropdown from its context menu, in creation order. */
		logic: DropdownLogic[]
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
		/** Conditions bound to this multiselect from its context menu, in creation order. */
		logic: MultiSelectLogic[]
		listeners: ((entry: MultiSelectEntry) => void)[]
	}
	interface KeybindEntry extends EntryCommon {
		readonly kind: "keybind"
		defaultKey: string
		defaultKeyIdx: number
		assignedKey: number
		active: boolean
		activatesInMenu: boolean
		/**
		 * Whether a press this bind answers is taken from the game. On by default: a bind is
		 * usually put on a key precisely so the game stops seeing it. A bind that shadows one of
		 * the game's own - a scoreboard on Tab - turns it off, and both act on the same press.
		 */
		claimsKey: boolean
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
		/**
		 * The colour this picker stands for while nobody has touched it, read every render. A default
		 * that follows the theme rather than a literal, for a swatch whose owner draws in the theme's
		 * own ink until it is given a colour of its own.
		 *
		 * {@link defaultColor} stays the literal it was declared with: it is what a config is compared
		 * against, and one that moved with the theme would make the same config read differently on
		 * two machines.
		 */
		follows?: () => Color
		listeners: ((entry: ColorEntry) => void)[]
	}
	interface TextEntry extends EntryCommon {
		readonly kind: "text"
		readonly placeholder: string
		text: string
		listeners: ((entry: TextEntry) => void)[]
	}
	type ImageVariant = "square" | "item" | "hero" | "circle"
	/** One value a catalogue offers, as the picker's browse modal lists it. */
	interface CatalogueValue {
		/** The value itself, which is also what the tile's image is resolved from. */
		readonly value: string
		/** What the tile is called, localized before it is shown. */
		readonly label: string
		/** Words the modal's search matches besides the label, such as what the value does. */
		readonly keywords?: string
	}
	/** A titled run of values in the browse modal, such as one shop category. */
	interface CatalogueSection {
		readonly title: string
		readonly values: readonly CatalogueValue[]
		/** Colour the heading and a chosen tile's edge wear, in place of the theme's accent. */
		readonly accent?: string
	}
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
		createdDefault: boolean
		defaultPairs: string
		/**
		 * What the row's own tiles are chosen from. A picker with a catalogue keeps the chosen tiles
		 * in the row and hands the rest to a modal, so a hundred-value picker stays one row tall.
		 */
		catalogue: readonly CatalogueSection[]
		listeners: ((entry: ImagesEntry) => void)[]
	}
	type ValueEntry = ToggleEntry | SliderEntry | DropdownEntry | MultiSelectEntry | KeybindEntry | ButtonEntry | ColorEntry | TextEntry | ImagesEntry | DescriptionEntry
	type Entry = NodeEntry | ValueEntry
	/** Entries whose rows carry hotkeys and logic rules from the context menu. */
	type DriverHolder = ToggleEntry | SliderEntry | DropdownEntry | MultiSelectEntry
	/**
	 * Whether the entry's row offers hotkeys and logic rules in its context menu.
	 */
	function IsDriverHolder(entry: Entry): entry is DriverHolder
}
