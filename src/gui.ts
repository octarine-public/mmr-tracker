import {
	Color,
	GUIInfo,
	Input,
	Menu,
	Rectangle,
	RendererSDK,
	TextFlags,
	Vector2
} from "github.com/octarine-public/wrapper/index"

import { MMRChangedType } from "./enum"
import { MenuManager } from "./menu"

export class GUIHelper {
	private rating = -1
	private remainder = -1
	private dragging = false
	private mmrType = MMRChangedType.None

	private readonly vecSize = new Vector2()
	private readonly vecPosition = new Vector2()
	private readonly draggingOffset = new Vector2()

	// TODO: handle full position by text size end
	private readonly recIcon = new Rectangle()
	private readonly position = new Rectangle()
	private readonly basePath = "github.com/octarine-public/mmr-tracker/scripts_files/"
	private readonly header = this.basePath + "images/header.svg"

	private readonly stats = this.basePath + "images/stats.svg"
	private readonly up = this.basePath + "images/arrow-up.svg"
	private readonly down = this.basePath + "images/arrow-down.svg"

	public Draw(menu: MenuManager) {
		if (this.rating === -1 || !menu.IsToggled) {
			return
		}

		const vecPosition = this.UpdateScale(menu)
		const alpha = (Math.max(menu.Opacity.value, this.dragging ? 100 : 50) / 100) * 255

		// background
		RendererSDK.Image(
			this.header,
			this.position.pos1,
			-1,
			this.position.Size,
			Color.White.SetA(alpha)
		)

		this.DrawInformation(alpha)
		this.UpdatePosition(menu, vecPosition)
	}

	public SetRating(newValue: number, oldValue: number) {
		const rem = newValue - oldValue
		this.rating = newValue
		this.remainder = newValue === rem ? -1 : rem
		if (this.remainder === -1) {
			this.mmrType = MMRChangedType.None
			return
		}
		this.mmrType = newValue < oldValue ? MMRChangedType.Subtract : MMRChangedType.Add
	}

	public MouseKeyUp() {
		if (!this.dragging) {
			return true
		}
		this.dragging = false
		Menu.Base.SaveConfigASAP = true
		return false
	}

	public MouseKeyDown() {
		if (this.dragging) {
			return true
		}
		const pos = this.position
		const mouse = Input.CursorOnScreen
		if (!mouse.IsUnderRectangle(pos.x, pos.y, pos.Width, pos.Height)) {
			return true
		}
		this.dragging = true
		mouse.Subtract(pos.pos1).CopyTo(this.draggingOffset)
		return false
	}

	protected DrawInformation(alpha: number) {
		let iconPath = this.stats
		switch (this.mmrType) {
			case MMRChangedType.Add:
				iconPath = this.up
				break
			case MMRChangedType.Subtract:
				iconPath = this.down
				break
		}

		// left icon
		RendererSDK.Image(
			iconPath,
			this.recIcon.pos1,
			-1,
			this.recIcon.Size,
			Color.White.SetA(alpha)
		)

		const basePos = this.position.Clone()
		const flags = TextFlags.Center | TextFlags.Left

		const indentationX = 4
		const startPos = basePos.AddX((this.recIcon.Width + indentationX) * (88 / 64))

		const trackerName = Menu.Localization.Localize("Tracker")
		const textRating = `${trackerName}: ${this.rating}${this.remainder === -1 ? " MMR" : ""}`
		const trackerPos = RendererSDK.TextByFlags(
			textRating,
			startPos,
			Color.White.SetA(alpha),
			3,
			flags
		)

		if (this.remainder === -1) {
			return
		}

		let text = ""
		let color = Color.White
		switch (this.mmrType) {
			case MMRChangedType.Add:
				color = Color.Green
				text = `(+${this.remainder} MMR)`
				break
			case MMRChangedType.Subtract:
				color = Color.Red
				text = `(${this.remainder} MMR)`
				break
		}
		const position = startPos.Add(new Vector2(trackerPos.pos2.x + 1, -1))
		RendererSDK.TextByFlags(text, position, color.SetA(alpha), 3, flags)
	}

	protected UpdateScale(menu: MenuManager) {
		const panelSize = GUIInfo.ScaleVector(250, 35)
		this.vecSize.CopyFrom(panelSize)

		const menuPos = menu.Position
		const panelPosition = GUIInfo.ScaleVector(menuPos.X.value, menuPos.Y.value)
		this.vecPosition.CopyFrom(panelPosition)

		this.position.pos1.CopyFrom(panelPosition)
		this.position.pos2.CopyFrom(panelPosition.Add(panelSize))

		const iconSize = GUIInfo.ScaleVector(24, 24)
		this.recIcon.pos1.CopyFrom(panelPosition)
		this.recIcon.pos2.CopyFrom(panelPosition.Add(iconSize))

		this.recIcon.x += this.recIcon.Width / 4
		this.recIcon.y += this.recIcon.Height / 4

		return panelPosition
	}

	protected UpdatePosition(menu: MenuManager, position: Vector2) {
		if (!this.dragging) {
			// NOTE: update full panel if added new unit's or items
			this.updateMinMaxPanelPosition(menu, position)
			return
		}
		const wSize = RendererSDK.WindowSize
		const mousePos = Input.CursorOnScreen
		const toPosition = mousePos
			.SubtractForThis(this.draggingOffset)
			.Min(wSize.Subtract(this.position.Size))
			.Max(0)
			.CopyTo(position)
		this.saveNewPosition(menu, toPosition)
	}

	private updateMinMaxPanelPosition(menu: MenuManager, position: Vector2) {
		const wSize = RendererSDK.WindowSize
		const totalSize = this.position.Size
		const newPosition = position
			.Min(wSize.Subtract(totalSize))
			.Max(0)
			.CopyTo(position)
		this.saveNewPosition(menu, newPosition)
	}

	private saveNewPosition(menu: MenuManager, newPosition?: Vector2) {
		const position = newPosition ?? this.vecSize
		menu.Position.Vector = position
			.Clone()
			.DivideScalarX(GUIInfo.GetWidthScale())
			.DivideScalarY(GUIInfo.GetHeightScale())
			.RoundForThis(1)
	}
}
