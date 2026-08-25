// AUTO-GENERATED - do not edit.
declare abstract class Notification {
	public readonly UniqueKey: any
	public Cover: BackgroundCover
	public StopDisplayTime: number
	public StartDisplayTime: number
	constructor(options?: {
		timeToShow?: number
		playSoundName?: string
		uniqueKey?: any
		position?: Vector3
		sourceEntity?: Entity
	})
	public get IsExpired(): boolean
	public get BackgroundCover(): string
	/**
	 * @returns number min 0, max 255
	 * @example Color.White.SetA(this.Opacity)
	 */
	protected get Opacity(): number
	/**
	 * @description permission to click on the notification message, return true if the notification can be clicked else false
	 */
	public abstract OnClick(): boolean
	public abstract Draw(position: Rectangle): void
	/**
	 * don't use method. Please, use global method Notificator.Push(new yourClassName())
	 */
	public PushTime(): void
	public PlaySound(): void
}
