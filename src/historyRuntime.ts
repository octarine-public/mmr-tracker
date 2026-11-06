import { IGame } from "./history"
import { EHistoryShow } from "./menu"

/**
 * The half of the match history column that lives in the game's own Panorama JavaScript: it runs
 * in the layout context of the profile's match history page (`DOTAProfileHeroStatsPage`) and
 * writes, at the right of the result cell of each match the tracker saw, what the menu picks of
 * "+28 (6407 → 6435)": the rating the match moved and the rating before and after it. The cell's
 * text is never written to; the line is a label of its own inside the cell.
 *
 * A row of `RecentGamesTable` knows no match id, only when the match started, how long it lasted
 * and the hero: hero cell, result, a cell of date and time, duration, game type. A game that came
 * with its match ended at `at`, a few minutes after start + duration, and is put on the row that
 * ends closest before it. A game without its match is a change of rating seen on a later login,
 * and is put on a row only when one row alone ended between the game before it and its own.
 * The date is read in whatever order the client's language writes it; a day and month that can
 * be read either way give the row two ends, and only one of them can meet a game.
 * Only the tracked account's own history is filled in: another player's page is left as it is.
 */
export const HistoryRuntimeSource = String.raw`(function (payload) {
	var MINUTE = 60000
	var EARLY = 5 * MINUTE
	var LATE = 20 * MINUTE
	var page = $.GetContextPanel()
	var table = page.FindChildTraverse("RecentGamesTable")
	if (!table) return
	var rows = []
	for (var i = 0; i < table.GetChildCount(); i++) {
		var row = table.GetChild(i)
		row.SetAttributeString("mt", "1")
		var info = read(row)
		if (info !== null) rows.push(info)
	}
	var shown = !payload.dispose && ownPage()
	var games = shown ? payload.games : []
	var marks = shown ? assign(rows, games) : []
	for (var r = 0; r < rows.length; r++) render(rows[r], marks[r])

	function ownPage() {
		var header = page.FindChildTraverse("Header")
		var avatar = header ? header.FindChildTraverse("AvatarImage") : null
		return !!avatar && String(avatar.accountid) === String(payload.account)
	}
	function read(row) {
		if (row.GetChildCount() < 4) return null
		var cell = row.GetChild(1)
		var when = row.GetChild(2)
		var length = row.GetChild(3)
		if (cell.paneltype !== "Label" || length.paneltype !== "Label" || when.GetChildCount() < 2) return null
		var start = clock(when.GetChild(1).text)
		var duration = lasting(length.text)
		var days = dates(when.GetChild(0).text)
		var ends = []
		if (start !== null && duration !== null) {
			for (var i = 0; i < days.length; i++) {
				var day = days[i]
				ends.push(Date.UTC(day[0], day[1] - 1, day[2], start[0], start[1]) + payload.tz * MINUTE + duration)
			}
		}
		var icon = row.FindChildTraverse("HeroIcon")
		var hero = icon && icon.heroname ? "npc_dota_hero_" + icon.heroname : ""
		return { cell: cell, ends: ends, hero: hero }
	}
	function clock(text) {
		var match = /(\d{1,2}):(\d{2})/.exec(text)
		if (match === null) return null
		var hour = Number(match[1])
		var pm = /pm|下午|午後/i.test(text)
		if (pm || /am|上午|午前/i.test(text)) hour = (hour % 12) + (pm ? 12 : 0)
		return [hour, Number(match[2])]
	}
	function lasting(text) {
		var parts = text.match(/\d+/g)
		if (parts === null) return null
		var seconds = 0
		for (var i = 0; i < parts.length; i++) seconds = seconds * 60 + Number(parts[i])
		return seconds * 1000
	}
	function dates(text) {
		var parts = (text.match(/\d+/g) || []).map(Number)
		if (parts.length !== 3) return []
		if (parts[0] > 31) return valid([[parts[0], parts[1], parts[2]]])
		if (parts[2] < 100) parts[2] += 2000
		return valid([[parts[2], parts[1], parts[0]], [parts[2], parts[0], parts[1]]])
	}
	function valid(days) {
		var out = []
		for (var i = 0; i < days.length; i++) {
			var day = days[i]
			var same = out.length !== 0 && out[0][1] === day[1] && out[0][2] === day[2]
			if (!same && day[1] >= 1 && day[1] <= 12 && day[2] >= 1 && day[2] <= 31) out.push(day)
		}
		return out
	}
	function assign(rows, games) {
		var marks = []
		var taken = []
		var pairs = []
		for (var g = 0; g < games.length; g++) {
			var game = games[g]
			if (game.match === undefined) continue
			for (var r = 0; r < rows.length; r++) {
				if (rows[r].hero !== "" && game.hero !== undefined && rows[r].hero !== game.hero) continue
				var gap = closest(rows[r], game.at)
				if (gap !== null) pairs.push([Math.abs(gap), r, g])
			}
		}
		pairs.sort(function (a, b) { return a[0] - b[0] })
		for (var p = 0; p < pairs.length; p++) {
			var pair = pairs[p]
			if (marks[pair[1]] === undefined && !taken[pair[2]]) {
				marks[pair[1]] = games[pair[2]]
				taken[pair[2]] = true
			}
		}
		var oldest = Infinity
		for (var o = 0; o < rows.length; o++) {
			for (var e = 0; e < rows[o].ends.length; e++) oldest = Math.min(oldest, rows[o].ends[e])
		}
		for (var n = 0; n + 1 < games.length; n++) {
			if (taken[n] || games[n].match !== undefined) continue
			var after = games[n + 1].at
			if (oldest > after) continue
			var only = -1
			for (var k = 0; k < rows.length; k++) {
				if (!endsWithin(rows[k], after, games[n].at)) continue
				only = only === -1 ? k : -2
			}
			if (only >= 0 && marks[only] === undefined) {
				marks[only] = games[n]
				taken[n] = true
			}
		}
		return marks
	}
	function closest(row, at) {
		var best = null
		for (var i = 0; i < row.ends.length; i++) {
			var gap = at - row.ends[i]
			if (gap >= -EARLY && gap <= LATE && (best === null || Math.abs(gap) < Math.abs(best))) best = gap
		}
		return best
	}
	function endsWithin(row, after, until) {
		for (var i = 0; i < row.ends.length; i++) {
			if (row.ends[i] > after && row.ends[i] <= until) return true
		}
		return false
	}
	function render(row, game) {
		var label = row.cell.FindChild("MTRating")
		if (game === undefined) {
			if (label) label.DeleteAsync(0)
			return
		}
		if (!label) {
			label = $.CreatePanel("Label", row.cell, "MTRating")
			label.html = true
			label.hittest = false
		}
		var style = label.style
		style.width = "fit-children"
		style.horizontalAlign = "right"
		style.verticalAlign = "center"
		style.marginRight = "16px"
		style.fontSize = "15px"
		var sign = game.delta > 0 ? "+" : game.delta < 0 ? "−" : ""
		var tone = game.delta > 0 ? payload.colors.gain : game.delta < 0 ? payload.colors.loss : payload.colors.muted
		var change = '<font color="' + tone + '">' + sign + Math.abs(game.delta) + "</font>"
		var rating = (game.rating - game.delta) + " → " + game.rating
		var muted = '<font color="' + payload.colors.muted + '">'
		label.text = payload.show === 1 ? change
			: payload.show === 3 ? muted + rating + "</font>"
			: change + " " + muted + "(" + rating + ")</font>"
	}
})`

/** What one call of the history runtime is handed. */
export interface IHistoryTick {
	readonly account: number
	/** Newest first, as the tracker keeps them. */
	readonly games: readonly IGame[]
	/** The client's `Date.getTimezoneOffset()`: the table writes local time. */
	readonly tz: number
	readonly colors: {
		readonly gain: string
		readonly loss: string
		readonly muted: string
	}
	/** What each game shows: its change, its change and the rating around it, or that rating alone. */
	readonly show: EHistoryShow
	readonly dispose?: boolean
}
