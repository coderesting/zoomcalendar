import Vue from 'vue';
import parseIcs from '../../weekManipulation/parseICS';
import sanitizeWeek, { emptyWeek } from '../../weekManipulation/sanitizeWeek';
import { getAccountWeek, setAccountWeek } from '../../utils/account';

function notify(type, title) {
	Vue.notify({
		group: 'main',
		title,
		duration: 3000,
		type,
	});
}

export default {
	async uploadWeek(store, week) {
		try {
			await setAccountWeek(week);
		} catch (e) {
			console.error(e);
			notify('error', 'Failed to upload schedule to your account');
		}
	},
	async downloadWeek(store) {
		try {
			const accountWeek = await getAccountWeek();
			if (emptyWeek(accountWeek)) {
				store.dispatch('uploadWeek', store.state.userWeek);
			} else {
				store.dispatch('importWeek', accountWeek);
			}
		} catch (e) {
			console.error(e);
			notify('error', 'Failed to download schedule from your account');
		}
	},

	importWeek(store, week) {
		const sanitizedWeek = sanitizeWeek(week);
		if (sanitizedWeek) store.commit('SET_USER_WEEK', sanitizedWeek);
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
		} catch {
			notify(
				'error',
				`Failed to sort schedule for ${centuria}-${semester}`
			);
		}
	},
};
