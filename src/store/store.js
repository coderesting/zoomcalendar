import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import createCleanWeek from '../weekManipulation/createCleanWeek';
import mergeWeeks from '../weekManipulation/mergeWeeks';
import settingsMutations from './mutations/settingsMutations';
import weekMutations from './mutations/weekMutations';
import watchActions from './watchActions';
import settingsActions from './actions/settingsActions';
import weekActions from './actions/weekActions';

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
			showSaturday: false,
		},
	},
	mutations: {
		...settingsMutations,
		...weekMutations,
	},
	actions: {
		...settingsActions,
		...weekActions,
	},
	getters: {
		weekForExport(state) {
			return state.userWeek;
		},
		week(state) {
			let week = [...state.userWeek];
			if (state.settings.syncSchedule) {
				const { userWeek, scheduleWeek } = state;
				week = mergeWeeks(userWeek, scheduleWeek);
			}

			if (!state.settings.showSaturday) {
				for (const dayIdx in week) {
					if (
						week[dayIdx].name === 'Saturday' ||
						week[dayIdx].name === 'Samstag'
					) {
						week.splice(dayIdx, 1);
					}
				}
			}
			return week;
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
	for (const watchAction of watchActions) {
		store.watch(
			watchAction.target,
			(data) => watchAction.action(store, data),
			watchAction.options
		);
	}
	store.dispatch('checkLogin');
	return store;
}

export default inializeStore;
