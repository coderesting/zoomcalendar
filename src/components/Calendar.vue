<template>
	<div id="calendar">
		<Settings
			:week="week"
			@weekImport="importWeek"
			:closeTab="closeTab"
			:closeTabAfter="closeTabAfter"
			@closeTabAfterChanged="val => (closeTabAfter = val)"
			@closeTabChanged="val => (closeTab = val)"
		/>
		<Week
			:week="week"
			@editSubject="editSubject"
			@addSubject="addSubject"
			@reorderSubject="reorderSubject"
			:closeTab="closeTab"
			:closeTabAfter="closeTabAfter"
		/>
		<notifications
			group="main"
			position="bottom right"
			:closeOnClick="false"
		/>
	</div>
</template>

<script>
import Week from './Week.vue';
import Settings from './Settings.vue';
import Vue from 'vue';
import weekDataCheck from '../util/weekDataCheck';

export default {
	name: 'Calendar',
	components: {
		Week,
		Settings
	},
	data: function() {
		return {
			week: null,
			closeTab: true,
			closeTabAfter: 2000
		};
	},
	watch: {
		closeTab: function(newVal) {
			localStorage.closeTab = newVal;
		},
		closeTabAfter: function(newVal) {
			localStorage.closeTabAfter = newVal;
		}
	},
	created: function() {
		this.closeTab = localStorage.closeTab == 'true' ? true : false;
		const closeTabAfterStored = parseFloat(localStorage.closeTabAfter);
		this.closeTabAfter =
			closeTabAfterStored >= 0 ? closeTabAfterStored : 10;
		const savedWeek = this.loadSavedWeek();
		if (savedWeek) {
			this.week = savedWeek;
		} else
			this.week = [
				{
					name: 'Monday',
					subjects: []
				},
				{
					name: 'Tuesday',
					subjects: []
				},
				{
					name: 'Wednesday',
					subjects: []
				},
				{
					name: 'Thursday',
					subjects: []
				},
				{
					name: 'Friday',
					subjects: []
				}
			];
	},

	methods: {
		loadSavedWeek: function() {
			let correctData = weekDataCheck(this.$cookies.get('week'));
			if (correctData) {
				correctData.forEach(day => {
					day.subjects.forEach(subject => {
						if (!subject.id)
							subject.id = Math.random()
								.toString(36)
								.substr(2, 9);
					});
				});
				return correctData;
			}
			return null;
		},

		saveWeek: function(week) {
			this.$cookies.set('week', JSON.stringify(week));
		},

		importWeek: function(week) {
			this.week = week;
			console.log(week);
			this.saveWeek(this.week);
		},

		addSubject: function(dayIdx) {
			this.week[dayIdx].subjects.push({
				name: '',
				link: '',
				pass: '',
				id: Math.random()
					.toString(36)
					.substr(2, 9)
			});
			this.saveWeek(this.week);
		},

		editSubject: function(id, name, link, password) {
			this.week.forEach(day => {
				day.subjects.forEach((subject, subjectIdx) => {
					if (subject.id == id) {
						if (name === '') {
							day.subjects.splice(subjectIdx, 1);
						} else {
							Vue.set(subject, 'name', name);
							Vue.set(subject, 'link', link);
							Vue.set(subject, 'pass', password);
						}
					}
				});
			});
			this.saveWeek(this.week);
		},

		reorderSubject: function(id, direction) {
			for (let j = 0; j < this.week.length; j++) {
				let day = this.week[j];

				// Swaps only possible if there is more than one subject
				if (day.subjects.length > 1) {
					let swapped = false;

					for (let i = 0; i < day.subjects.length; i++) {
						// Search for current subject
						if (day.subjects[i].id == id) {
							if (direction == 'up' && i > 0) {
								// Swap upper and current element
								let temp = day.subjects[i - 1];

								day.subjects[i - 1] = day.subjects[i];
								day.subjects[i] = temp;

								swapped = true;
								break;
							} else if (
								direction == 'down' &&
								i < day.subjects.length - 1
							) {
								// Swap lower and current element
								let temp = day.subjects[i + 1];

								day.subjects[i + 1] = day.subjects[i];
								day.subjects[i] = temp;

								swapped = true;
								break;
							}
						}
					}

					if (swapped) {
						// Swap of elements in Array are not registered by Javascript. Direct data update:
						Vue.set(this.week, j, day);
						break;
					}
				}
			}

			this.saveWeek(this.week);
		}
	}
};
</script>

<style>
html {
	height: 100%;
	--light: #eee;
	--dark: #424242;
	--darkColor: #002d73;
	--lightColor: #039be5;
	--gradient: linear-gradient(
		130deg,
		var(--darkColor) 0%,
		var(--lightColor) 100%
	);
}

body {
	height: 100%;
	background-color: var(--light);
	font-family: Arial;
	padding: 0;
	margin: 0;
}

.material-design-icon {
	display: flex;
	cursor: pointer;
}

input[type='text'],
input[type='number'] {
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	padding: 3px;
	border: solid var(--light) 2px;
	color: var(--light);
	font-family: Arial;
	font-size: inherit;
	width: 100%;
	min-width: 100px;
	box-sizing: border-box;
	transition: 0.2s ease;
}

input[type='text'].dark,
input[type='number'].dark {
	color: var(--dark);
}

input:focus {
	outline: none;
}

input.error {
	border-color: #f44336;
}

.vue-notification {
	border-radius: 10px;
	border-left: none !important;
}

.vue-notification.success {
	background: #4caf50 !important;
}

.vue-notification.error {
	background-color: #e53935 !important;
}

.vue-notification > * {
	font-size: 120%;
	margin: 5px;
}
</style>
