<template>
	<div id="appSettings">
		<div>
			<span>Close join tab after</span
			><Input
				v-model="closeTabAfter"
				type="number"
				:class="{ error: !validCloseTabAfter }"
			/><span>s</span>
		</div>
		<Toggle
			v-model="closeTab"
			:sync="true"
			class="toggle"
			:disabled="!validCloseTabAfter"
		/>

		<span>Dark theme</span>
		<Toggle v-model="darkTheme" :sync="true" class="toggle" />

		<span>Show Saturday</span>
		<Toggle v-model="showSaturday" :sync="true" class="toggle" />
		<div>
			<span>Sort schedule</span>
			<Input
				v-model="centuria"
				placeholder="Centuria"
				type="text"
				:class="{ error: !validCenturia }"
			/>
			<Input
				v-model="semester"
				placeholder="Semester"
				type="number"
				:class="{ error: !validSemester }"
			/>
		</div>

		<Toggle
			v-model="syncSchedule"
			:sync="true"
			class="toggle"
			:disabled="!validCenturia || !validSemester"
		/>

		<div v-if="syncSchedule">
			<InfoIcon class="infoIcon" /><span
				>Name your subjects exactly like your schedule</span
			>
		</div>
		<div v-if="syncSchedule"></div>
		<div v-if="syncSchedule">
			<InfoIcon class="infoIcon" /><span
				>You cannot change your schedule in this mode</span
			>
		</div>
	</div>
</template>

<script>
import InfoIcon from 'vue-material-design-icons/InformationOutline';
import Input from '../standard/Input';
import validate from '../../utils/validate';
import Toggle from '../standard/Toggle';

export default {
	name: 'AppSettings',
	components: {
		InfoIcon,
		Toggle,
		Input,
	},
	props: {},
	data: function () {
		return {
			exportName: 'plan.json',
			importFiles: null,
		};
	},
	computed: {
		validCloseTabAfter() {
			return validate.closeTabAfter(this.closeTabAfter);
		},
		validExportName() {
			return validate.exportName(this.exportName);
		},
		validCenturia() {
			return validate.centuria(this.centuria);
		},
		validSemester() {
			return validate.semester(this.semester);
		},
		appColor: function () {
			return getComputedStyle(document.body).getPropertyValue(
				'--app-color'
			);
		},
		closeTab: {
			get() {
				return this.$store.state.settings.closeTab;
			},
			set(closeTab) {
				this.$store.commit('SET_CLOSE_TAB', closeTab);
			},
		},
		closeTabAfter: {
			get() {
				return this.$store.state.settings.closeTabAfter;
			},
			set(closeTabAfter) {
				const value = parseFloat(closeTabAfter);
				this.$store.commit(
					'SET_CLOSE_TAB_AFTER',
					isNaN(value) ? null : value
				);
			},
		},
		darkTheme: {
			get() {
				return this.$store.state.settings.darkTheme;
			},
			set(darkTheme) {
				this.$store.commit('SET_DARK_THEME', darkTheme);
			},
		},
		showSaturday: {
			get() {
				return this.$store.state.settings.showSaturday;
			},
			set(showSaturday) {
				this.$store.commit('SET_SHOW_SATURDAY', showSaturday);
			},
		},
		centuria: {
			get() {
				return this.$store.state.settings.centuria;
			},
			set(centuria) {
				this.$store.commit('SET_CENTURIA', centuria);
			},
		},
		semester: {
			get() {
				return this.$store.state.settings.semester;
			},
			set(semester) {
				this.$store.commit('SET_SEMESTER', semester);
			},
		},
		syncSchedule: {
			get() {
				return this.$store.state.settings.syncSchedule;
			},
			set(syncSchedule) {
				if (syncSchedule) {
					this.$notify({
						group: 'main',
						title: `Sorting schedule`,
						duration: 3000,
						type: 'ok',
					});
				}

				this.$store.commit('SET_SYNC_SCHEDULE', syncSchedule);
			},
		},
	},
	watch: {
		validCloseTabAfter(valid) {
			if (!valid) this.closeTab = false;
		},
		validCenturia(valid) {
			if (!valid) this.syncSchedule = false;
		},
		validSemester(valid) {
			if (!valid) this.syncSchedule = false;
		},
	},
	methods: {},
};
</script>

<style scoped>
#appSettings {
	display: grid;
	grid-template-columns: 10fr auto;
	gap: 10px;
	align-items: center;
}

#appSettings > div {
	display: flex;
	align-items: center;
	width: 100%;
}

#appSettings > div > input {
	width: 30px;
	margin: 0px 5px;
	color: inherit;
}

#appSettings .infoIcon {
	margin-right: 5px;
}

#appSettings > .toggle {
	margin: 10px;
}
</style>
