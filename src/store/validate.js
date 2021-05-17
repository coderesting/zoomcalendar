const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const TIME_REGEX = /(^([0-2][0-9]):([0-5][0-9])$)/;
const CENTURIA_REGEX = /^[a-zA-Z][0-9]{2}[a-zA-Z]$/;
const SEMESTER_REGEX = /^[1-7]$/;

export default {
	LINK_REGEX,
	TIME_REGEX,
	exportName: function (exportName) {
		return /.+\.json/.test(exportName);
	},
	closeTab: function (closeTab) {
		return typeof closeTab === 'boolean';
	},
	closeTabAfter: function (closeTabAfter) {
		return parseFloat(closeTabAfter) >= 0;
	},
	darkTheme(darkTheme) {
		return typeof darkTheme === 'boolean';
	},
	syncSchedule(syncSchedule) {
		return typeof syncSchedule === 'boolean';
	},
	centuria: function (centuria) {
		return CENTURIA_REGEX.test(centuria);
	},
	semester: function (semester) {
		return SEMESTER_REGEX.test(semester);
	},

	subjectName(newName) {
		return newName.trim() !== '';
	},
	subjectLink(newLink) {
		return newLink?.match(LINK_REGEX);
	},
	subjectTime(newStartTime) {
		return newStartTime?.match(TIME_REGEX);
	},
};
