<template>
	<div id="settings">
		<SettingsIcon />

		<Dialog
			:value="$store.state.settings.open"
			name="Settings"
			help-link="https://github.com/coderesting/zoomcalendar#zoom-calendar"
			@input="(open) => $store.commit('SET_SETTINGS_OPEN', open)"
		>
			<div class="tabs">
				<span
					:class="{ active: currentTab === 'app' }"
					@click="currentTab = 'app'"
					>App</span
				>
				<span
					:class="{ active: currentTab === 'sync' }"
					@click="currentTab = 'sync'"
					>Sync</span
				>
			</div>

			<AppSettings v-if="currentTab === 'app'"></AppSettings>
			<SyncSettings v-if="currentTab === 'sync'"></SyncSettings>
		</Dialog>
	</div>
</template>

<script>
import SettingsIcon from './SettingsIcon';
import Dialog from '../standard/Dialog';
import AppSettings from './AppSettings';
import SyncSettings from './SyncSettings';

export default {
	name: 'Settings',
	components: {
		SettingsIcon,
		Dialog,
		AppSettings,
		SyncSettings,
	},
	props: {},
	data: function () {
		return {
			currentTab: 'app',
		};
	},
};
</script>

<style scoped>
#settings .tabs {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-bottom: 20px;
}

#settings .tabs > span {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	transition: 0.2s ease;
	border-bottom: solid 2px transparent;
}

#settings .tabs > span:hover {
	background-color: var(--background-hover);
}

#settings .tabs > span.active {
	background-color: var(--background-hover);
	border-bottom: solid 2px var(--text);
}
</style>
