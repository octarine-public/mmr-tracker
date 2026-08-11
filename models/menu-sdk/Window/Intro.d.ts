// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	type IntroTargetKey = "wordmark" | "search" | "collapse" | "controls" | "subpanel" | "topbar" | "topnav" | "content" | `nav:${number}` | `toptab:${number}`
	function SetIntroTarget(key: IntroTargetKey, element: Nullable<HTMLElement>): void
	function IntroPlayed(): boolean
	function IntroActive(): boolean
	function ResetIntro(): void
	function PlayIntro(frame: HTMLElement): void
	function TickIntro(now: number): void
}
