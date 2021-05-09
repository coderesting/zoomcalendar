export default {
	ADD_SUBJECT(state, dayIdx) {
		state.userWeek[dayIdx].subjects.push({
			name: '',
			link: '',
			pass: '',
			startTime: '',
			endTime: '',
			id: Math.random().toString(36).substr(2, 9),
		});
	},
	EDIT_SUBJECT(
		state,
		{ dayIdx, subjectIdx, name, link, pass, startTime, endTime }
	) {
		state.userWeek[dayIdx].subjects[subjectIdx].name = name;
		state.userWeek[dayIdx].subjects[subjectIdx].link = link;
		state.userWeek[dayIdx].subjects[subjectIdx].pass = pass;
		state.userWeek[dayIdx].subjects[subjectIdx].startTime = startTime;
		state.userWeek[dayIdx].subjects[subjectIdx].endTime = endTime;
	},
	REMOVE_SUBJECT(state, { dayIdx, subjectIdx }) {
		state.userWeek[dayIdx].subjects.splice(subjectIdx, 1);
	},

	SET_DAY(state, { dayIdx, day }) {
		state.userWeek[dayIdx].subjects = day;
	},

	SET_USER_WEEK(state, week) {
		state.userWeek = week;
	},

	SET_SCHEDULE_WEEK(state, week) {
		state.scheduleWeek = week;
	},
};
