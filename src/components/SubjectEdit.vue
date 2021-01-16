<template>
	<div class="edit">
		<div class="data">
			<span>Name:</span
			><input
				type="text"
				placeholder="DM 2"
				v-model="newName"
				:class="{ error: !validName }"
			/>
			<span>Zoom-Link:</span
			><input
				placeholder="https://nordakademie-de.zoom.us/j/1234"
				:class="{ error: !validUrl }"
				type="text"
				v-model="newLink"
			/>
			<span>Zoom-Password:</span
			><input placeholder="1234" v-model="newPassword" type="text" />
		</div>
		<div class="actions">
			<button @click="save('', '', '')" class="bad">
				delete
			</button>
			<button
				:disabled="!validInputs"
				@click="save(newName, newLink, newPassword)"
			>
				save
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "SubjectEdit",
	props: {
		name: String,
		link: String,
		password: String,
	},

	data: function() {
		return {
			newName: this.name,
			newLink: this.link,
			newPassword: this.password,
		};
	},

	computed: {
		validName() {
			return this.newName.trim() != "";
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
		save: function(name, link, password) {
			this.$emit("save", name, link, password);
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
	color: var(--light);
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
