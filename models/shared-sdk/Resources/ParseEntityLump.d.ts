// AUTO-GENERATED - do not edit.
type EntityDataMapValue = string | bigint | number | boolean | Vector2 | Vector3 | Vector4 | QAngle | Color
declare class EntityDataMap {
	public get(key: string): Nullable<EntityDataMapValue>
	public set(key: number, value: EntityDataMapValue): void
	/**
	 * The value of `key` when it is a string, otherwise `undefined`.
	 * @example
	 * const model = entry.getString("model")
	 */
	public getString(key: string): Nullable<string>
	/**
	 * The value of `key` as a Vector3, decoding the `"x y z"` string form as well.
	 * @example
	 * const origin = entry.getVector3("origin")
	 */
	public getVector3(key: string): Nullable<Vector3>
	/**
	 * The value of `key` as a Vector2, dropping z from a Vector3 and decoding the string form.
	 * @example
	 * const size = entry.getVector2("size")
	 */
	public getVector2(key: string): Nullable<Vector2>
	/**
	 * The value of `key` as a QAngle. KV3 decodes every length-3 array as a Vector3, including angle
	 * fields, so a Vector3 is reinterpreted here as pitch/yaw/roll.
	 * @example
	 * const angles = entry.getQAngle("angles")
	 */
	public getQAngle(key: string): Nullable<QAngle>
}
declare const EntityDataLumps: Map<string, EntityDataMap[]>
