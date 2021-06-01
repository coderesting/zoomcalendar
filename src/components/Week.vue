<template>
	<div id="week">
		<div v-for="(weekDay, dayIdx) of week" :key="dayIdx" class="day">
			<h1>
				{{ weekDay.name }}
			</h1>
			<draggable
				:value="week[dayIdx].subjects"
				group="subjects"
				:draggable="
					$store.state.settings.syncSchedule ? '' : '.subject'
				"
				animation="250"
				handle=".display"
				filter=".undraggable"
				force-fallback="true"
				class="subjectWrapper"
				:move="moveAddIcon"
				@end="end"
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
				<AddSymbol
					v-if="!$store.state.settings.syncSchedule"
					:key="'footer' + dayIdx"
					slot="footer"
					:day-idx="dayIdx"
					@add="$emit('ADD_SUBJECT', dayIdx)"
				/>
			</draggable>
		</div>
	</div>
</template>

<script>
import Subject from './subject/Subject.vue';
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
	methods: {
		// ugly hack to animate the add icon
		// this code needs to be removed immediately when draggable supports animating the footer on a empty list
		moveAddIcon(e) {
			for (const addIcon of e.to.parentNode.parentNode
				.querySelectorAll('.add > span')
				.values()) {
				addIcon.style.transition = `0.3s ease`;
				addIcon.getBoundingClientRect();
				addIcon.style.transform = '';
			}

			if (
				e.relatedContext.list.length == 0 ||
				(e.relatedContext.list.length == 1 && e.from == e.to)
			) {
				const subjectHeight = e.dragged.getBoundingClientRect().height;
				const addIcon = e.to.parentNode.querySelector('.add > span');
				addIcon.style.transition = `0.3s ease`;
				addIcon.getBoundingClientRect();
				addIcon.style.transform = `translateY(${subjectHeight + 20}px)`;
			}
		},

		// ugly hack to animate the add icon
		// this code needs to be removed immediately when draggable supports animating the footer on a empty list
		end(e) {
			const addIcon = e.to.querySelector('.add > span');
			addIcon.style.transition = 'none';
			addIcon.getBoundingClientRect();
			addIcon.style.transform = '';
		},
	},
};
</script>

<style scoped>
#week {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
	gap: 20px;
	padding: 0px 20px;
	width: 100%;
	max-width: 2000px;
	box-sizing: border-box;
	overflow: auto;
	height: 100vh;
	flex-wrap: wrap;
}

#week > .day {
	width: 100%;
	display: flex;
	flex-direction: column;

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
