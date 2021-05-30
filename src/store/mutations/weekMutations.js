export default {
	ADD_SUBJECT(state, dayIdx) {
		const userWeek = [...state.userWeek];
		userWeek[dayIdx].subjects.push({
			name: '',
			link: '',
			pass: '',
			startTime: '',
			endTime: '',
			id: Math.random().toString(36).substr(2, 9),
		});
		state.userWeek = userWeek;
	},
	EDIT_SUBJECT(
		state,
		{ dayIdx, subjectIdx, name, link, pass, startTime, endTime }
	) {
		const userWeek = [...state.userWeek];
		userWeek[dayIdx].subjects[subjectIdx].name = name;
		userWeek[dayIdx].subjects[subjectIdx].link = link;
		userWeek[dayIdx].subjects[subjectIdx].pass = pass;
		userWeek[dayIdx].subjects[subjectIdx].startTime = startTime;
		userWeek[dayIdx].subjects[subjectIdx].endTime = endTime;
		state.userWeek = userWeek;
	},
	REMOVE_SUBJECT(state, { dayIdx, subjectIdx }) {
		const userWeek = [...state.userWeek];
		userWeek[dayIdx].subjects.splice(subjectIdx, 1);
		state.userWeek = userWeek;
	},

	SET_DAY(state, { dayIdx, day }) {
		const userWeek = [...state.userWeek];
		userWeek[dayIdx].subjects = day;
		state.userWeek = userWeek;
	},

	SET_USER_WEEK(state, week) {
		state.userWeek = week;
	},

	SET_SCHEDULE_WEEK(state, week) {
		state.scheduleWeek = week;
	},
};
