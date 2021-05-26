<template>
	<div
		class="display"
		:style="{ cursor: $store.state.settings.syncSchedule ? '' : 'grab' }"
	>
		<h2>{{ name }}</h2>

		<div v-if="startTime != '' || endTime !== ''" class="time">
			{{ startTime === '' ? '?' : startTime }} -
			{{ endTime === '' ? '?' : endTime }}
		</div>

		<div class="actions">
			<Button
				title="Edit subject"
				:disabled="$store.state.settings.syncSchedule"
				class="onColor undraggable"
				@click="$emit('edit')"
			>
				<EditIcon title="Edit subject" :size="20" />
			</Button>

			<Button
				title="Copy password to clipboard"
				:disabled="pass === ''"
				class="onColor undraggable"
				@click="() => copyPassToClipboard(pass)"
				><CopyIcon title="Copy password to clipboard" :size="20"
			/></Button>

			<Button
				title="Launch Zoom meeting (also copies password)"
				:disabled="link === ''"
				class="onColor undraggable"
				@click="
					() =>
						joinMeeting(
							link,
							pass,
							$store.state.settings.closeTab,
							$store.state.settings.closeTabAfter
						)
				"
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
import Button from '../standard/Button';
import { copyPassToClipboard, joinMeeting } from '../../utils/subjectActions';

export default {
	name: 'SubjectDisplay',
	components: {
		EditIcon,
		CopyIcon,
		Button,
		LaunchIcon,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		pass: { type: String, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
	},
	methods: {
		joinMeeting,
		copyPassToClipboard,
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

.display > h2 {
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
