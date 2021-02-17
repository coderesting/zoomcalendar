<template>
	<div class="display">
		<h2>{{ name }}</h2>
		<div class="actions">
			<Button @click="$emit('edit')">
				<EditIcon :size="20" />
			</Button>

			<Button :disabled="password === ''" @click="copyPasswordToClipboard"
				><CopyIcon :size="20"
			/></Button>

			<Button @click="joinMeeting">
				<LaunchIcon :size="20" />
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
		password: String
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
				throw new Error('copy to clipboard failed');
			}
			await navigator.clipboard.writeText(this.password);
			this.$notify({
				group: 'main',
				title: 'Passord copied to clipboard',
				duration: 2000,
				type: 'success'
			});
		},

		joinMeeting: async function() {
			this.copyPasswordToClipboard().then(() => {
				window.open(this.link, '_blank');
			});
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
