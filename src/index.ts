import "./translations"

import {
	DOTAGameUIState,
	Events,
	EventsSDK,
	GameState,
	InputEventSDK,
	VMouseKeys
} from "github.com/octarine-public/wrapper/index"

import { GUIHelper } from "./gui"
import { MenuManager } from "./menu"

const bootstrap = new (class CMMRTraker {
	private oldRating = 0
	private readonly gui = new GUIHelper()
	private readonly menu = new MenuManager()

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

	public RankData(newValue: number) {
		if (this.oldRating !== newValue) {
			const oldValue = this.oldRating
			this.gui.SetRating(newValue, oldValue)
			this.oldRating = newValue
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

EventsSDK.on("Draw", () => bootstrap.Draw())

Events.on("RankData", (_, value) => bootstrap.RankData(value))

InputEventSDK.on("MouseKeyUp", key => bootstrap.MouseKeyUp(key))

InputEventSDK.on("MouseKeyDown", key => bootstrap.MouseKeyDown(key))
