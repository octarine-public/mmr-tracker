// AUTO-GENERATED - do not edit.
declare class CSoundSDK {
	public EmitStartSoundEvent(name: string, position?: Vector3, sourceEntity?: Entity, guid?: number, seed?: number): void
	public EmitStopSoundEvent(guid: number): void
	public EmitStopSoundEventByName(name: string, sourceEntity?: Entity): void
}
declare const SoundSDK: CSoundSDK
