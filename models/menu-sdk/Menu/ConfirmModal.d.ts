// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface IConfirmModalOptions {
		readonly title: string
		readonly message: string
		readonly confirmText?: string
		readonly cancelText?: string
		readonly onConfirm?: () => void
		readonly onCancel?: () => void
	}
	class CConfirmModal {
		public get IsOpen(): boolean
		/**
		 * Keeps the dialog centered over the menu window; ticked once per
		 * frame while the menu runs.
		 */
		public Tick(): void
		public Show(options: IConfirmModalOptions): void
		public Dismiss(): void
	}
	const ConfirmModal: CConfirmModal
}
