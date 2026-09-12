// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface ILockable {
		readonly entry: Entry
		IsDisabled: boolean
	}
	interface IClampable {
		clampMin: Nullable<number>
		clampMax: Nullable<number>
	}
	interface IHoldableValue {
		HoldValue: Nullable<boolean>
	}
	interface IHoldableOption {
		HoldOption: Nullable<number>
	}
	/**
	 * The switch that keeps the dangerous settings out of reach. It is the machine's own, kept in
	 * the client's store apart from every config: a config applied, switched to or taken from a
	 * share code never moves it, and it goes off only through {@link ConfirmDisable}. While it is
	 * on, every control registered here is held - locked, clamped, or pinned to its safe value -
	 * whatever a config, a hotkey or a rule tries to set it to.
	 */
	class CSafeMode {
		public get Enabled(): boolean
		public set Enabled(value: boolean)
		/**
		 * Reads the state the machine keeps, before any config is walked into the tree: what a
		 * config lands under must already be the holds the user chose. A store that holds nothing,
		 * or cannot be opened, leaves the switch on. A choice made before the store answered wins
		 * over what it held.
		 */
		public Restore(): Promise<void>
		/**
		 * Takes the state a config carried from before the switch moved into the machine's store,
		 * once: the first config walked in after the move seeds the store, and from then on no
		 * config moves the switch. Anything but a boolean, or a state already known, is ignored.
		 */
		public Seed(stored: unknown): void
		public BindView(sync: (enabled: boolean) => void): void
		public ConfirmDisable(onConfirm?: () => void, onCancel?: () => void): void
		/** Locks the control while Safe mode is on; its value stays whatever it was. */
		public Register(control: ILockable): void
		public RegisterMax(slider: IClampable, safeMax: number): void
		public RegisterMin(slider: IClampable, safeMin: number): void
		/**
		 * Pins the switch to `safe` while Safe mode is on: it takes that value at once, and every
		 * set that follows - from a config, a hotkey, a rule or a click - lands on it too.
		 * @example
		 * MenuSDK.SafeMode.RegisterValue(antiAim, false)
		 */
		public RegisterValue(toggle: IHoldableValue, safe: boolean): void
		/**
		 * Pins the dropdown to the option `safe` while Safe mode is on, the way
		 * {@link RegisterValue} pins a switch.
		 * @example
		 * MenuSDK.SafeMode.RegisterOption(aimType, EAimType.Standard)
		 */
		public RegisterOption(dropdown: IHoldableOption, safe: number): void
	}
	const SafeMode: CSafeMode
}
