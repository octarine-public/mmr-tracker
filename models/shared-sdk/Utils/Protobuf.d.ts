// AUTO-GENERATED - do not edit.
declare const enum ProtoType {
	TYPE_DOUBLE = 1,
	TYPE_FLOAT = 2,
	TYPE_INT64 = 3,
	TYPE_UINT64 = 4,
	TYPE_INT32 = 5,
	TYPE_FIXED64 = 6,
	TYPE_FIXED32 = 7,
	TYPE_BOOL = 8,
	TYPE_STRING = 9,
	TYPE_GROUP = 10,
	TYPE_MESSAGE = 11,
	TYPE_BYTES = 12,
	TYPE_UINT32 = 13,
	TYPE_ENUM = 14,
	TYPE_SFIXED32 = 15,
	TYPE_SFIXED64 = 16,
	TYPE_SINT32 = 17,
	TYPE_SINT64 = 18
}
declare const enum ProtoFieldType {
	OPTIONAL = 0,
	REPEATED = 1,
	PACKED = 2,
	REQUIRED = 3
}
type ProtoFieldDescription = {
	name: string
	type: ProtoType
	protoType: ProtoFieldType
	protoDesc?: ProtoDescription
	defaultValue?: boolean | number | bigint
}
type ProtoDescription = Map<number, ProtoFieldDescription>
declare const ProtoCache: Map<string, [ProtoType, Map<string, number> | ProtoDescription]>
