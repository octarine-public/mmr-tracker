// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const MaxCloudThemes = 10
	/** A theme as the server holds it: the snapshot to wear, and the labels shown on its card. */
	interface IStoredTheme {
		snapshot: IThemeSnapshot
		badge: EThemeBadge
		blur: boolean
	}
	/**
	 * Packs a theme for the server. Its labels ride inside the blob rather than beside it - the themes
	 * namespace has no label columns - and stay on the v1 shape on purpose: older clients ignore the
	 * independent blur field and still wear the colors and Light/Dark label.
	 */
	function EncodeStoredTheme(snapshot: IThemeSnapshot, badge: EThemeBadge, blur?: boolean): string
	/**
	 * Unpacks a stored theme, refusing anything that is not a well-formed v1 blob - a newer client's
	 * format must not half-apply. A blob without labels is simply unlabelled.
	 */
	function DecodeStoredTheme(raw: string): Nullable<IStoredTheme>
	interface ICloudTheme {
		id: string
		name: string
		description: string
		public: boolean
		shareCode: string
		likes: number
		snapshot?: IThemeSnapshot
		badge: EThemeBadge
		blur: boolean
	}
	interface IThemeGalleryEntry {
		id: string
		name: string
		description: string
		likes: number
		likedByMe: boolean
		mine: boolean
		shareCode: string
		snapshot?: IThemeSnapshot
		badge: EThemeBadge
		blur: boolean
	}
	class CThemeCloud {
		public Items: ICloudTheme[]
		public Gallery: IThemeGalleryEntry[]
		public GalleryTotal: number
		public GalleryQuery: string
		public Busy: boolean
		public Status: string
		public StatusIsError: boolean
		public Loaded: boolean
		public AccessList: string[]
		public AccessLoading: boolean
		public AccessOwner: Nullable<string>
		public get Available(): boolean
		public OnChanged(cb: () => void): void
		public SetStatus(text: string, isError: boolean): void
		public ClearStatus(): void
		public get GalleryHasMore(): boolean
		public Refresh(): Promise<void>
		/**
		 * Fetches the collection once, for a page that only lists themes to pick from. The page that
		 * owns them refreshes on every open because it is the one that writes; a picker just needs
		 * the list to be there, and asking again on each visit would spend a round trip on nothing.
		 */
		public EnsureLoaded(): Promise<void>
		public SaveCurrent(name: string, snapshot: IThemeSnapshot): Promise<void>
		/**
		 * Renames a theme, rewrites its description and relabels it. The labels live inside the blob,
		 * so relabelling has to re-send them; a theme this build could not decode keeps the blob it has
		 * and only its name and description move, rather than being overwritten with a guess.
		 */
		public UpdateInfo(item: ICloudTheme, name: string, description: string, badge: EThemeBadge, blur: boolean): Promise<void>
		public Overwrite(item: ICloudTheme, snapshot: IThemeSnapshot): Promise<void>
		public Delete(item: ICloudTheme): Promise<void>
		public SetPublic(item: ICloudTheme, value: boolean): Promise<void>
		/**
		 * Adds a shared theme to the collection by its share code. Resolves to whether the theme was
		 * actually added, so the page can keep a rejected code in the field for correction instead of
		 * wiping it.
		 */
		public AddByCode(code: string): Promise<boolean>
		public LoadGallery(reset: boolean): Promise<void>
		public Like(entry: IThemeGalleryEntry): Promise<void>
		public AddFromGallery(entry: IThemeGalleryEntry): Promise<void>
		public LoadAccess(item: ICloudTheme): Promise<void>
		public CloseAccess(): void
		public Grant(item: ICloudTheme, grantee: string): Promise<void>
		public Revoke(item: ICloudTheme, grantee: string): Promise<void>
	}
	const ThemeCloud: CThemeCloud
}
