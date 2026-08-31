// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type ConfigObject = Record<string, unknown>
	function IsLoadingConfig(): boolean
	/**
	 * Whether the boot config has landed — or never will, on a host that has none. Until it does,
	 * the window state, the navigation and every control are defaults: a surface that decides where
	 * to stand from them draws itself against a window that is about to move, so it waits for this.
	 */
	function ConfigSettled(): boolean
	function SerializeConfig(node?: NodeEntry): ConfigObject
	/**
	 * Gives a newly attached entry the value the config already holds for it. The
	 * parent keeps the raw config subtree in `stored`, so a page built later still
	 * finds what was saved for it.
	 */
	function AdoptEntry(parent: NodeEntry, entry: Entry): void
	type ConfigMigration = (raw: ConfigObject) => void
	/**
	 * Registers a reshaper for the raw stored config, run once against the full
	 * tree before it is applied. Use it when a node moves or is renamed so a
	 * config saved under the old path still lands on the new node. A migration
	 * MUST be idempotent — no-op once the new path is present — because it runs on
	 * every load, including configs already saved in the new shape.
	 */
	function AddConfigMigration(migration: ConfigMigration): void
	function ApplyConfig(config: unknown, node?: NodeEntry): void
	function IsDefaultValue(entry: ValueEntry): boolean
	function ResetEntries(node: NodeEntry): void
	function ResetEntry(entry: Entry): void
	function IsDefaultDeep(entry: Entry): boolean
	const WindowConfigKey = "Header"
	const LanguageConfigKey = "SelectedLocalization"
	/** Runs the listener after every config write; the returned call takes it off again. */
	function OnConfigWritten(listener: (config: ConfigObject) => void): () => void
	function FlushPendingConfig(): void
	/**
	 * Forces the pending-save flag and flushes, for the paths where the runtime is about to die: a
	 * reload must carry the freshest window and navigation state even when nothing marked a save.
	 */
	function FlushConfigBeforeReload(): void
}
