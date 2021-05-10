<template>
	<div class="display">
		<div class="content">
			<DragIcon
				v-if="!$store.state.settings.syncSchedule"
				title="move"
				class="dragIcon"
				fill-color="#eee"
				:size="20"
			/>

			<h2>{{ name }}</h2>

			<div v-if="startTime != '' || endTime !== ''" class="time">
				{{ startTime === '' ? '?' : startTime }} -
				{{ endTime === '' ? '?' : endTime }}
			</div>
		</div>

		<div class="actions">
			<Button
				title="Edit subject"
				:disabled="$store.state.settings.syncSchedule"
				class="onColor"
				@click="$emit('edit')"
			>
				<EditIcon title="Edit subject" :size="20" />
			</Button>

			<Button
				title="Copy password to clipboard"
				:disabled="pass === ''"
				class="onColor"
				@click="copyPassToClipboard"
				><CopyIcon title="Copy password to clipboard" :size="20"
			/></Button>

			<Button
				title="Launch Zoom meeting (also copies password)"
				:disabled="link === ''"
				class="onColor"
				@click="joinMeeting"
			>
				<LaunchIcon
					title="Launch Zoom meeting (also copies password)"
					:size="20"
				/>
			</Button>
		</div>
	</div>
</template>

<script>
import EditIcon from 'vue-material-design-icons/Pencil';
import CopyIcon from 'vue-material-design-icons/ContentCopy';
import LaunchIcon from 'vue-material-design-icons/Launch';
import DragIcon from 'vue-material-design-icons/CursorMove';
import Button from './Button.vue';

export default {
	name: 'SubjectDisplay',
	components: {
		EditIcon,
		CopyIcon,
		Button,
		LaunchIcon,
		DragIcon,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		pass: { type: String, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
	},
	methods: {
		copyPassToClipboard: async function () {
			if (!navigator.clipboard) {
				this.$notify({
					group: 'main',
					title: 'Failed to copy the password',
					text: `Here is your pasword: ${this.pass}`,
					duration: 10000,
					type: 'error',
				});
				throw new Error('Copy to clipboard failed');
			}
			await navigator.clipboard.writeText(this.pass);
			this.$notify({
				group: 'main',
				title: 'Password copied to clipboard',
				duration: 2000,
				type: 'success',
			});
		},

		joinMeeting: async function () {
			await this.copyPassToClipboard();
			const win = window.open(this.link, '_blank');
			if (this.$store.state.settings.closeTab) {
				setTimeout(() => {
					win.close();
				}, this.$store.state.settings.closeTabAfter * 1000);
			}
		},
	},
};
</script>

<style scoped>
.display {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
}

.display > .content > .dragIcon {
	position: absolute;
	top: 0px;
	left: 0px;
	cursor: grab;
	opacity: 0;
}

.display > .content {
	cursor: grab;
}

.display > .content > h2 {
	margin: 0px 26px 7px 25px;
	font-size: 19px;
	text-align: center;
	color: var(--text-on-color);
}

.display > .time {
	display: flex;
	justify-content: center;
	color: var(--text-on-color);
}

.display > .actions {
	display: flex;
	justify-content: center;
}
</style>
