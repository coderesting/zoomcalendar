<template>
	<div id="calendar">
		<Settings />
		<Week />
		<notifications
			group="main"
			position="bottom right"
			:close-on-click="false"
		/>
		<TransferState />
	</div>
</template>

<script>
import Week from './Week.vue';
import Settings from './settings/Settings.vue';
import TransferState from './TransferState.vue';

export default {
	name: 'Calendar',
	components: {
		Week,
		Settings,
		TransferState,
	},
	mounted: function () {},
};
</script>
