declare interface RmlStyleDeclaration {
	[property: string]: string | undefined
}

declare interface RmlAttributes {
	[name: string]: string | number | boolean | undefined
}

declare interface RmlChildNodes {
	readonly length: number
	readonly [index: number]: HTMLElement
}

declare interface RmlEventData {
	readonly [name: string]: any
	readonly screenX?: number
	readonly screenY?: number
	readonly button?: number
	readonly key?: string
	readonly location?: number
	readonly ctrlKey?: boolean
	readonly shiftKey?: boolean
	readonly altKey?: boolean
	readonly metaKey?: boolean
	readonly text?: string
	readonly value?: string
}

declare class Event {
	public readonly data: RmlEventData
	public readonly isTrusted: boolean
	public readonly type: string
	public readonly cancelable: boolean
	public readonly timeStamp: number
	public readonly target: HTMLElement
	public readonly currentTarget: HTMLElement
	public readonly bubbles: boolean
	public stopPropagation(): void
	public stopImmediatePropagation(): void
	public preventDefault(): void
}

declare class HTMLElement {
	public className: string
	public id: string
	public innerHTML: string
	public scrollLeft: number
	public scrollTop: number
	public readonly childNodes: RmlChildNodes
	public readonly clientHeight: number
	public readonly clientLeft: number
	public readonly clientTop: number
	public readonly clientWidth: number
	public readonly offsetLeft: number
	public readonly offsetTop: number
	public readonly firstChild: Nullable<HTMLElement>
	public readonly lastChild: Nullable<HTMLElement>
	public readonly nextSibling: Nullable<HTMLElement>
	public readonly previousSibling: Nullable<HTMLElement>
	public readonly offsetParent: Nullable<HTMLElement>
	public readonly ownerDocument: Nullable<HTMLDocument>
	public readonly parentNode: Nullable<HTMLElement>
	public readonly scrollHeight: number
	public readonly scrollWidth: number
	public readonly tagName: string
	public readonly style: RmlStyleDeclaration
	public readonly attributes: RmlAttributes
	public readonly width: number
	public readonly height: number
	public addEventListener(
		name: string,
		callback: (e: Event) => void,
		useCapture?: boolean
	): void
	public removeEventListener(
		name: string,
		callback: (e: Event) => void,
		useCapture?: boolean
	): void
	public dispatchEvent(name: string, params: Record<string, any>): void
	public appendChild(child: HTMLElement): void
	public insertBefore(child: HTMLElement, reference: Nullable<HTMLElement>): void
	public replaceChild(newChild: HTMLElement, oldChild: HTMLElement): void
	public removeChild(child: HTMLElement): void
	public blur(): void
	public click(): void
	public focus(): void
	public closest(selectors: string): Nullable<HTMLElement>
	public getAttribute(name: string): any
	public getElementById(id: string): Nullable<HTMLElement>
	public getElementsByTagName(tagName: string): HTMLElement[]
	public getElementsByClassName(className: string): HTMLElement[]
	public hasAttribute(name: string): boolean
	public removeAttribute(name: string): void
	public setAttribute(name: string, value: string | number | boolean): void
	public hasChildNodes(): boolean
	public querySelector(selector: string): Nullable<HTMLElement>
	public querySelectorAll(selector: string): HTMLElement[]
	public scrollIntoView(alignWithTop: boolean): void
	public destroy(): void
}

declare class HTMLDocument extends HTMLElement {
	public createElement(tagName: "img"): HTMLElementImage
	public createElement(tagName: "input"): HTMLElementFormControlInput
	public createElement(tagName: "#text"): HTMLElementText
	public createElement(tagName: string): HTMLElement
	public createTextNode(text: string): HTMLElementText
	public setStyleSheet(source: string): void
}

declare class HTMLElementImage extends HTMLElement {
	public src: string
	public width: number
	public height: number
}

declare class HTMLElementText extends HTMLElement {
	public text: string
	public setText(text: string): void
	public clearLines(): void
	public suppressAutoLayout(): void
}

declare class HTMLElementForm extends HTMLElement {
	public submit(name?: string, submitValue?: string): void
}

declare class HTMLElementFormControl extends HTMLElement {
	public name: string
	public readonly isSubmitted: boolean
	public isDisabled: boolean
}

declare class HTMLElementFormControlInput extends HTMLElementFormControl {
	/** Selects all text; text and password inputs only. */
	public select(): void
}

declare class HTMLElementFormControlSelect extends HTMLElementFormControl {
	public selection: number
	public getOption(index: number): Nullable<HTMLElement>
	public getNumOptions(): number
	public add(option: HTMLElement, before?: number): void
	public remove(index: number): void
	public removeAll(): void
}

declare class HTMLElementFormControlTextArea extends HTMLElementFormControl {
	public numColumns: number
	public numRows: number
	public maxLength: number
	public wordWrap: boolean
}

declare var document: HTMLDocument

declare function SetRMLBackdropCapture(enabled: boolean): void
declare function SetRMLBackdropFullCapture(enabled: boolean): void

/**
 * Playback control for a clip loaded through `<img src="…mp4">` or `.gif`. RmlUi caches one
 * texture per source path, so the resolved path identifies the clip, and two elements showing the
 * same file share a decoder and therefore share playback.
 */
declare function SetRMLVideoPlaying(source: string, playing: boolean): void

/** Seeks to a fraction of the clip, clamped to 0…1. */
declare function SeekRMLVideo(source: string, fraction: number): void

/** Progress as a fraction, negative while the clip has no duration or is not loaded. */
declare function GetRMLVideoProgress(source: string): number

/** Going off screen resets a clip to playing, so this has to be read back rather than assumed. */
declare function IsRMLVideoPlaying(source: string): boolean

/**
 * Analytic rounded clip for the glass composite (window-space px; w/h <= 0
 * disables): the final backdrop composite is multiplied by rounded-rect coverage
 * in-shader instead of being cut by the 1x-rasterized stencil, keeping the glass
 * edge smooth. Also the capability marker for the SDF shader decorators.
 */
declare function SetRMLAnalyticClip(
	x: number,
	y: number,
	w: number,
	h: number,
	radius: number
): void

/**
 * Menu scale multiplier folded into the native dp ratio, so dp layout and fonts
 * rasterize at the effective size instead of being resampled by a transform.
 * Also the capability marker for native-scaled layout: without it MenuScale() is 1.
 */
declare function SetRMLDpScale(scale: number): void
