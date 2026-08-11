// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type ConfigObject = Record<string, unknown>
	function IsLoadingConfig(): boolean
	function SerializeConfig(node?: NodeEntry): ConfigObject
	/**
	 * Gives a newly attached entry the value the config already holds for it. The
	 * parent keeps the raw config subtree in `stored`, so a page built later still
	 * finds what was saved for it.
	 */
	function AdoptEntry(parent: NodeEntry, entry: Entry): void
	function ApplyConfig(config: unknown, node?: NodeEntry): void
	function IsDefaultValue(entry: ValueEntry): boolean
	function ResetEntries(node: NodeEntry): void
	function ResetEntry(entry: Entry): void
	function IsDefaultDeep(entry: Entry): boolean
	const WindowConfigKey = "Header"
	const LanguageConfigKey = "SelectedLocalization"
	function OnConfigWritten(listener: (config: ConfigObject) => void): void
	function FlushPendingConfig(): void
}
