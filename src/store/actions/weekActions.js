import Vue from 'vue';
import parseIcs from '../../weekManipulation/parseICS';
import sanitizeWeek from '../../weekManipulation/sanitizeWeek';
import {
	convertServerToUserWeek,
	convertUserToServerWeek,
} from '../../weekManipulation/convertWeek';
import validate from '../../utils/validate';

function emptyWeek(week) {
	for (const day of week)
		for (const subject of day.subjects) if (subject) return false;
	return true;
}

function notify(type, title) {
	Vue.notify({
		group: 'main',
		title,
		duration: 3000,
		type,
	});
}

async function flushSchedule() {
	try {
		const res = await fetch(
			'https://zoom.icetoast.cloud/api/meeting/flushSchedule',
			{
				credentials: 'include',
				method: 'DELETE',
			}
		);
		if (!res.ok) throw res.statusText;
	} catch (e) {
		console.error(e);
	}
}

export default {
	async uploadWeek(store, week) {
		await flushSchedule();

		try {
			const serverWeek = convertUserToServerWeek(week);
			for (const subject of serverWeek) {
				if (
					validate.subjectName(subject.name) &&
					validate.subjectLink(subject.link)
				) {
					const res = await fetch(
						'https://zoom.icetoast.cloud/api/meeting',
						{
							credentials: 'include',
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(subject),
						}
					);
					if (!res.ok) throw res.statusText;
				}
			}
		} catch (e) {
			console.error(e);
			notify('error', 'Failed to upload schedule to your account');
		}
	},
	async downloadWeek(store) {
		try {
			const res = await fetch('https://zoom.icetoast.cloud/api/meeting', {
				credentials: 'include',
			});
			if (!res.ok) throw res.statusText;
			const serverWeek = await res.json();
			const transformedServerWeek = convertServerToUserWeek(serverWeek);
			const sanitizedServerWeek = sanitizeWeek(transformedServerWeek);
			if (!sanitizedServerWeek) {
				throw 'Server week not clean';
			} else if (emptyWeek(sanitizedServerWeek)) {
				store.dispatch('uploadWeek', store.state.userWeek);
			} else {
				store.dispatch('importWeek', sanitizedServerWeek);
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
