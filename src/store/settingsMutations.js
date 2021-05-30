export default {
	SET_DARK_THEME(state, darkTheme) {
		state.settings.darkTheme = darkTheme;
	},
	SET_SETTINGS_OPEN(state, open) {
		state.settings.open = open;
	},
	SET_CLOSE_TAB(state, closeTab) {
		state.settings.closeTab = closeTab;
	},
	SET_CLOSE_TAB_AFTER(state, closeTabAfter) {
		state.settings.closeTabAfter = closeTabAfter;
	},
	SET_SYNC_SCHEDULE(state, syncSchedule) {
		state.settings.syncSchedule = syncSchedule;
	},
	SET_CENTURIA(state, centuria) {
		state.settings.centuria = centuria;
	},
	SET_SEMESTER(state, semester) {
		state.settings.semester = semester;
	},
	SET_LOGIN_STATE(state, loggedIn) {
		state.settings.loggedIn = loggedIn;
	},
	SET_AVATAR_URL(state, avatarURL) {
		state.settings.avatarURL = avatarURL;
	},
};
