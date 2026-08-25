// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface IConfigItem {
		id: string
		name: string
		description?: string
		badge?: number
		active: boolean
		public: boolean
		shareCode?: string
		origin: string
		presetName?: string
		modified?: boolean
		oversize?: boolean
		likes?: number
		sourceId?: string
		author?: string
		createdAt?: number
		updatedAt?: number
	}
	interface IGalleryItem {
		id: string
		name: string
		description?: string
		badge?: number
		likes: number
		likedByMe: boolean
		mine: boolean
		private: boolean
		shareCode: string
	}
	interface IPresetItem {
		id: string
		name: string
		description?: string
	}
	const MaxConfigs = 10
	const BadgeNames: string[]
	const GallerySortNames: string[]
	class CConfigService {
		public Items: IConfigItem[]
		public Gallery: IGalleryItem[]
		public GalleryTotal: number
		public Presets: IPresetItem[]
		public KeepBinds: boolean
		public MineSort: number
		public GallerySort: number
		public GalleryBadge: number
		public GalleryQuery: string
		public Busy: boolean
		public Status: string
		public StatusIsError: boolean
		public AccessList: string[]
		public AccessLoading: boolean
		public AccessOwner: Nullable<string>
		public get Available(): boolean
		public OnChanged(cb: () => void): void
		public SetReloadHandler(fn: () => Promise<void>): void
		public SetStatus(text: string, isError: boolean): void
		public ClearStatus(): void
		public SortedItems(): IConfigItem[]
		public Refresh(): Promise<void>
		public LoadGallery(reset: boolean): Promise<void>
		public get GalleryHasMore(): boolean
		public LoadPresets(): Promise<void>
		public Activate(item: IConfigItem): Promise<void>
		public Create(name: string): Promise<void>
		/**
		 * Adds a shared config by its share code. Resolves to whether the config was actually added,
		 * so the page can keep a rejected code in the field for correction instead of wiping it.
		 */
		public AddByCode(code: string): Promise<boolean>
		public Delete(item: IConfigItem): Promise<void>
		public TogglePublic(item: IConfigItem): Promise<void>
		public SaveInfo(item: IConfigItem, name: string, description: string, badge: number): Promise<void>
		public LoadAccess(item: IConfigItem): Promise<void>
		public Grant(item: IConfigItem, grantee: string): Promise<void>
		public Revoke(item: IConfigItem, grantee: string): Promise<void>
		public Like(item: IGalleryItem): Promise<void>
		public AddFromGallery(item: IGalleryItem): Promise<void>
		public AddPreset(item: IPresetItem): Promise<void>
	}
	const ConfigService: CConfigService
}
