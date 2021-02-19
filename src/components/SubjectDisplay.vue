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
			>
				<CopyIcon title="Copy password to clipboard" :size="20" />
			</Button>

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
	components: {
		EditIcon,
		CopyIcon,
		Button,
		LaunchIcon,
	},
	props: {
		name: { type: String, required: true },
		link: { type: String, required: true },
		password: { type: String, required: true },
		closeTab: { type: Boolean, required: true },
		closeTabAfter: { type: Number, required: true },
	},

	data: () => {
		return {
			edit: true,
		};
	},
	methods: {
		copyPasswordToClipboard: async function () {
			let status = 0;
			if (navigator.clipboard) {
				try {
					await navigator.clipboard.writeText(this.password);
					status = 2;
				} catch (error) {
					status = 0;
				}
			}

			if (status == 0) {
				const inputElm = document.createElement('input');
				inputElm.setAttribute('type', 'text');
				inputElm.style.opacity = 0;
				inputElm.value = this.password;
				document.body.appendChild(inputElm);
				inputElm.select();
				status = 1;
				if (!document.execCommand('copy')) status = 0;
				inputElm.remove();
			}

			switch (status) {
				case 2:
					this.$notify({
						group: 'main',
						title: 'Password copied to clipboard',
						duration: 2000,
						type: 'success',
					});
					break;
				case 1:
					this.$notify({
						group: 'main',
						title:
							'Not sure if the password was copied to clipboard (just try)',
						text: `Here is your pasword for backup: ${this.password}`,
						duration: 20000,
					});
					break;
				case 0:
					this.$notify({
						group: 'main',
						title: 'Failed to copy the password to clipboard',
						text: `Here is your pasword: ${this.password}`,
						duration: 20000,
						type: 'error',
					});
					break;
			}
		},

		joinMeeting: async function () {
			this.copyPasswordToClipboard().finally(() => {
				const win = window.open(this.link, '_blank');
				if (this.closeTab) {
					setTimeout(() => {
						win.close();
					}, this.closeTabAfter * 1000);
				}
			});
		},
	},
};
</script>

<style scoped>
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
</style>
