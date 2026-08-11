// AUTO-GENERATED - do not edit.
/** A per-key cooldown timer driven by game time instead of the host clock. */
declare class GameSleeper extends Sleeper {
	protected get TickCount(): number
}
/** A single-slot cooldown timer driven by game time. */
declare class TickSleeper {
	public lastSleepTickCount: number
	/** True while the timer has not expired yet. */
	public get Sleeping(): boolean
	/** Milliseconds left before the timer expires, clamped at `0`. */
	public get RemainingSleepTime(): number
	/**
	 * Sleeps for `duration` milliseconds of game time.
	 * @example
	 * sleeper.Sleep(250)
	 */
	public Sleep(duration: number): void
	/** Wakes the timer immediately. */
	public ResetTimer(): void
}
