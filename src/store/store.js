import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createCleanWeek from '../weekManipulation/createCleanWeek';
import mergeWeeks from '../weekManipulation/mergeWeeks';
import parseIcs from '../weekManipulation/parseICS';
import sanitizeWeek from '../weekManipulation/sanitizeWeek';
import settingsMutations from './settingsMutations';
import weekMutations from './weekMutations';

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
		},
	},
	mutations: {
		...settingsMutations,
		...weekMutations,
	},
	actions: {
		importWeek(store, week) {
			const sanitizedWeek = sanitizeWeek(week);
			store.commit('SET_USER_WEEK', sanitizedWeek);
		},

		async syncSchedule(store) {
			const { centuria, semester } = store.state.settings;
			try {
				const res = await fetch(
					`https://schedule-cleaner.herokuapp.com/cleaned-schedule/${centuria}-${semester}.ics`
				);
				if (!res.ok) throw 'URL not available';
				const buffer = await res.arrayBuffer();
				const text = new TextDecoder('iso-8859-1').decode(buffer);
				const week = parseIcs(text);
				const sanitizedWeek = sanitizeWeek(week);
				if (sanitizedWeek === null) throw 'Week not clean';
				store.commit('SET_SCHEDULE_WEEK', sanitizedWeek);
				Vue.notify({
					group: 'main',
					title: `Synced schedule ${centuria}-${semester}`,
					duration: 5000,
					type: 'ok',
				});
			} catch {
				Vue.notify({
					group: 'main',
					title: `Failed to sync schedule ${centuria}-${semester}`,
					duration: 5000,
					type: 'error',
				});
			}
		},
	},
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
	store.watch((state) => {
		if (state.settings.darkTheme) document.body.classList.add('dark');
		else document.body.classList.remove('dark');

		if (state.settings.syncSchedule) store.dispatch('syncSchedule');
	});
	return store;
}

export default inializeStore;
