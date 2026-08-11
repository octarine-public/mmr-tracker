// AUTO-GENERATED - do not edit.
declare let latestTickDelta: number
type NativeEntityChangeReader = (stream: ViewBinaryStream, entity: Nullable<INativeEntity>) => void
/**
 * Registers how to read the per-entity block octarine-core prepends to a packet-entities message.
 * Its fields are chosen per game, so the entity packet cannot be walked at all until the game
 * says how wide each record is - without a reader the block is left unparsed.
 * @example
 * SetNativeEntityChangeReader((stream, entity) =>
 *     entity?.ForwardNativeProperties(stream.ReadInt32())
 * )
 */
