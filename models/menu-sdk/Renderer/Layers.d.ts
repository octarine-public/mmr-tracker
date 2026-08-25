// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	interface LayerSet {
		readonly root: HTMLElement
		readonly panels: HTMLElement
		readonly cards: HTMLElement
		readonly main: HTMLElement
		readonly portal: HTMLElement
	}
	/**
	 * Bumped whenever the layers are built or torn down. Style sheets key on it: a sheet synced
	 * before the layer documents existed has to land on them once they do.
	 */
	function LayersEpoch(): number
	/**
	 * The documents a style sheet has to reach. With layer documents each carries its own sheet —
	 * a document resolves selectors against itself alone; without them everything lives in the
	 * base document and one sheet covers it.
	 */
	function StyleSheetTargets(): readonly HTMLDocument[]
	/**
	 * The layer set, built on first use. On a host with layer documents the world, the cards and the
	 * menu chrome live in documents of their own: layout dirt is per document, so the overlays
	 * tracking units every frame stop reformatting the menu, a card resizing to its own contents
	 * stops reformatting either of them, and a menu interaction stops reformatting the overlays.
	 * Without host support everything shares the base document under one swept root, as it always
	 * did, stacked by the order the layers are built in.
	 *
	 * Every document carries an explicit z-index. This is not only the stacking order — it is what
	 * disables RmlUi's window behaviour, which pulls a clicked document with `z-index: auto` above
	 * its siblings: one click on a panel would put the whole world layer over the menu.
	 */
	function Layers(): LayerSet
	function TickLayers(now: number): boolean
	function SetMainFilter(filter: Nullable<string>): void
	function ResetLayers(): void
	function ApplyRootFont(): void
}
