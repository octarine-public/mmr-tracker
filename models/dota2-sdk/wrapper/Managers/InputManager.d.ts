// AUTO-GENERATED - do not edit.
/**
 * Keyboard and mouse events. Same emitter as {@link EventsSDK}; the name is kept because every
 * consumer script reaches input that way.
 * @example
 * InputEventSDK.on("KeyDown", key => key !== VKeys.F1)
 */
declare const InputEventSDK: EventEmitter<EventsMap>
/**
 * The shared input manager, filled in with what Dota reports. The same instance the shared package
 * publishes, so both names lead to one object.
 */
declare const InputManager: CInputManager & {
	IsShopOpen: boolean
	IsScoreboardOpen: boolean
	SelectedEntities: Unit[]
	QueryUnit: Nullable<Unit>
	SelectedUnit: Nullable<Unit>
}
/**
 * What Dota knows about the cursor on top of the shared input state: which panels cover it and
 * what it currently points at. Filled in every tick by the humanizer.
 */
interface CInputManager {
	IsShopOpen: boolean
	IsScoreboardOpen: boolean
	readonly SelectedEntities: Unit[]
	QueryUnit: Nullable<Unit>
	SelectedUnit: Nullable<Unit>
	CursorOnWorld: Vector3
}
