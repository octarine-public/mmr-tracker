// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	class CMenuManager {
		public get entries(): AnyHandle[]
		public get IsOpen(): boolean
		public set IsOpen(value: boolean)
		public get config(): ConfigObject
		public set config(value: ConfigObject)
		public Update(): void
		public foreachRecursive(callback: (handle: AnyHandle) => void, node?: NodeEntry): void
		/**
		 * Walks every hotkey the menu carries, in menu order, with the row it rides
		 * — what a listing of everything the user has bound is built from.
		 *
		 * @example
		 * Menu.MenuManager.foreachHotkey((holder, hotkey) =>
		 * 	console.log(holder.Name, hotkey.BindName)
		 * )
		 */
		public foreachHotkey(callback: (holder: AnyHandle, hotkey: AnyHotkey) => void): void
		public LoadConfig(raw: unknown, onLanguage?: (name: string) => void): void
		public SaveConfig(language: string): ConfigObject
		public ReloadConfig(): Promise<void>
	}
	const MenuManager: CMenuManager
}
