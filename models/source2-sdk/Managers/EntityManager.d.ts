// AUTO-GENERATED - do not edit.
declare class CEntityManager<T extends INativeEntity = INativeEntity> {
	public readonly INVALID_INDEX: number
	public readonly INVALID_HANDLE = 16777215
	public readonly INDEX_BITS = 14
	public readonly INDEX_MASK: number
	public readonly SERIAL_BITS = 17
	public readonly SERIAL_MASK: number
	public readonly AllEntities: T[]
	public EntityByIndex<E extends T>(handle: Nullable<number>): Nullable<E>
	public GetEntitiesByClass<E>(class_: Constructor<E>): E[]
}
