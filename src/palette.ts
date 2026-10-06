/**
 * The tracker's own colours, softer than the theme's: the theme's sub and faint are white held
 * back by alpha, which over the dark glass reads as white beside the numbers it should stand back
 * from, and its green, red and accent are cut harder than a card read at a glance wants.
 */
const Base = {
	title: new Color(232, 232, 238),
	muted: new Color(138, 138, 150),
	caption: new Color(111, 111, 123),
	faint: new Color(93, 93, 104),
	icon: new Color(167, 139, 250),
	gain: new Color(74, 222, 128),
	loss: new Color(248, 113, 113)
}

const Keys = Object.keys(Base) as (keyof typeof Base)[]

/** {@link Base} relit for the theme in use, so a light theme still reads them. */
export const Palette = { ...Base }

/** Relights the palette for the theme in use; once a frame, before anything is drawn with it. */
export function RefreshPalette(): void {
	const readable = MenuSDK.HudColors.readable
	for (const key of Keys) {
		Palette[key] = readable(Base[key])
	}
}

/** Green for a gain, red for a loss, muted for nothing either way. */
export function SignColor(sign: number): Color {
	return sign > 0 ? Palette.gain : sign < 0 ? Palette.loss : Palette.muted
}
