<template>
	<div class="edit">
		<div class="data">
			<span>Name:</span>
			<Input
				v-model="newName"
				type="text"
				placeholder="DM 2"
				:class="{ error: !validName, onColor: true }"
				@input="(val) => (newName = val)"
			/>

			<span>Zoom-Link:</span>
			<Input
				v-model="newLink"
				placeholder="https://nordakademie-de.zoom.us/j/1234"
				:class="{ error: !validLink, onColor: true }"
				type="text"
			/>

			<span>Zoom-Password:</span>
			<Input
				v-model="newPass"
				placeholder="1234"
				type="text"
				class="onColor"
			/>

			<span>Time:</span>
			<div class="timeInputs">
				<Input
					v-model="newStartTime"
					:class="{ error: !validStartTime, onColor: true }"
					placeholder="09:15"
					type="text"
				/>
				<span>:</span>
				<Input
					v-model="newEndTime"
					:class="{ error: !validEndTime, onColor: true }"
					placeholder="12:05"
					type="text"
				/>
			</div>
		</div>
		<div class="actions">
			<Button class="onColor" @click="$emit('remove')">
				<DeleteIcon :size="20" />
			</Button>

			<Button
				:disabled="!validInputs"
				class="onColor"
				@click="
					$emit(
						'save',
						newName,
						newLink,
						newPass,
						newStartTime,
						newEndTime
					)
				"
			>
				<SaveIcon :size="20" />
			</Button>
		</div>
	</div>
</template>

<script>
import validate from '../utils/validate';
import SaveIcon from 'vue-material-design-icons/ContentSave';
import DeleteIcon from 'vue-material-design-icons/Delete';
import Button from './Button';
import Input from './Input';

export default {
	name: 'SubjectEdit',

	components: {
		SaveIcon,
		DeleteIcon,
		Button,
		Input,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		pass: { type: String, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
	},

	data: function () {
		return {
			newName: this.name,
			newLink: this.link,
			newPass: this.pass,
			newStartTime: this.startTime,
			newEndTime: this.endTime,
		};
	},

	computed: {
		validName() {
			return validate.subjectName(this.newName);
		},

		validLink() {
			return validate.subjectLink(this.newLink);
		},

		validStartTime() {
			return (
				this.newStartTime == '' ||
				validate.subjectTime(this.newStartTime)
			);
		},

		validEndTime() {
			return (
				this.newEndTime == '' || validate.subjectTime(this.newEndTime)
			);
		},

		validInputs() {
			return (
				this.validName &&
				this.validLink &&
				this.validStartTime &&
				this.validEndTime
			);
		},
	},
	methods: {},
};
</script>

<style scoped>
.edit > .data {
	display: grid;
	grid-template-columns: auto auto;
	align-items: center;
	gap: 10px;
	height: 100%;
}

.edit > .data > .timeInputs {
	display: flex;
	align-items: center;
	gap: 10px;
}

.edit > .data > .timeInputs > input {
	width: 50px;
}

.edit > .data span {
	color: var(--text-on-color);
}

.edit > .actions {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

::placeholder {
	color: rgba(241, 241, 241, 0.349);
	opacity: 1;
}

:-ms-input-placeholder {
	color: rgba(241, 241, 241, 0.349);
}

::-ms-input-placeholder {
	color: rgba(241, 241, 241, 0.349);
}
</style>
