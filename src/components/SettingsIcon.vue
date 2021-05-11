<template>
	<SettingsIcon
		id="settingsIcon"
		:size="35"
		class="icon"
		@click="$store.commit('SET_SETTINGS_OPEN', true"
	/>
</template>

<script>
import SettingsIcon from 'vue-material-design-icons/Cog';

export default {
	name: 'Settings',
	components: {
		SettingsIcon,
	},
};
</script>

<style scoped>
#settingsIcon {
	position: fixed;
	top: 0px;
	left: 0px;
	padding: 20px;
	background-color: var(--background);
	border-bottom-right-radius: 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	color: var(--text);
	z-index: 2;
}

#settingsIcon > * {
	transition: 0.3s ease;
}

#settingsIcon:hover > * {
	transform: rotate(30deg);
}
</style>
