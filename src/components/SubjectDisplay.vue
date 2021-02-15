<template>
	<div class="display">
		<h2>{{ name }}</h2>
		<div class="actions">
			<button class="customButton" @click="$emit('edit')">
				<EditIcon :size="20" />
			</button>

			<button class="customButton"
				:class="{
					good: copyState == 'success',
					bad: copyState == 'failure',
				}"
				:disabled="password === ''"
				@click="copy"
			>
				<PasswordIcon :size="20" />
			</button>

			<a :href="link" target="_blank">
				<button class="customButton">
					<JoinIcon :size="20" />
				</button>
			</a>
		</div>
	</div>
</template>

<script>
import EditIcon from "vue-material-design-icons/Pencil";
import PasswordIcon from "vue-material-design-icons/Lock";
import JoinIcon from "vue-material-design-icons/PlayCircle";

export default {
	name: "SubjectDisplay",
	props: {
		name: String,
		link: String,
		password: String,
	},
	components: {
		EditIcon,
		PasswordIcon,
		JoinIcon
	},

	data: () => {
		return {
			copyState: "",
			edit: true,
		};
	},
	methods: {
		copy: function() {
			this.copyState = "";
			if (!navigator.clipboard) {
				this.error();
				return;
			}

			navigator.clipboard
				.writeText(this.password)
				.then(this.success.bind(this))
				.catch(this.error.bind(this));
		},

		success: function() {
			this.copyState = "success";
			setTimeout(() => {
				this.copyState = "";
			}, 1000);
		},

		error: function() {
			this.copyState = "failure";
			alert(
				`Fehler. Versuche einen modernen Browser. Hier trotzdem das Passwort: ${this.password}`
			);
			setTimeout(() => {
				this.copyState = "";
			}, 1000);
		},
	},
};
</script>

<style>
.display {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.display > h2 {
	margin: 10px;
	font-size: 19px;
	margin-top: 0px;
	text-align: center;
	color: var(--light);
}

.display > .actions {
	display: flex;
	justify-content: center;
}

.display > .actions > a {
	text-decoration: none;
	display: flex;
	align-items: stretch;
}

.customButton {
	padding: 3px 7px;
}

.customButton > * {
	display: flex;
	align-items: center;
}
</style>