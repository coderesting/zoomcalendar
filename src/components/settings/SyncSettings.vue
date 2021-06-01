<template>
	<div id="syncSettings">
		<Login />

		<div class="actions">
			<img
				v-if="$store.state.settings.loggedIn"
				:src="$store.state.settings.avatarURL"
			/>
			<Button
				v-if="$store.state.settings.loggedIn"
				@click="() => logout()"
				>Logout</Button
			>

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
		</div>
	</div>
</template>

<script>
import sanitizeWeek from '../../weekManipulation/sanitizeWeek.js';
import Button from '../standard/Button';
import Input from '../standard/Input';
import validate from '../../utils/validate';
import Login from './Login';

export default {
	name: 'Settings',
	components: {
		Button,
		Input,
		Login,
	},
	props: {},
	data: function () {
		return {
			exportName: 'plan.json',
			importFiles: null,
		};
	},
	computed: {
		validExportName() {
			return validate.exportName(this.exportName);
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
		logout: function () {
			this.$store.commit('SET_LOGIN_STATE', false);
			this.$store.commit('SET_AVATAR_URL', null);
			window.location.href = `https://zoom.icetoast.cloud/api/user/logout`;
		},
	},
};
</script>

<style scoped>
#syncSettings > .actions img {
	border-radius: 100%;
	cursor: auto;
	width: 40px;
	height: 40px;
}

#syncSettings > .actions {
	display: grid;
	grid-template-columns: auto auto;
	gap: 10px;
	align-items: center;
}
</style>
