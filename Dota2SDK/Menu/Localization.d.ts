// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	class CLocalization {
		public wasChanged: boolean
		/** Fires after the language switches or a unit adds strings; panels re-localize on it. */
		public OnChanged(listener: () => void): void
		public get Version(): number
		public get SelectedUnitName(): string
		public set SelectedUnitName(name: string)
		public Languages: string[]
		public SetLang(idx: number): void
		public get LocalizationUnitsNames(): string[]
		public AddLocalizationUnit(unitName: string, unit: Map<string, string>): void
		public Localize(name: string): string
		public LocalizeIn(language: string, name: string): string
		public LocalizeAll(name: string): string[]
	}
	const Localization: CLocalization
}
