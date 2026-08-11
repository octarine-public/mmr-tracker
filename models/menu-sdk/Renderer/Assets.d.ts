// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type AssetMode = "raster" | "vector"
	function SetAssetResolver(next: (path: string) => string): void
	/**
	 * Element tag for a resolved asset: <svg> (SVG plugin) rasterizes the vector
	 * source at the exact display size, <img> decodes a raster texture.
	 */
	/** Vector sources render through the svg element; panorama ships them as vsvg containers. */
	function AssetElementTag(src: string): "svg" | "img"
	function ResolveAsset(path: string, mode?: AssetMode): string
}
