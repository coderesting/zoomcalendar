<template>
	<div class="display">
		<h2>{{ name }}</h2>
		<div class="actions">
			<Button title="Edit subject" @click="$emit('edit')">
				<EditIcon title="Edit subject" :size="20" />
			</Button>

			<Button
				title="Copy password to clipboard"
				:disabled="password === ''"
				@click="copyPasswordToClipboard"
				><CopyIcon title="Copy password to clipboard" :size="20"
			/></Button>

			<Button
				title="Launch Zoom meeting (also copies password)"
				@click="joinMeeting"
			>
				<LaunchIcon
					title="Launch Zoom meeting (also copies password)"
					:size="20"
				/>
			</Button>
		</div>
	</div>
</template>

<script>
import EditIcon from 'vue-material-design-icons/Pencil';
import CopyIcon from 'vue-material-design-icons/ContentCopy';
import LaunchIcon from 'vue-material-design-icons/Launch';
import Button from './Button.vue';

export default {
	name: 'SubjectDisplay',
	props: {
		name: String,
		link: String,
		password: String,
		closeTab: Boolean,
		closeTabAfter: Number
	},
	components: {
		EditIcon,
		CopyIcon,
		Button,
		LaunchIcon
	},

	data: () => {
		return {
			copyState: '',
			edit: true
		};
	},
	methods: {
		copyPasswordToClipboard: async function() {
			this.copyState = '';
			if (!navigator.clipboard) {
				this.$notify({
					group: 'main',
					title: 'Failed to copy the password',
					text: `Here is your pasword: ${this.password}`,
					duration: 10000,
					type: 'error'
				});
				throw new Error('Copy to clipboard failed');
			}
			await navigator.clipboard.writeText(this.password);
			this.$notify({
				group: 'main',
				title: 'Password copied to clipboard',
				duration: 2000,
				type: 'success'
			});
		},

		joinMeeting: async function() {
			await this.copyPasswordToClipboard();
			const win = window.open(this.link, '_blank');
			if (this.closeTab) {
				setTimeout(() => {
					win.close();
				}, this.closeTabAfter * 1000);
			}
		}
	}
};
</script>

<style>
.display {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.display > h2 {
	margin: 10px;
	font-size: 19px;
	margin-top: 0px;
	text-align: center;
	color: var(--light);
}

.display > .actions {
	display: flex;
	justify-content: center;
}

.display > .actions > a {
	text-decoration: none;
	display: flex;
	align-items: stretch;
}
</style>
