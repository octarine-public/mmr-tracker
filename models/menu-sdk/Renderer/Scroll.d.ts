// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	class ScrollController {
		constructor(root: HTMLElement, content: HTMLElement, thumb: HTMLElement, thumbFill: HTMLElement)
		public get Offset(): number
		public ScrollBy(deltaPx: number): void
		public ScrollTo(offsetPx: number): void
		public ScrollToDescendant(target: HTMLElement): void
		public ScrollToChild(child: HTMLElement): void
		public OnWheel(event: Event): void
		public OnThumbDown(event: Event): void
		public OnHover(hovered: boolean): void
		public OnThumbHover(hovered: boolean): void
		public Tick(now: number): void
		public Sync(): void
	}
	function SetContentScroll(controller: Nullable<ScrollController>): void
	function ContentScroll(): Nullable<ScrollController>
	function RequestScrollTo(entry: object): void
	function HasPendingScroll(): boolean
	function TickScrollAreas(now: number): void
	function ResetScrollAreas(): void
	function Scroll(props: {
		style?: RmlStyle
		controller?: (controller: Nullable<ScrollController>) => void
		rootRef?: (element: Nullable<HTMLElement>) => void
		children?: React.ReactNode
	}): React.ReactElement
}
