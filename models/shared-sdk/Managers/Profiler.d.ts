// AUTO-GENERATED - do not edit.
/** Receives one exclusive synchronous profiling sample in milliseconds. */
type ProfileSink = (name: string, source: Nullable<string>, elapsedMs: number) => void
/** Installs the process-wide profiling sink; undefined disables measurement. */
/** Starts a synchronous profiling span and returns whether it must be ended. */
/** Ends a span and reports time excluding its already-profiled child spans. */
/** Pauses profiling so profiler maintenance is excluded from its current parent span. */
/** Resumes profiling after a matching pause. */
