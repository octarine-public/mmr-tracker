// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface ILockable {
		IsDisabled: boolean
	}
	interface IClampable {
		clampMin: Nullable<number>
		clampMax: Nullable<number>
	}
	class CSafeMode {
		public get Enabled(): boolean
		public set Enabled(value: boolean)
		public BindView(sync: (enabled: boolean) => void): void
		public ConfirmDisable(onConfirm?: () => void, onCancel?: () => void): void
		public Register(control: ILockable): void
		public RegisterMax(slider: IClampable, safeMax: number): void
		public RegisterMin(slider: IClampable, safeMin: number): void
	}
	const SafeMode: CSafeMode
}
