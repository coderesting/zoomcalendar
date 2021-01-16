<template>
	<div id="calendar">
		<Settings :week="week" @weekImport="importWeek" />
		<Week :week="week" @editSubject="editSubject" @addSubject="addSubject" />
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
					name: "Montag",
					subjects: [],
				},
				{
					name: "Dienstag",
					subjects: [],
				},
				{
					name: "Mittwoch",
					subjects: [],
				},
				{
					name: "Donnerstag",
					subjects: [],
				},
				{
					name: "Freitag",
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

button:hover {
	background-color: var(--light);
	color: var(--dark);
}

button:hover.dark {
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
