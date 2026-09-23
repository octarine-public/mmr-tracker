import "./translations"

import { GUIHelper } from "./gui"
import { MenuManager } from "./menu"
import { RatingStore } from "./storage"

new (class CMMRTracker {
	private oldRating = 0
	private readonly menu = new MenuManager()
	private readonly gui = new GUIHelper(this.menu)
	private readonly store = new RatingStore()
	private readonly loaded = this.store.Load().then(rating => {
		if (rating !== undefined) {
			this.gui.SetRating(rating, 0)
			this.oldRating = rating
		}
	})

	constructor() {
		EventsSDK.on("Draw", this.Draw.bind(this))
		Source2SDK.NativeEvents.on("RankData", this.RankData.bind(this))
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
			this.gui.Draw()
		} else {
			this.gui.Reset()
		}
	}

	public RankData(
		rankType: ERankType,
		rankValue: number,
		_rankData1: number,
		_rankData2: number,
		_rankData3: number,
		_rankData4: number
	) {
		if (rankType !== ERankType.Ranked && rankType !== ERankType.RankedGlicko) {
			return
		}
		void this.loaded.then(() => this.setRating(rankValue))
	}

	public MouseKeyUp(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyUp(key)
	}

	public MouseKeyDown(key: VMouseKeys) {
		if (!this.shouldInput(key)) {
			return true
		}
		return this.gui.MouseKeyDown(key)
	}

	private setRating(rating: number) {
		if (this.oldRating === rating) {
			return
		}
		this.gui.SetRating(rating, this.oldRating)
		this.oldRating = rating
		this.store.Save(rating)
	}

	private shouldInput(key: VMouseKeys) {
		if (!this.State) {
			return false
		}
		if (key !== VMouseKeys.MK_LBUTTON && key !== VMouseKeys.MK_RBUTTON) {
			return false
		}
		return !this.InGameUIState
	}
})()
