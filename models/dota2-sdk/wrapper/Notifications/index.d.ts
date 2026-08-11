// AUTO-GENERATED - do not edit.
declare class CNotificationsSDK {
	public size: number
	public yOffset: number
	public limit: number
	public debug: boolean
	public backgroundCover: BackgroundCover
	/**
	 * @param notification abstract class
	 * @param uniqCheck check on unique key
	 * @description add in Queue notification
	 * @example
	 *
	 * class TestNotification extends Notification {
	 *
	 *   constructor(...) {
	 *     super(...)
	 *   }
	 *
	 *   public OnClick(): boolean {
	 *      // some code...
	 *   }
	 *
	 *   public Draw(position: Rectangle): void {
	 *      // some code...
	 *   }
	 *
	 * }
	 *
	 * const TestNotification = new TestNotification(...)
	 *
	 * EventsSDK.on("GameStarted", () => {
	 *   NotificationsSDK.Push(TestNotification)
	 * })
	 *
	 */
	public Push(notification: Notification, uniqCheck?: boolean, backgroundCover?: BackgroundCover): void
}
declare const NotificationsSDK: CNotificationsSDK
