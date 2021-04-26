<template>
	<div class="edit">
		<div class="data">
			<span>Name:</span>
			<input
				v-model="newName"
				type="text"
				placeholder="DM 2"
				:class="{ error: !validName, onColor: true }"
			/>

			<span>Zoom-Link:</span>
			<input
				v-model="newLink"
				placeholder="https://nordakademie-de.zoom.us/j/1234"
				:class="{ error: !validUrl, onColor: true }"
				type="text"
			/>

			<span>Zoom-Password:</span>
			<input
				v-model="newPassword"
				placeholder="1234"
				type="text"
				class="onColor"
			/>
		</div>
		<div class="actions">
			<Button class="onColor" @click="reorder('down')">
				<ArrowDownIcon :size="20" />
			</Button>
			<Button class="onColor" @click="reorder('up')">
				<ArrowUpIcon :size="20" />
			</Button>
			<Button class="onColor" @click="save('', '', '')">
				<DeleteIcon :size="20" />
			</Button>
			<Button
				:disabled="!validInputs"
				class="onColor"
				@click="save(newName, newLink, newPassword)"
			>
				<SaveIcon :size="20" />
			</Button>
		</div>
	</div>
</template>

<script>
import SaveIcon from 'vue-material-design-icons/ContentSave';
import DeleteIcon from 'vue-material-design-icons/Delete';
import ArrowUpIcon from 'vue-material-design-icons/ArrowUpBold';
import ArrowDownIcon from 'vue-material-design-icons/ArrowDownBold';
import Button from './Button';

export default {
	name: 'SubjectEdit',

	components: {
		SaveIcon,
		DeleteIcon,
		ArrowUpIcon,
		ArrowDownIcon,
		Button,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		password: { type: String, required: true },
	},

	data: function () {
		return {
			newName: this.name,
			newLink: this.link,
			newPassword: this.password,
		};
	},

	computed: {
		validName() {
			return this.newName.trim() != '';
		},

		validUrl() {
			let url;
			try {
				url = new URL(this.newLink);
			} catch {
				url = null;
			}
			return url != null;
		},

		validInputs() {
			return this.validName && this.validUrl;
		},
	},
	methods: {
		reorder: function (direction) {
			this.$emit('reorder', direction);
		},
		save: function (name, link, password) {
			this.$emit('save', name, link, password);
		},
	},
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

.edit > .data > span {
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
