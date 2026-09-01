// AUTO-GENERATED - do not edit.
declare class CSoundSDK {
	/**
	 * Plays a sound event by name.
	 *
	 * @param position where the sound is placed in the world; ignored by a game whose sound
	 * manager is the portable panorama one, which can only play the event in 2D
	 * @example
	 * SoundSDK.EmitStartSoundEvent("General.Ping")
	 * SoundSDK.EmitStartSoundEvent("Roshan.Attack", entity.Position, entity)
	 */
	public EmitStartSoundEvent(name: string, position?: Vector3, sourceEntity?: INativeEntity, guid?: number, seed?: number): void
	/**
	 * Stops the sound event started with that guid.
	 *
	 * @example
	 * SoundSDK.EmitStopSoundEvent(guid)
	 */
	public EmitStopSoundEvent(guid: number): void
	/**
	 * Stops every sound event of that name, optionally only the ones the entity emitted.
	 *
	 * @example
	 * SoundSDK.EmitStopSoundEventByName("Roshan.PreAttack", entity)
	 */
	public EmitStopSoundEventByName(name: string, sourceEntity?: INativeEntity): void
}
declare const SoundSDK: CSoundSDK
