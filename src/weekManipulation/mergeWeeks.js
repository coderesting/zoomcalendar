import parseTime from './parseTime';

function findInsertIndex(subjects, hours, minutes) {
	for (let i = 0; i < subjects.length; i++) {
		const currentTime = parseTime(subjects[i].startTime);

		if (
			currentTime == null ||
			hours < currentTime.hours ||
			(hours === currentTime.hours && minutes < currentTime.minutes)
		) {
			return i;
		}
	}
	return subjects.length;
}

function insertSubject(week, dayIdx, subject) {
	const insertTime = parseTime(subject.startTime);
	let insertIndex = week[dayIdx].subjects.length;
	if (insertTime !== null && week[dayIdx].subjects.length !== 0) {
		insertIndex = findInsertIndex(
			week[dayIdx].subjects,
			insertTime.hours,
			insertTime.minutes
		);
	}
	week[dayIdx].subjects.splice(insertIndex, 0, subject);
}

export default function (userWeek, scheduleWeek) {
	// TODO clean this shit up
	const userSubjects = userWeek.flatMap((day, dayIdx) => {
		return day.subjects.map((subject) => {
			return { ...subject, dayIdx, used: false };
		});
	});
	const userSubjectNames = userSubjects.map((subject) => subject.name);

	scheduleWeek = scheduleWeek.map((day, dayIdx) => {
		return {
			name: (userWeek[dayIdx] || scheduleWeek[dayIdx]).name,
			subjects: day.subjects.map((subject) => {
				const idx = userSubjectNames.indexOf(subject.name);
				const userSubjectData = {};
				if (idx > -1) {
					userSubjects[idx].used = true;
					userSubjectData.link = userSubjects[idx].link;
					userSubjectData.pass = userSubjects[idx].pass;
				}

				return {
					...subject,
					...userSubjectData,
				};
			}),
		};
	});

	for (let userSubject of userSubjects.values()) {
		if (!userSubject.used && userSubject.name != '') {
			insertSubject(scheduleWeek, userSubject.dayIdx, userSubject);
		}
	}
	return scheduleWeek;
}
