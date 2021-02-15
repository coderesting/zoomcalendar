<template>
	<div class="subject">
		<SubjectDisplay
			:name="this.name"
			:link="this.link"
			:password="this.password"
			@edit="setEditMode(true)"
			v-if="!this.edit"
		/>

		<SubjectEdit
			v-if="this.edit"
			:name="name"
			:link="this.link"
			:password="this.password"
			@save="this.save"
		/>
	</div>
</template>

<script>
import SubjectDisplay from "./SubjectDisplay.vue";
import SubjectEdit from "./SubjectEdit.vue";

export default {
	name: "Subject",
	props: {
		name: String,
		link: String,
		password: String,
		id: String,
	},
	data: function() {
		return {
			edit: this.name === "",
		};
	},

	methods: {
		setEditMode: function(edit) {
			this.edit = edit;
		},
		save: function(name, link, password) {
			this.$emit("change", name, link, password);
			this.edit = false;
		},
	},
	components: {
		SubjectDisplay,
		SubjectEdit,
	},
};
</script>

<style>
.subject {
	box-sizing: border-box;
	padding: 15px;
	border-radius: 10px;
	background: var(--gradient);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	place-self: stretch;
}
</style>
