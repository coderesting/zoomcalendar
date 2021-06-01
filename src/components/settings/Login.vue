<template>
	<div id="login">
		<div v-if="!$store.state.settings.loggedIn" class="options">
			<img src="assets/login/google.svg" @click="() => login('google')" />
			<img
				src="assets/login/discord.svg"
				@click="() => login('discord')"
			/>
			<img src="assets/login/github.svg" @click="() => login('github')" />
		</div>
		<div v-if="!$store.state.settings.loggedIn" class="info">
			<div>
				<InfoIcon class="infoIcon" /><span
					>Your account schedule will override the local schedule
				</span>
			</div>
			<div>
				<InfoIcon class="infoIcon" /><span
					>Delete <b>all</b> meetings from your account over
					<a href="https://zoom.icetoast.cloud/">here</a> to prevent
					this</span
				>
			</div>
			<div>
				<InfoIcon class="infoIcon" /><span
					>Export your schedule before you login to be save</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import InfoIcon from 'vue-material-design-icons/InformationOutline';
export default {
	name: 'Login',
	components: { InfoIcon },
	methods: {
		login: function (provider) {
			window.location.href = `https://zoom.icetoast.cloud/api/auth/${provider}`;
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

img {
	width: 40px;
	height: 40px;
	cursor: pointer;
}

#login > .info > div {
	display: flex;
	align-items: center;
	margin: 10px auto;
}

#login > .info a {
	color: var(--text);
}

#login > .info > div > .infoIcon {
	margin-right: 5px;
	color: var(--error);
}
</style>
