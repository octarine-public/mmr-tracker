interface EventsMap {
	Draw: []
	PreDraw: []
	PreDataUpdate: []
	PostDataUpdate: [dt: number]
	GameStarted: []
	GameEnded: []
	ServerInfo: [map: RecursiveProtobuf]
	ServerTick: [
		tick: number,
		hostComputationTime: number,
		hostFrameTimeStdDeviation: number,
		hostComputationTimeStdDeviation: number,
		legacyHostLoss: number,
		hostUnfilteredFrameTime: number,
		hltvReplayFlags: number,
		expectedLongTick: number,
		expectedLongTickReason: string,
		hostFrameDroppedPctX10: number,
		hostFrameIrregularArrivalPctX10: number
	]
	InputCaptured: [isCaptured: boolean]
	LocalTeamChanged: []
	MapDataLoaded: []
	WindowSizeChanged: []
	RemoveAllStringTables: []
	UpdateStringTable: [name: string, update: Map<number, [string, ArrayBuffer]>]
	WorldLayerVisibilityChanged: [layerName: string, state: boolean]
	WorldLayersVisibilityChanged: []
	TaskCancelled: [handleID: bigint]
	TaskReleased: [handleID: bigint]
}
