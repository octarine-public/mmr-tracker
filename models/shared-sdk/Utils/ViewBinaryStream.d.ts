// AUTO-GENERATED - do not edit.
/** Sequential binary reader/writer over a DataView, tracking a cursor (`pos`); most reads/writes advance it. */
declare class ViewBinaryStream {
	public pos: number
	/**
	 * @param view the backing DataView to read from / write to
	 * @param pos initial cursor offset within the view (default 0)
	 * @example
	 * const stream = new ViewBinaryStream(new DataView(buf))
	 */
	constructor(view: DataView, pos?: number)
	/**
	 * Bytes left between the cursor and the end of the view (never negative).
	 * @example
	 * while (stream.Remaining > 0) stream.ReadUint8()
	 */
	public get Remaining(): number
	/**
	 * Total byte length of the backing view.
	 * @example
	 * const total = stream.Size
	 */
	public get Size(): number
	/**
	 * Byte offset of the backing view within its underlying ArrayBuffer.
	 * @example
	 * const off = stream.Offset
	 */
	public get Offset(): number
	/**
	 * Moves the cursor by `s` bytes relative to its current position (may be negative). Mutates `pos`.
	 * @example
	 * stream.RelativeSeek(-2) // rewind 2 bytes
	 */
	public RelativeSeek(s: number): void
	/**
	 * Reads one unsigned byte and advances the cursor by 1.
	 * @example
	 * const b = stream.ReadUint8()
	 */
	public ReadUint8(): number
	/**
	 * Writes one unsigned byte and advances the cursor by 1.
	 * @example
	 * stream.WriteUint8(0xff)
	 */
	public WriteUint8(val: number): void
	/**
	 * Writes a color as 4 bytes (r, g, b, a), each clamped to 0..255.
	 * @example
	 * stream.WriteColor(new Color(255, 0, 0))
	 */
	public WriteColor(val: Color): void
	/**
	 * Reads one signed byte and advances the cursor by 1.
	 * @example
	 * const b = stream.ReadInt8()
	 */
	public ReadInt8(): number
	/**
	 * Writes one signed byte and advances the cursor by 1.
	 * @example
	 * stream.WriteInt8(-1)
	 */
	public WriteInt8(val: number): void
	/**
	 * Reads a LEB128 varint as a JS number. Precision is lost beyond 2^53; use {@link ReadVarUint} for full 64-bit values.
	 * @example
	 * const n = stream.ReadVarUintAsNumber()
	 */
	public ReadVarUintAsNumber(): number
	/**
	 * Writes a JS number as a LEB128 varint (one or more bytes).
	 * @example
	 * stream.WriteVarUintAsNumber(300)
	 */
	public WriteVarUintAsNumber(val: number): void
	/**
	 * Reads a LEB128 varint as a bigint, preserving full 64-bit precision.
	 * @example
	 * const n = stream.ReadVarUint() // 12345n
	 */
	public ReadVarUint(): bigint
	/**
	 * Writes a bigint as a LEB128 varint (one or more bytes).
	 * @example
	 * stream.WriteVarUint(12345n)
	 */
	public WriteVarUint(val: bigint): void
	/**
	 * Reads an unsigned 16-bit integer (little-endian by default) and advances the cursor by 2.
	 * @example
	 * const n = stream.ReadUint16()
	 */
	public ReadUint16(littleEndian?: boolean): number
	/**
	 * Writes an unsigned 16-bit integer (little-endian by default) and advances the cursor by 2.
	 * @example
	 * stream.WriteUint16(1000)
	 */
	public WriteUint16(val: number, littleEndian?: boolean): void
	/**
	 * Reads a signed 16-bit integer (little-endian by default) and advances the cursor by 2.
	 * @example
	 * const n = stream.ReadInt16()
	 */
	public ReadInt16(littleEndian?: boolean): number
	/**
	 * Writes a signed 16-bit integer (little-endian by default) and advances the cursor by 2.
	 * @example
	 * stream.WriteInt16(-1000)
	 */
	public WriteInt16(val: number, littleEndian?: boolean): void
	/**
	 * Reads an unsigned 32-bit integer (little-endian by default) and advances the cursor by 4.
	 * @example
	 * const n = stream.ReadUint32()
	 */
	public ReadUint32(littleEndian?: boolean): number
	/**
	 * Writes an unsigned 32-bit integer (little-endian by default) and advances the cursor by 4.
	 * @example
	 * stream.WriteUint32(100000)
	 */
	public WriteUint32(val: number, littleEndian?: boolean): void
	/**
	 * Reads a signed 32-bit integer (little-endian by default) and advances the cursor by 4.
	 * @example
	 * const n = stream.ReadInt32()
	 */
	public ReadInt32(littleEndian?: boolean): number
	/**
	 * Writes a signed 32-bit integer (little-endian by default) and advances the cursor by 4.
	 * @example
	 * stream.WriteInt32(-100000)
	 */
	public WriteInt32(val: number, littleEndian?: boolean): void
	/**
	 * Reads an unsigned 64-bit integer as a bigint (little-endian by default) and advances the cursor by 8.
	 * @example
	 * const n = stream.ReadUint64()
	 */
	public ReadUint64(littleEndian?: boolean): bigint
	/**
	 * Writes an unsigned 64-bit integer from a bigint (little-endian by default) and advances the cursor by 8.
	 * @example
	 * stream.WriteUint64(12345678901234n)
	 */
	public WriteUint64(val: bigint, littleEndian?: boolean): void
	/**
	 * Reads a signed 64-bit integer as a bigint (little-endian by default) and advances the cursor by 8.
	 * @example
	 * const n = stream.ReadInt64()
	 */
	public ReadInt64(littleEndian?: boolean): bigint
	/**
	 * Writes a signed 64-bit integer from a bigint (little-endian by default) and advances the cursor by 8.
	 * @example
	 * stream.WriteInt64(-12345678901234n)
	 */
	public WriteInt64(val: bigint, littleEndian?: boolean): void
	/**
	 * Reads a 32-bit float (little-endian by default) and advances the cursor by 4.
	 * @example
	 * const f = stream.ReadFloat32()
	 */
	public ReadFloat32(littleEndian?: boolean): number
	/**
	 * Writes a 32-bit float (little-endian by default) and advances the cursor by 4.
	 * @example
	 * stream.WriteFloat32(1.5)
	 */
	public WriteFloat32(val: number, littleEndian?: boolean): void
	/**
	 * Reads a 64-bit float (little-endian by default) and advances the cursor by 8.
	 * @example
	 * const d = stream.ReadFloat64()
	 */
	public ReadFloat64(littleEndian?: boolean): number
	/**
	 * Writes a 64-bit float (little-endian by default) and advances the cursor by 8.
	 * @example
	 * stream.WriteFloat64(1.5)
	 */
	public WriteFloat64(val: number, littleEndian?: boolean): void
	/**
	 * Reads one byte and returns true if it is non-zero.
	 * @example
	 * const flag = stream.ReadBoolean()
	 */
	public ReadBoolean(): boolean
	/**
	 * Writes a boolean as a single byte (1 or 0).
	 * @example
	 * stream.WriteBoolean(true)
	 */
	public WriteBoolean(val: boolean): void
	/**
	 * Copies `output.byteLength` bytes from the cursor into `output`, advancing the cursor by that many bytes.
	 * @example
	 * const buf = new Uint8Array(16)
	 * stream.ReadSliceTo(buf)
	 */
	public ReadSliceTo(output: Uint8Array): void
	/**
	 * Reads `size` bytes into a newly-allocated Uint8Array (copied), advancing the cursor.
	 * @example
	 * const bytes = stream.ReadSlice(4)
	 */
	public ReadSlice(size: number): Uint8Array
	/**
	 * Returns a Uint8Array view of `size` bytes sharing the backing buffer (no copy), advancing the cursor. Writes to it mutate the source.
	 * @example
	 * const view = stream.ReadSliceNoCopy(4)
	 */
	public ReadSliceNoCopy(size: number): Uint8Array
	/**
	 * Decodes a single UTF-8 code point (1–6 bytes) starting at the cursor, advancing past its bytes. `size` caps how many bytes may be consumed (defaults to all remaining).
	 * @example
	 * const ch = stream.ReadUtf8Char()
	 */
	public ReadUtf8Char(size?: number): string
	/**
	 * Reads exactly `size` bytes and decodes them as a UTF-8 string, advancing the cursor by `size`.
	 * @example
	 * const s = stream.ReadUtf8String(len)
	 */
	public ReadUtf8String(size: number): string
	/**
	 * Reads bytes as Latin-1 characters until a NUL byte or end of stream; the NUL is consumed but not included.
	 * @example
	 * const s = stream.ReadNullTerminatedString()
	 */
	public ReadNullTerminatedString(): string
	/**
	 * Reads bytes up to a NUL and decodes them as UTF-8; the terminating NUL is consumed but not included.
	 * @example
	 * const s = stream.ReadNullTerminatedUtf8String()
	 */
	public ReadNullTerminatedUtf8String(): string
	/**
	 * Reads 16-bit code units until a zero unit or end of stream, decoding as UTF-16; the terminator is consumed but not included.
	 * @example
	 * const s = stream.ReadNullTerminatedUtf16String()
	 */
	public ReadNullTerminatedUtf16String(): string
	/**
	 * Reads a uint32 offset (relative to its own position) then the NUL-terminated UTF-8 string it
	 * points to; the cursor is restored to just after the offset. A zero offset yields "".
	 * @example
	 * const name = stream.ReadOffsetString()
	 */
	public ReadOffsetString(): string
	/**
	 * Reads a varint length prefix followed by that many bytes decoded as UTF-8.
	 * @example
	 * const s = stream.ReadVarString()
	 */
	public ReadVarString(): string
	/**
	 * True when the cursor has reached (or passed) the end of the view.
	 * @example
	 * while (!stream.Empty()) stream.ReadUint8()
	 */
	public Empty(): boolean
	/**
	 * Returns a new stream over the next `size` bytes (sharing the buffer, cursor at 0) and advances this stream past them.
	 * @example
	 * const sub = stream.CreateNestedStream(len)
	 */
	public CreateNestedStream(size: number): ViewBinaryStream
}
