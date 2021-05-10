<template>
	<div class="subject">
		<SubjectDisplay
			v-if="mode === 'display'"
			:name="name"
			:link="link"
			:pass="pass"
			:start-time="startTime"
			:end-time="endTime"
			@edit="mode = 'edit'"
		/>

		<SubjectEdit
			v-if="mode === 'edit'"
			:name="name"
			:link="link"
			:pass="pass"
			:start-time="startTime"
			:end-time="endTime"
			@save="save"
			@remove="remove"
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
		dayIdx: { type: Number, required: true },
		subjectIdx: { type: Number, required: true },
		name: { type: String, required: true },
		link: { type: String, required: true },
		pass: { type: String, required: true },
		startTime: { type: String, required: true },
		endTime: { type: String, required: true },
	},

	data: function () {
		return {
			mode: this.name === '' ? 'edit' : 'display',
		};
	},

	methods: {
		save: function (name, link, pass, startTime, endTime) {
			this.$store.commit('EDIT_SUBJECT', {
				dayIdx: this.dayIdx,
				subjectIdx: this.subjectIdx,
				name,
				link,
				pass,
				startTime,
				endTime,
			});
			this.mode = 'display';
		},

		remove: function () {
			this.$store.commit('REMOVE_SUBJECT', {
				dayIdx: this.dayIdx,
				subjectIdx: this.subjectIdx,
			});
		},
	},
};
</script>

<style scoped>
.subject {
	box-sizing: border-box;
	padding: 15px;
	border-radius: 10px;
	background: linear-gradient(
		20deg,
		var(--gradient-from) 30%,
		var(--gradient-to) 100%
	);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	place-self: stretch;
}

.sortable-drag {
	opacity: 1 !important;
}
</style>
