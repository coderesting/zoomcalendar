export function convertServerToUserWeek(serverWeek) {
	for (const day of serverWeek) {
		day.subjects = day.meetings;
		delete day.meetings;
		for (const subject of day.subjects) {
			subject.id = subject._id;
			delete subject._id;

			subject.pass = subject.password || '';
			delete subject.password;

			if (!subject.startTime) subject.startTime = '';
			if (!subject.endTime) subject.endTime = '';
		}
	}
	return serverWeek;
}

export function convertUserToServerWeek(userWeek) {
	const serverWeek = [];
	for (const [dayIdx, day] of userWeek.entries()) {
		for (const subject of day.subjects) {
			serverWeek.push({
				day: convertWeekdayNames(dayIdx),
				link: subject.link,
				name: subject.name,
				password: subject.pass,
				startTime: subject.startTime,
				endTime: subject.endTime,
			});
		}
	}
	return serverWeek;
}

const weekDays = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

function convertWeekdayNames(idx) {
	if (idx >= 0 && idx <= 5) return weekDays[idx];
	else return weekDays[5];
}
