// AUTO-GENERATED - do not edit.
type EventListener<M extends Record<keyof M, unknown[]>, K extends keyof M> = (...args: M[K]) => false | unknown
type StoredListener = (...args: never[]) => unknown
type StoredEntry = [StoredListener, number]
/**
 * Installs the sink every emitter reports slow listeners to. Without one no timing is taken at
 * all, so an SDK that does not care pays nothing. `registeredAt` is the stack frame of the
 * `on`/`after` call that registered the listener.
 * @example
 * SetListenerPerfReporter((line, took) => SendListenerPerf(line, took, GameState.RawGameTime))
 */
declare class EventEmitter<M extends Record<keyof M, unknown[]> = EventsMap> {
	protected readonly events: Map<string, StoredEntry[]>
	protected readonly eventsAfter: Map<string, StoredEntry[]>
	protected readonly listener2line: WeakMap<StoredListener, string>
	public on<K extends keyof M>(name: K, listener: EventListener<M, K>, priority?: number): EventEmitter<M>
	public after<K extends keyof M>(name: K, listener: EventListener<M, K>, priority?: number): EventEmitter<M>
	public once<K extends keyof M>(name: K, listener: EventListener<M, K>, priority?: number): EventEmitter<M>
	public removeListener<K extends keyof M>(name: K, listener: EventListener<M, K>): EventEmitter<M>
	public hasListeners(name: keyof M): boolean
	public emit<K extends keyof M>(name: K, cancellable?: boolean, ...args: M[K]): boolean
}
