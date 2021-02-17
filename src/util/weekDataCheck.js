export default function(weekText) {
	let week;
	try {
		week = JSON.parse(weekText);
	} catch {
		return null;
	}
	if (!(week instanceof Array)) return null;

	for (let day of week) {
		if (typeof day.name != 'string' || !(day.subjects instanceof Array))
			return null;

		for (let subject of day.subjects) {
			if (
				typeof subject.name != 'string' ||
				typeof subject.link != 'string' ||
				typeof subject.pass != 'string'
			)
				return null;
		}
	}

	return week;
}
