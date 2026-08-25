// AUTO-GENERATED - do not edit.
declare class CEntityManager<T extends INativeEntity = INativeEntity> {
	public readonly INVALID_INDEX: number
	public readonly INVALID_HANDLE = 16777215
	public readonly INDEX_BITS = 14
	public readonly INDEX_MASK: number
	public readonly SERIAL_BITS = 17
	public readonly SERIAL_MASK: number
	public readonly AllEntities: T[]
	/**
	 * Resolves an entity handle (or raw index) to a live entity, or `undefined` when the handle
	 * is unset, a sentinel, or its serial no longer matches. Sentinels are rejected before the
	 * index mask is applied, since `INVALID_INDEX` would otherwise collapse to a real index.
	 * @example
	 * const target = EntityManager.EntityByIndex(handle)
	 */
	public EntityByIndex<E extends T>(handle: Nullable<number>): Nullable<E>
	public GetEntitiesByClass<E>(class_: Constructor<E>): E[]
}
