<template>
	<button v-bind="$props" v-on="$listeners">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'Button',
	created: function () {},
};
</script>

<style scoped>
button {
	--button-color: var(--text);
	--button-text-hover: var(--background);
	font-size: 15px;
	font-family: Arial;
	color: var(--button-color);
	text-align: center;
	display: block;
	margin: 7px;
	padding: 5px 10px;
	background-color: transparent;
	border: solid var(--button-color) 2px;
	border-radius: 20px;
	cursor: pointer;
	transition: 0.2s ease;
	text-decoration: none;
	white-space: nowrap;
}

button.onColor {
	--button-color: var(--text-on-color);
	--button-text-hover: var(--text-on-color-contrast);
}

button:hover {
	color: var(--button-text-hover);
	background-color: var(--button-color);
}

button:disabled {
	opacity: 0.4;
	pointer-events: none;
}

button:focus {
	outline: none;
}
</style>
