import Vue from 'vue';
export default {
	async checkLogin(store) {
		let loggedIn = false;
		let avatarURL = null;
		try {
			const res = await fetch('https://zoom.icetoast.cloud/api/user', {
				credentials: 'include',
			});
			if (!res.ok) throw 'not logged in';
			const data = await res.json();
			avatarURL = data.avatarurl;
			loggedIn = true;
			store.dispatch('downloadWeek');
		} catch (e) {
			if (store.state.settings.loggedIn) {
				Vue.notify({
					group: 'main',
					title: `Login failed`,
					duration: 3000,
					type: 'error',
				});
			}
		}
		store.commit('SET_LOGIN_STATE', loggedIn);
		store.commit('SET_AVATAR_URL', avatarURL);
	},
};
