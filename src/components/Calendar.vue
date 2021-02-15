<template>
	<div id="calendar">
		<Settings :week="week" @weekImport="importWeek" />
		<Week :week="week"
			@editSubject="editSubject"
			@addSubject="addSubject" 
			@reorderSubject="reorderSubject"/>
	</div>
</template>

<script>
import Week from "./Week.vue";
import Settings from "./Settings.vue";
import Vue from "vue";
import weekDataCheck from "../util/weekDataCheck";

export default {
	name: "Calendar",
	components: {
		Week,
		Settings,
	},
	data: function() {
		return {
			week: null,
		};
	},
	created: function() {
		const savedWeek = this.loadSavedWeek();
		if (savedWeek) {
			this.week = savedWeek;
		} else
			this.week = [
				{
					name: "Monday",
					subjects: [],
				},
				{
					name: "Tuesday",
					subjects: [],
				},
				{
					name: "Wednesday",
					subjects: [],
				},
				{
					name: "Thursday",
					subjects: [],
				},
				{
					name: "Friday",
					subjects: [],
				},
			];
	},

	methods: {
		loadSavedWeek: function() {
			let correctData = weekDataCheck(this.$cookies.get("week"));
			if (correctData) {
				correctData.forEach((day) => {
					day.subjects.forEach((subject) => {
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
			this.$cookies.set("week", JSON.stringify(week));
		},

		importWeek: function(week) {
			this.week = week;
			console.log(week);
			this.saveWeek(this.week);
		},

		addSubject: function(dayIdx) {
			this.week[dayIdx].subjects.push({
				name: "",
				link: "",
				pass: "",
				id: Math.random()
					.toString(36)
					.substr(2, 9),
			});
			this.saveWeek(this.week);
		},

		editSubject: function(id, name, link, password) {
			this.week.forEach((day) => {
				day.subjects.forEach((subject, subjectIdx) => {
					if (subject.id == id) {
						if (name === "") {
							day.subjects.splice(subjectIdx, 1);
						} else {
							Vue.set(subject, "name", name);
							Vue.set(subject, "link", link);
							Vue.set(subject, "pass", password);
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
								let temp = day.subjects[i-1];

								day.subjects[i-1] = day.subjects[i];
								day.subjects[i] = temp;

								swapped = true;
								break;
							} else if (direction == 'down' && i < day.subjects.length - 1) {
								// Swap lower and current element
								let temp = day.subjects[i+1];

								day.subjects[i+1] = day.subjects[i];
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
		},
	},
};
</script>

<style>
html {
	height: 100%;
	--light: #eee;
	--dark: #424242;
	--darkColor: #002d73;
	--lightColor: #039be5;
	--red: #f44336;
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

button {
	font-size: 15px;
	font-family: Arial;
	color: var(--light);
	text-align: center;
	display: block;
	margin: 7px;
	padding: 5px 10px;
	background-color: transparent;
	border: solid var(--light) 2px;
	border-radius: 20px;
	cursor: pointer;
	transition: 0.2s ease;
	text-decoration: none;
	white-space: nowrap;
}

button.dark {
	color: var(--dark);
	border-color: var(--dark);
}

button.good {
	background-color: #66bb6a;
}

button.bad {
	background-color: var(--red);
}

button:disabled {
	opacity: 0.4;
	pointer-events: none;
}

button:not(.good):not(.bad):hover {
	background-color: var(--light);
	color: var(--dark);
}

button:not(.good):not(.bad):hover.dark {
	background-color: var(--dark);
	color: var(--light);
}

button:focus {
	outline: none;
}

input[type="text"] {
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

input:focus {
	outline: none;
}

input.error {
	border-color: var(--red);
}

.icon {
	color: var(--dark);
	cursor: pointer;
	display: flex;
	align-items: center;
}
</style>
