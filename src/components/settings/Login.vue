<template>
	<div id="loginOptions">
		<img src="assets/login/google.svg" @click="() => login('google')" />
		<img src="assets/login/discord.svg" @click="() => login('discord')" />
		<img src="assets/login/github.svg" @click="() => login('github')" />
	</div>
</template>

<script>
export default {
	name: 'Login',
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
#loginOptions {
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 20px;
}

#loginOptions > img {
	width: 40px;
	height: 40px;
	cursor: pointer;
}
</style>
