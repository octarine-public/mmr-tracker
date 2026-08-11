// AUTO-GENERATED - do not edit.
/**
 * The Dota view of the shared entity manager: the same instance, with its entities narrowed to the
 * game's `Entity` hierarchy.
 */
type IDotaEntityManager = Pick<CEntityManager, "INVALID_INDEX" | "INVALID_HANDLE" | "INDEX_BITS" | "INDEX_MASK" | "SERIAL_BITS" | "SERIAL_MASK"> & {
	readonly AllEntities: Entity[]
	EntityByIndex<E extends Entity>(handle: Nullable<number>): Nullable<E>
	GetEntitiesByClass<E>(class_: Constructor<E>): E[]
	GetConstructorByName<E extends Entity>(name: string): Nullable<Constructor<E>>
}
declare const EntityManager: IDotaEntityManager
