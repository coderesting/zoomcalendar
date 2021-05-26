<template>
	<ToggleButton
		:margin="5"
		:width="61"
		:height="28"
		:sync="sync"
		:color="{
			checked: 'var(--app-color)',
			unchecked: 'var(--background-hover)',
		}"
		:disabled="disabled"
		:value="value"
		@input="(value) => this.$emit('input', value)"
	/>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';

export default {
	name: 'Toggle',
	components: {
		ToggleButton,
	},
	props: {
		sync: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		value: { type: Boolean, default: false },
	},
};
</script>

<style scoped></style>
