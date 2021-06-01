<template>
	<input
		ref="input"
		class="input"
		:value="value"
		v-bind="{ ...$props, ...$attrs }"
		@input="updateValue($event.target.value)"
	/>
</template>

<script>
export default {
	props: { value: { type: [Number, String], default: null } },

	methods: {
		updateValue: function (value) {
			if (this.$attrs.type === 'file') value = this.$refs.input.files;
			this.$emit('input', value);
		},
	},
};
</script>

<style scoped>
input {
	background-color: transparent;
	border-radius: 5px;
	padding: 3px;
	border: solid var(--text) 2px;
	color: var(--text);
	font-family: Arial;
	font-size: inherit;
	width: 100%;
	min-width: 52px;
	box-sizing: border-box;
	transition: 0.2s ease;
}

input[type='file'] {
	cursor: pointer;
}

input.onColor {
	border-color: var(--text-on-color);
	color: var(--text-on-color);
	background-color: rgba(0, 0, 0, 0.2);
}

input:focus {
	outline: none;
}

input.error {
	border-color: var(--error);
}
</style>
