// AUTO-GENERATED - do not edit.
declare namespace MenuSDK {
	const enum Ease {
		Standard = 0,
		Out = 1,
		Enter = 2,
		Pop = 3,
		Linear = 4
	}
	const Duration: {
		readonly Hover: 150
		readonly Slide: 180
		readonly Fade: 200
		readonly Reveal: 300
		readonly Page: 220
	}
	function EaseValue(ease: Ease, t: number): number
	/**
	 * Global speed multiplier applied to every tween and stylesheet transition;
	 * 1 is the designed pace, higher is faster. Clamped to [0.01, 4].
	 */
	function SetAnimationSpeed(value: number): void
	function AnimationSpeed(): number
	class Tween {
		/**
		 * A value that eases towards a target, applied at most once per frame. `apply` runs with
		 * `scope` active, so a fill that reads the theme paints the surface the tween belongs to
		 * rather than whichever scope happened to be ticking. The default captures the scope of the
		 * render or effect that created the tween, which is right everywhere except a tween built at
		 * module scope for a surface outside the menu - name that scope explicitly.
		 *
		 * @example
		 * const reveal = new Tween(0, applyPanelReveal, EThemeScope.Panels)
		 */
		constructor(initial: number, apply: (value: number) => void, scope?: EThemeScope)
		public get Value(): number
		public get Running(): boolean
		public To(target: number, duration: number, ease?: Ease, done?: () => void): void
		public Set(value: number): void
		public Cancel(): void
		public Tick(now: number): void
	}
	function tickTweens(now: number): void
	interface PopInOptions {
		readonly scale?: number
		readonly dy?: number
		readonly duration?: number
	}
	function PopIn(target: {
		current: Nullable<HTMLElement>
	}, options?: PopInOptions): void
	function usePopIn(target: {
		current: Nullable<HTMLElement>
	}, options?: PopInOptions): void
}
