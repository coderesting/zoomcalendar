<template>
	<div id="login">
		<div v-if="$store.state.settings.loggedIn" class="user">
			<img :src="$store.state.settings.avatarURL" />
			<Button @click="() => logout()">Logout</Button>
		</div>
		<div v-if="!$store.state.settings.loggedIn" class="options">
			<img src="assets/login/google.svg" @click="() => login('google')" />
			<img
				src="assets/login/discord.svg"
				@click="() => login('discord')"
			/>
			<img src="assets/login/github.svg" @click="() => login('github')" />
		</div>
	</div>
</template>

<script>
import Button from '../standard/Button';
export default {
	name: 'Login',
	components: { Button },
	methods: {
		login(provider) {
			window.location.href = `https://zoom.icetoast.cloud/api/auth/${provider}`;
		},
		logout() {
			window.location.href = `https://zoom.icetoast.cloud/api/user/logout`;
		},
	},
};
</script>

<style scoped>
#login > .options {
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 20px;
}

#login > .user {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}

#login > .user > img {
	border-radius: 100%;
	cursor: auto;
}

img {
	width: 40px;
	height: 40px;
	cursor: pointer;
}
</style>
