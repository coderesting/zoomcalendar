<template>
	<div class="dialog" :class="{ open: value }">
		<div class="background" @click="$emit('input', false)"></div>
		<div class="popup">
			<div class="header">
				<CloseIcon
					class="closeIcon"
					:size="28"
					@click="$emit('input', false)"
				/>
				<h2>{{ name }}</h2>
				<a
					:class="{
						helpIcon: true,
						disabled: helpLink === '',
					}"
					:href="helpLink"
					target="_blank"
					><HelpIcon :size="28"
				/></a>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';
import HelpIcon from 'vue-material-design-icons/HelpCircleOutline';

export default {
	name: 'Dialog',
	components: {
		CloseIcon,
		HelpIcon,
	},
	props: {
		value: { type: Boolean, required: true },
		helpLink: { type: String, default: '' },
		name: { type: String, required: true },
	},
};
</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 15px;
}
h2 {
	margin: 0px;
}

.header > .helpIcon {
	text-decoration: none;
	color: inherit;
}

.header > .helpIcon.disabled {
	opacity: 0;
	pointer-events: none;
}

.dialog {
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
	z-index: 10;
}

.dialog.open {
	opacity: 1;
	pointer-events: auto;
}

.dialog > .background {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
}

.dialog > .popup {
	position: relative;
	color: var(--text);
	background-color: var(--background);
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	transition: 0.4s ease;
	transform: scale(1.2);
	min-width: 300px;
}

.dialog.open > .popup {
	transform: none;
}
</style>
