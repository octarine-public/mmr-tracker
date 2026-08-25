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
	/**
	 * A source for `path` resampled to the pixel size it will be drawn at, or `path` itself where that
	 * cannot help. Mip selection lands only on a power-of-two level and rounds toward the smaller one,
	 * so art drawn at a size the chain does not hold reads soft however well the chain was built; art
	 * cut once, straight to its drawn size, does not.
	 *
	 * Raster only: a vector source rasterizes at its display size already, and a scheme source names
	 * something the host serves rather than a file to resample. Sizes are in whole screen pixels, not
	 * dp — pass them through {@link DpToPx} first. Every source taken here is handed back to
	 * {@link ReleaseSizedAsset} when the element drawing it goes away or asks for another size.
	 *
	 * Hosts predating the function keep the raw path, which the mip chain still covers.
	 */
	function RegisterSizedAsset(path: string, width: number, height: number): string
	/** Hands back a source taken from {@link RegisterSizedAsset}. A raw path is ignored. */
	function ReleaseSizedAsset(source: string): void
	function ResolveAsset(path: string, mode?: AssetMode): string
}
