<template>
	<div id="week">
		<h1
			v-for="(weekDay, index) of getWeekDays()"
			:key="'h' + index"
			:style="{ gridRow: weekDay.row, gridColumn: weekDay.column }"
		>
			{{ weekDay.name }}
		</h1>
		<Subject
			v-for="subject of getSubjects()"
			:id="subject.id"
			:key="'s' + subject.id"
			:style="{ gridRow: subject.row, gridColumn: subject.column }"
			:name="subject.name"
			:link="subject.link"
			:password="subject.pass"
			:close-tab="closeTab"
			:close-tab-after="closeTabAfter"
			@change="
				(name, link, password) =>
					$emit('editSubject', subject.id, name, link, password)
			"
			@reorderSubject="
				(direction) => $emit('reorderSubject', subject.id, direction)
			"
		/>
		<AddSymbol
			v-for="(symbol, index) of getAddSymbols()"
			:key="'a' + index"
			:day-idx="index"
			:style="{ gridRow: symbol.row, gridColumn: symbol.column }"
			@add="$emit('addSubject', index)"
		/>
	</div>
</template>

<script>
import Subject from './Subject.vue';
import AddSymbol from './AddSymbol.vue';

export default {
	name: 'Week',
	components: {
		Subject,
		AddSymbol,
	},
	props: {
		week: { type: Array, required: true },
		closeTab: { type: Boolean, required: true },
		closeTabAfter: { type: Number, required: true },
	},
	data: function () {
		return {};
	},
	methods: {
		getWeekDays: function () {
			let dayNames = [];
			this.week.forEach((day, i) => {
				dayNames.push({
					name: day.name,
					column: i + 1,
					row: 1,
				});
			});
			return dayNames;
		},
		getSubjects: function () {
			let subjects = [];
			this.week.forEach((day, dayIdx) => {
				day.subjects.forEach((subject, subjectIdx) => {
					subjects.push({
						row: parseInt(subjectIdx) + 2,
						column: parseInt(dayIdx) + 1,
						...subject,
					});
				});
			});
			return subjects;
		},
		getAddSymbols: function () {
			let pluses = [];
			this.week.forEach((day, dayIdx) => {
				pluses.push({
					row: day.subjects.length + 2,
					column: dayIdx + 1,
				});
			});
			return pluses;
		},
	},
};
</script>

<style scoped>
#week {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	justify-items: center;
	gap: 20px;
	padding: 0px 20px;
}

h1 {
	color: var(--dark);
}
</style>
