<template>
	<div class="subject">
		<SubjectDisplay
			v-if="!edit"
			:name="name"
			:link="link"
			:password="password"
			:close-tab="closeTab"
			:close-tab-after="closeTabAfter"
			@edit="setEditMode(true)"
		/>

		<SubjectEdit
			v-if="edit"
			:id="id"
			:name="name"
			:link="link"
			:password="password"
			@save="save"
			@reorder="reorder"
		/>
	</div>
</template>

<script>
import SubjectDisplay from './SubjectDisplay.vue';
import SubjectEdit from './SubjectEdit.vue';

export default {
	name: 'Subject',
	components: {
		SubjectDisplay,
		SubjectEdit,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		password: { type: String, required: true },
		id: { type: String, required: true },
		closeTab: { type: Boolean, required: true },
		closeTabAfter: { type: Number, required: true },
	},
	data: function () {
		return {
			edit: this.name === '',
		};
	},

	methods: {
		setEditMode: function (edit) {
			this.edit = edit;
		},
		reorder: function (direction) {
			this.$emit('reorderSubject', direction);
		},
		save: function (name, link, password) {
			this.$emit('change', name, link, password);
			this.edit = false;
		},
	},
};
</script>

<style scoped>
.subject {
	box-sizing: border-box;
	padding: 15px;
	border-radius: 10px;
	background: var(--gradient);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	place-self: stretch;
}
</style>
