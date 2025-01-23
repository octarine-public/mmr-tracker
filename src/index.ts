import "./translations"

import {
	DOTAGameUIState,
	ERankType,
	Events,
	EventsSDK,
	GameState,
	InputEventSDK,
	VMouseKeys
} from "github.com/octarine-public/wrapper/index"

import { GUIHelper } from "./gui"
import { MenuManager } from "./menu"

new (class CMMRTraker {
	private oldRating = 0
	private readonly gui = new GUIHelper()
	private readonly menu = new MenuManager()

	constructor() {
		EventsSDK.on("Draw", this.Draw.bind(this))
		Events.on("RankData", this.RankData.bind(this))
		InputEventSDK.on("MouseKeyUp", this.MouseKeyUp.bind(this))
		InputEventSDK.on("MouseKeyDown", this.MouseKeyDown.bind(this))
	}

	protected get State() {
		return this.menu.State.value
	}

	protected get InGameUIState() {
		return GameState.UIState === DOTAGameUIState.DOTA_GAME_UI_DOTA_INGAME
	}

	public Draw() {
		if (this.State && !this.InGameUIState) {
			this.gui.Draw(this.menu)
		}
	}

	public RankData(
		_rankType: ERankType,
		rankValue: number,
		_rankData1: number,
		_rankData2: number,
		_rankData3: number,
		_rankData4: number
	) {
		if (this.oldRating !== rankValue) {
			const oldValue = this.oldRating
			this.gui.SetRating(rankValue, oldValue)
			this.oldRating = rankValue
		}
	}

	public MouseKeyUp(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyUp()
	}

	public MouseKeyDown(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyDown()
	}

	private shouldInput(key: VMouseKeys) {
		if (!this.State || key !== VMouseKeys.MK_LBUTTON) {
			return false
		}
		return !this.InGameUIState
	}
})()
