// AUTO-GENERATED - do not edit.
/**
 * Registers a rewrite applied to every serializer symbol before it is indexed. Dota ships its
 * class symbols without the leading `C`, so the names its wrapper registers would never match.
 * @example
 * SetEntitySymbolMapper(symbol => (symbol.startsWith("DOTA") ? `C${symbol}` : symbol))
 */
