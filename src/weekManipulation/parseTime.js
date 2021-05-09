const TIME_Regex = /([0-2]?[0-9]):([0-5]?[0-9])/;

export default function parseTime(time) {
	if (time == null) return null;

	const insertMatch = time.match(TIME_Regex);
	if (insertMatch === null || insertMatch.length !== 3) return null;

	return {
		hours: parseInt(insertMatch[1]),
		minutes: parseInt(insertMatch[2]),
	};
}
