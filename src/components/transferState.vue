<template>
	<Dialog v-model="open" name="Import Data">
		<div id="transferState">
			<div class="mutations">
				<template
					v-for="[name, mutation] of Object.entries(importValues)"
					class="mutation"
				>
					<span :key="'1' + name">{{ name }}:</span>
					<span :key="'2' + name" class="value">{{
						mutation.value
					}}</span>
					<ToggleButton
						v-if="mutation.valid"
						:key="'3' + name"
						v-model="mutation.import"
						:color="appColor"
					/>

					<ErrorIcon
						v-if="!mutation.valid"
						:key="'4' + name"
						class="errorIcon"
						:title="name + ' is not valid'"
						:fill-color="errorColor"
					/>
				</template>
			</div>
			<div class="actions">
				<Button @click="discard">Discard</Button>
				<Button @click="mutate">Import</Button>
			</div>
		</div>
	</Dialog>
</template>

<script>
import Dialog from './Dialog';
import ErrorIcon from 'vue-material-design-icons/AlertCircleOutline';
import Button from './Button';
import { ToggleButton } from 'vue-js-toggle-button';
import validate from '../store/validate';
import sanitizeWeek from '../weekManipulation/sanitizeWeek';

const validMutations = {
	closeTabAfter: {
		validate: validate.closeTabAfter.bind(null),
		mutate: (store, value) => store.commit('SET_CLOSE_TAB_AFTER', value),
	},
	closeTab: {
		validate: validate.closeTab.bind(null),
		mutate: (store, value) => store.commit('SET_CLOSE_TAB', value),
	},
	darkTheme: {
		validate: validate.darkTheme.bind(null),
		mutate: (store, value) => store.commit('SET_DARK_THEME', value),
	},
	centuria: {
		validate: validate.centuria.bind(null),
		mutate: (store, value) => store.commit('SET_CENTURIA', value),
	},
	semester: {
		validate: validate.semester.bind(null),
		mutate: (store, value) => store.commit('SET_SEMESTER', value),
	},
	syncSchedule: {
		validate: validate.syncSchedule.bind(null),
		mutate: (store, value) => store.commit('SET_SYNC_SCHEDULE', value),
	},
	week: {
		validate: (week) => (sanitizeWeek(week) !== null ? true : false),
		mutate: (store, value) =>
			store.commit('SET_USER_WEEK', sanitizeWeek(value)),
	},
};

export default {
	name: 'TransferState',
	components: {
		Button,
		ErrorIcon,
		ToggleButton,
		Dialog,
	},
	props: {},
	data: function () {
		return {
			open: false,
			importValues: {},
		};
	},
	computed: {
		errorColor: function () {
			return getComputedStyle(document.body).getPropertyValue('--error');
		},
		appColor: function () {
			return getComputedStyle(document.body).getPropertyValue(
				'--app-color'
			);
		},
	},

	watch: {},
	mounted() {
		if (location.hash.startsWith('#import'))
			this.parseMutations(decodeURI(location.hash.substring(7)));
	},
	methods: {
		parseMutations(text) {
			try {
				const state = JSON.parse(text);
				for (let mutation in state) {
					const value = state[mutation];
					const valid =
						validMutations[mutation] != null &&
						validMutations[mutation].validate(value);

					this.importValues[mutation] = {
						valid,
						value,
						import: valid,
					};
				}

				this.open = true;
			} catch (e) {
				this.$notify({
					group: 'main',
					title: 'Failed to import data',
					duration: 5000,
					type: 'error',
				});
			}
		},

		mutate() {
			for (const [mutationName, mutation] of Object.entries(
				this.importValues
			)) {
				if (mutation.import) {
					validMutations[mutationName].mutate(
						this.$store,
						mutation.value
					);
				}
			}
			this.discard();
		},
		discard() {
			this.open = false;
			window.location = '';
		},
	},
};
</script>

<style scoped>
#transferState {
	width: 100%;
}
#transferState > .mutations {
	display: grid;
	grid-template-columns: auto auto 50px;
	gap: 15px;
	width: 100%;
	margin: 10px auto;
}

#transferState > .mutations > .value {
	max-width: 150px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#transferState > .mutations .errorIcon {
	place-self: center;
}

#transferState > .actions {
	display: flex;
	justify-content: center;
}
</style>
