import Vue from 'vue';
import parseIcs from '../weekManipulation/parseICS';
import sanitizeWeek from '../weekManipulation/sanitizeWeek';

export default {
	importWeek(store, week) {
		const sanitizedWeek = sanitizeWeek(week);
		store.commit('SET_USER_WEEK', sanitizedWeek);
	},

	async syncSchedule(store) {
		const { centuria, semester } = store.state.settings;
		try {
			const res = await fetch(
				`https://schedule-cleaner.herokuapp.com/cleaned-schedule/${centuria}_${semester}.ics`
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
				duration: 3000,
				type: 'success',
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
};
