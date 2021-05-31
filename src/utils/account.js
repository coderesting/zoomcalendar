import validate from '../utils/validate';
import sanitizeWeek from '../weekManipulation/sanitizeWeek';

export async function getAccountWeek() {
	const res = await fetch('https://zoom.icetoast.cloud/api/meeting', {
		credentials: 'include',
	});
	if (!res.ok) throw res.statusText;
	const accountWeek = await res.json();
	const transformedAccountWeek = convertAccountToLocalWeek(accountWeek);
	const sanitizedAccountWeek = sanitizeWeek(transformedAccountWeek);
	if (!sanitizedAccountWeek) throw 'week not clean';
	return sanitizedAccountWeek;
}

export async function setAccountWeek(week) {
	await flushAccountWeek();
	const accountWeek = convertLocalToAccountWeek(week);
	if (accountWeek.length == 0) return;
	const res = await fetch('https://zoom.icetoast.cloud/api/meeting', {
		credentials: 'include',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(accountWeek),
	});
	if (!res.ok) throw res.statusText;
}

export async function flushAccountWeek() {
	try {
		const res = await fetch(
			'https://zoom.icetoast.cloud/api/meeting/flushSchedule',
			{
				credentials: 'include',
				method: 'DELETE',
			}
		);
		if (!res.ok) throw res.statusText;
	} catch (e) {
		console.warn("couldn't flush account week. Propably empty");
	}
}

export function convertAccountToLocalWeek(serverWeek) {
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

export function convertLocalToAccountWeek(userWeek) {
	const serverWeek = [];
	for (const [dayIdx, day] of userWeek.entries()) {
		for (const subject of day.subjects) {
			if (
				validate.subjectName(subject.name) &&
				validate.subjectLink(subject.link)
			) {
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
