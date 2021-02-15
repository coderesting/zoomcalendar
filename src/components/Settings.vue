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
					<button class="dark" @click="importFile()">Import</button>
					<input type="text" v-model="exportName" />
					<button class="dark" @click="exportFile()">Export</button>
				</div>
				<span :class="{ status, active: status == 'ok' ? 0 : 1 }">{{
					status
				}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import SettingsIcon from "vue-material-design-icons/Cog";
import CloseIcon from "vue-material-design-icons/Close";
import weekDataCheck from "../util/weekDataCheck.js";

export default {
	name: "Settings",
	props: { week: Array },
	data: function() {
		return {
			status: "ok",
			exportName: "plan.json",
			open: false,
		};
	},
	components: { SettingsIcon, CloseIcon },
	watch: {
		open: function(newVal) {
			if (newVal == false) this.status = "ok";
		},
	},
	methods: {
		importFile: function() {
			const files = this.$refs.fileInput.files;
			if (files.length == 0) {
				this.setStatus("No file selected");
				return;
			}

			const reader = new FileReader();
			reader.addEventListener("load", (event) => {
				const correctData = weekDataCheck(event.target.result);

				if (correctData != null) {
					this.$emit("weekImport", correctData);
					this.setStatus("Imported JSON");
				} else {
					this.setStatus("JSON format is wrong");
				}
			});

			reader.readAsText(this.$refs.fileInput.files[0]);
		},

		exportFile: function() {
			if (this.exportName.trim() == "") {
				this.setStatus("No fileName specified");
				return;
			}

			var element = document.createElement("a");
			element.setAttribute(
				"href",
				"data:text/json;charset=utf-8," +
					encodeURIComponent(JSON.stringify(this.week, null, 2))
			);
			element.setAttribute("download", this.exportName);
			element.style.display = "none";
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			this.setStatus("Exported " + this.exportName);
		},

		setStatus: function(text) {
			this.status = "ok";
			setTimeout(() => {
				this.status = text;
			}, 100);
		},
	},
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

#settings > .popup > .actions > input[type="text"] {
	color: var(--dark);
	padding: 7px;
}

#settings > .popup > .status {
	opacity: 0;
}

#settings > .popup > .status.active {
	transition: 0.3s ease;
	opacity: 1;
}
</style>
