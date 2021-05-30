import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createCleanWeek from '../weekManipulation/createCleanWeek';
import mergeWeeks from '../weekManipulation/mergeWeeks';
import settingsMutations from './settingsMutations';
import weekMutations from './weekMutations';
import actions from './actions';

const storeData = {
	state: {
		version: 1.0,
		userWeek: createCleanWeek(),
		scheduleWeek: createCleanWeek(),
		settings: {
			open: false,
			closeTabAfter: 7,
			closeTab: false,
			darkTheme: true,
			centuria: 'A19a',
			semester: 4,
			syncSchedule: false,
			loggedIn: false,
			avatarURL: null,
		},
	},
	mutations: {
		...settingsMutations,
		...weekMutations,
	},
	actions,
	getters: {
		weekForExport(state) {
			return state.userWeek;
		},
		week(state) {
			if (!state.settings.syncSchedule) return state.userWeek;
			const { userWeek, scheduleWeek } = state;
			return mergeWeeks(userWeek, scheduleWeek);
		},
	},
};

function inializeStore() {
	const vuexLocal = new VuexPersistence({
		storage: window.localStorage,
		reducer: (state) => {
			return {
				...state,
				settings: { ...state.settings, open: false },
			};
		},
	});
	const store = new Vuex.Store({ ...storeData, plugins: [vuexLocal.plugin] });
	store.watch(
		(state) => state.settings.darkTheme,
		(darkTheme) => {
			if (darkTheme) document.body.classList.add('dark');
			else document.body.classList.remove('dark');
		},
		{ immediate: true }
	);

	store.watch(
		(state) => state.settings.syncSchedule,
		(syncSchedule) => {
			if (syncSchedule) store.dispatch('syncSchedule');
		},
		{ immediate: true }
	);
	store.dispatch('checkLogin');
	return store;
}

export default inializeStore;
