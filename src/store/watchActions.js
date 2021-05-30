import createCleanWeek from '../weekManipulation/createCleanWeek';

export default [
	{
		target: (state) => state.settings.darkTheme,
		action: (store, darkTheme) => {
			if (darkTheme) document.body.classList.add('dark');
			else document.body.classList.remove('dark');
		},
		options: { immediate: true },
	},
	{
		target: (state) => state.settings.syncSchedule,
		action: (store, syncSchedule) => {
			if (syncSchedule) store.dispatch('syncSchedule');
		},
		options: { immediate: true },
	},
	{
		target: (state) => [state.userWeek, state.settings.loggedIn],
		action: (store, [week, loggedIn]) => {
			if (loggedIn) {
				store.dispatch('uploadWeek', week);
			}
		},
		options: {},
	},
	{
		target: (state) => state.settings.showSaturday,
		action: (store, showSaturday) => {
			if (showSaturday && store.state.userWeek.length <= 5) {
				const saturday = createCleanWeek()[5];
				store.commit('SET_USER_WEEK', [
					...store.state.userWeek,
					saturday,
				]);
			}
		},
		options: {},
	},
];
