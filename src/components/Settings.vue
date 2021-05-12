<template>
	<div>
		<SettingsIcon />

		<Dialog
			:value="$store.state.settings.open"
			name="Settings"
			help-link="https://github.com/coderesting/zoomcalendar"
			@input="(open) => $store.commit('SET_SETTINGS_OPEN', open)"
		>
			<div id="settings">
				<Input
					type="file"
					accept=".json"
					@input="(files) => (importFiles = files)"
				/>
				<Button @click="importFile()">Import</Button>
				<Input
					v-model="exportName"
					:class="{ error: !validExportName }"
					type="text"
				/>
				<Button :disabled="!validExportName" @click="exportFile()"
					>Export</Button
				>
				<div>
					<span>Close join tab after</span
					><Input
						v-model="closeTabAfter"
						type="number"
						:class="{ error: !validCloseTabAfter }"
					/><span>s</span>
				</div>
				<ToggleButton
					v-model="closeTab"
					:margin="5"
					:width="61"
					:height="28"
					:sync="true"
					class="toggle"
					:color="appColor"
					:disabled="!validCloseTabAfter"
				/>
				<span>Dark theme</span>
				<ToggleButton
					v-model="darkTheme"
					:margin="5"
					:width="61"
					:height="28"
					:sync="true"
					class="toggle"
					:color="appColor"
				/>
				<div>
					<span>Sync Schedule</span>
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

				<ToggleButton
					v-model="syncSchedule"
					:margin="5"
					:width="61"
					:height="28"
					:sync="true"
					class="toggle"
					:color="appColor"
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
		</Dialog>
	</div>
</template>

<script>
import SettingsIcon from './SettingsIcon';
import InfoIcon from 'vue-material-design-icons/InformationOutline';
import sanitizeWeek from '../weekManipulation/sanitizeWeek.js';
import Button from './Button';
import Input from './Input';
import { ToggleButton } from 'vue-js-toggle-button';
import Dialog from './Dialog';
import validate from '../store/validate';

export default {
	name: 'Settings',
	components: {
		SettingsIcon,
		InfoIcon,
		Button,
		ToggleButton,
		Input,
		Dialog,
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
						title: `Syncing schedule`,
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
	methods: {
		importFile: function () {
			if (this.importFiles == null || this.importFiles.length === 0) {
				this.showNotification('No file selected', 'error');
				return;
			}

			const reader = new FileReader();
			reader.addEventListener('load', (event) => {
				try {
					const week = sanitizeWeek(JSON.parse(event.target.result));
					if (week === null) throw 'Week not clean';
					this.$store.dispatch('importWeek', week);
					this.showNotification('Imported Data', 'success');
				} catch {
					this.showNotification('JSON format is wrong', 'error');
				}
			});

			reader.readAsText(this.importFiles[0]);
		},

		exportFile: function () {
			if (this.exportName.trim() == '') {
				this.showNotification('No filename specified', 'error');
				return;
			}

			var element = document.createElement('a');
			element.setAttribute(
				'href',
				'data:text/json;charset=utf-8,' +
					encodeURIComponent(
						JSON.stringify(
							this.$store.getters.weekForExport,
							null,
							2
						)
					)
			);
			element.setAttribute('download', this.exportName);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			this.showNotification('Exported ' + this.exportName, 'success');
		},

		showNotification: function (title, type) {
			this.$notify({
				group: 'main',
				title: title,
				duration: 5000,
				type: type,
			});
		},
	},
};
</script>

<style scoped>
#settings {
	display: grid;
	grid-template-columns: auto auto;
	gap: 10px;
	align-items: center;
}

#settings > input[type='text'] {
	padding: 7px;
}

#settings > div {
	display: flex;
	align-items: center;
	width: 100%;
}

#settings > div > input {
	width: 30px;
	margin: 0px 5px;
	color: inherit;
}

#settings .infoIcon {
	margin-right: 5px;
}

#settings > .toggle {
	margin: 10px;
}
</style>
