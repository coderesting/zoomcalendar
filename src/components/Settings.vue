<template>
	<div>
		<SettingsIcon
			:size="35"
			id="settingsIcon"
			class="icon"
			@click="open = true"
		/>
		<div id="settings" :class="{ open: open }">
			<div class="background" @click="open = false"></div>
			<div class="popup">
				<CloseIcon
					id="settingsCloseIcon"
					class="icon"
					:size="28"
					@click="open = false"
				/>
				<h2>Settings</h2>
				<div class="actions">
					<input type="file" ref="fileInput" accept=".json" />
					<Button class="dark" @click="importFile()">Import</Button>
					<input type="text" class="dark" v-model="exportName" />
					<Button class="dark" @click="exportFile()">Export</Button>
					<div class="autoclose">
						<span>Close join tab after</span
						><input
							class="dark"
							type="number"
							v-model="closeTabAfterInput"
							:class="{ error: !validCloseTabAfterInput }"
							@blur="() => (closeTabAfterInput = closeTabAfter)"
						/><span>s</span>
					</div>
					<ToggleButton
						:margin="5"
						:width="61"
						:height="28"
						class="toggle"
						v-model="closeTabCheckbox"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SettingsIcon from 'vue-material-design-icons/Cog';
import CloseIcon from 'vue-material-design-icons/Close';
import weekDataCheck from '../util/weekDataCheck.js';
import Button from './Button';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
	name: 'Settings',
	props: { week: Array, closeTabAfter: Number, closeTab: Boolean },
	data: function() {
		return {
			exportName: 'plan.json',
			open: false,
			closeTabCheckbox: this.closeTab,
			closeTabAfterInput: this.closeTabAfter
		};
	},
	computed: {
		validCloseTabAfterInput: function() {
			return parseFloat(this.closeTabAfterInput) >= 0;
		}
	},
	components: { SettingsIcon, CloseIcon, Button, ToggleButton },
	watch: {
		closeTabCheckbox: function(newVal) {
			this.$emit('closeTabChanged', newVal);
		},
		closeTabAfterInput: function(newVal) {
			if (this.validCloseTabAfterInput)
				this.$emit('closeTabAfterChanged', parseFloat(newVal));
		}
	},
	methods: {
		importFile: function() {
			const files = this.$refs.fileInput.files;
			if (files.length == 0) {
				this.showNotification('No file selected', 'error');
				return;
			}

			const reader = new FileReader();
			reader.addEventListener('load', event => {
				const correctData = weekDataCheck(event.target.result);

				if (correctData != null) {
					this.$emit('weekImport', correctData);
					console.log(event.target);
					this.showNotification('Imported Data', 'success');
				} else {
					this.showNotification('JSON format is wrong', 'error');
				}
			});

			reader.readAsText(this.$refs.fileInput.files[0]);
		},

		exportFile: function() {
			if (this.exportName.trim() == '') {
				this.showNotification('No filename specified', 'error');
				return;
			}

			var element = document.createElement('a');
			element.setAttribute(
				'href',
				'data:text/json;charset=utf-8,' +
					encodeURIComponent(JSON.stringify(this.week, null, 2))
			);
			element.setAttribute('download', this.exportName);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			this.showNotification('Exported ' + this.exportName, 'success');
		},

		showNotification: function(title, type) {
			this.$notify({
				group: 'main',
				title: title,
				duration: 5000,
				type: type
			});
		}
	}
};
</script>

<style scoped>
h2 {
	margin: 0px;
	color: var(--dark);
}

#settingsIcon {
	position: fixed;
	top: 0px;
	left: 0px;
	padding: 20px;
	background-color: var(--light);
	border-bottom-right-radius: 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	color: var(--dark);
}

#settingsIcon > * {
	transition: 0.3s ease;
}

#settingsIcon:hover > * {
	transform: rotate(30deg);
}

#settings {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: 0.3s ease;
	pointer-events: none;
}

#settings.open {
	opacity: 1;
	pointer-events: auto;
}

#settings > .background {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
}

#settings > .popup {
	position: relative;
	background-color: var(--light);
	padding: 20px;
	border-radius: 10px;
	display: grid;
	grid-template-columns: auto;
	place-items: center;
	gap: 20px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	transition: 0.4s ease;
	transform: scale(1.2);
}

#settings.open > .popup {
	transform: none;
}

#settings > .popup > #settingsCloseIcon {
	position: absolute;
	top: 20px;
	left: 20px;
}

#settings > .popup > .actions {
	display: grid;
	grid-template-columns: auto auto;
	gap: 10px;
	place-items: center;
}

#settings > .popup > .actions > input[type='text'] {
	padding: 7px;
}

#settings > .popup > .actions > .autoclose {
	display: flex;
	align-items: center;
	width: 100%;
}

#settings > .popup > .actions > .autoclose > input {
	width: 30px;
	margin: 0px 5px;
}

#settings > .popup > .actions > .toggle {
	margin: 10px;
}
</style>
