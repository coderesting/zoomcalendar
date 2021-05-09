import { TIME_REGEX } from '../store/validate';

export default function parseTime(time) {
	if (time == null) return null;

	const insertMatch = time.match(TIME_REGEX);
	if (insertMatch === null || insertMatch.length !== 3) return null;

	return {
		hours: parseInt(insertMatch[1]),
		minutes: parseInt(insertMatch[2]),
	};
}
