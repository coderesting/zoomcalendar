<template>
	<div id="week">
		<div v-for="(weekDay, dayIdx) of week" :key="dayIdx" class="day">
			<h1>
				{{ weekDay.name }}
			</h1>
			<draggable
				:value="week[dayIdx].subjects"
				group="subjects"
				draggable=".subject"
				animation="250"
				handle=".subject"
				forceFallback="true"
				class="subjectWrapper"
				@input="(day) => $store.commit('SET_DAY', { dayIdx, day })"
			>
				<Subject
					v-for="(subject, subjectIdx) of week[dayIdx].subjects"
					:id="subject.id"
					:key="subject.id"
					:day-idx="dayIdx"
					:subject-idx="subjectIdx"
					:name="subject.name"
					:link="subject.link"
					:pass="subject.pass"
					:start-time="subject.startTime"
					:end-time="subject.endTime"
				/>
			</draggable>
			<AddSymbol
				v-if="!$store.state.settings.syncSchedule"
				slot="footer"
				:day-idx="dayIdx"
				@add="$emit('ADD_SUBJECT', dayIdx)"
			/>
		</div>
	</div>
</template>

<script>
import Subject from './Subject.vue';
import AddSymbol from './AddSymbol.vue';
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
	name: 'Week',
	components: {
		Subject,
		AddSymbol,
		draggable,
	},
	props: {},
	data: function () {
		return {};
	},
	computed: {
		...mapGetters({
			week: 'week',
		}),
	},
};
</script>

<style scoped>
#week {
	display: flex;
	gap: 20px;
	padding: 0px 20px;
	width: 100%;
	box-sizing: border-box;
}

#week > .day {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

h1 {
	color: var(--text);
	text-align: center;
}

#week > .day > .subjectWrapper {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	place-items: center;
	gap: 20px;
}
</style>
