import createCleanWeek from './createCleanWeek';

const ical = require('ical');

export default function parseICS(icsText) {
	const week = createCleanWeek();
	const data = ical.parseICS(icsText);

	const monday = new Date();
	monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
	monday.setHours(0, 0, 0, 0);

	const sunday = new Date();
	sunday.setDate(monday.getDate() + 7);
	sunday.setHours(0, 0, 0, 0);

	for (let ev of Object.values(data)) {
		if (ev.type == 'VEVENT') {
			if (ev.start > monday && ev.start < sunday) {
				week[ev.start.getDay() - 1].subjects.push({
					name: ev.summary,
					link: '',
					pass: '',
					startTime: `${ev.start.getHours()}:${ev.start.getMinutes()}`,
					endTime: `${ev.end.getHours()}:${ev.end.getMinutes()}`,
					id: Math.random().toString(36).substr(2, 9),
				});
			}
		}
	}
	return week;
}
