// AUTO-GENERATED - do not edit.
/** Where a notification is delivered. */
declare const enum NotificationChannel {
	/** The card stack menu-sdk flies in at the screen edge. */
	Side = 0,
	/** One line in the game chat, tagged as Octarine's. */
	Chat = 1
}
interface INotificationOptions extends MenuSDK.INotificationOptions {
	/**
	 * Where this notification goes. Left out, it takes the channel picked under
	 * Settings → Notifications; a feature with a choice of its own passes the one chosen there.
	 */
	readonly channel?: NotificationChannel
}
declare class CNotificationsSDK {
	/**
	 * The channel a notification that names none of its own takes. Settings → Notifications
	 * drives it; a script does not write it.
	 */
	public DefaultChannel: NotificationChannel
	/**
	 * Shows a notification on its channel. On the side it is menu-sdk's card, and the id that
	 * comes back dismisses it through `MenuSDK.Notifications.Dismiss`. In the chat it is one
	 * line - `(Octarine): [portrait] title: message[badge][icon]` - with the title in the accent
	 * color and the game's own textures as inline icons, and there is nothing to return. The chat
	 * is only there in a match, so outside one the card is shown instead.
	 *
	 * @example
	 * NotificationsSDK.Show({
	 *     title: Menu.Localization.Localize(hero.Name),
	 *     message: Menu.Localization.Localize("Purchased an item"),
	 *     portrait: hero.TexturePath,
	 *     badge: item.TexturePath,
	 *     color: hero.Color
	 * })
	 */
	public Show(options: INotificationOptions): Nullable<MenuSDK.NotificationID>
	/**
	 * Prints one line in the game chat behind the Octarine tag. The text is the chat's own HTML:
	 * `<font color="#66FF99">`, `<b>`, and `<img class="ChatItemIcon MHObjectiveIcon" src="s2r://…">`
	 * for one of the game's textures. Text from elsewhere goes in through {@link EscapeChatText}.
	 * @example
	 * NotificationsSDK.Chat(`<font color="#66FF99">${NotificationsSDK.EscapeChatText(name)}</font> is back`)
	 */
	public Chat(html: string): void
	/** The text with every character the chat markup reads specially replaced by its entity. */
	public EscapeChatText(text: string): string
}
declare const NotificationsSDK: CNotificationsSDK
