<template>
	<button v-bind="$props" v-on="$listeners">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'Button',
	created: function() {}
};
</script>

<style scoped>
button {
	font-size: 15px;
	font-family: Arial;
	color: var(--light);
	text-align: center;
	display: block;
	margin: 7px;
	padding: 5px 10px;
	background-color: transparent;
	border: solid var(--light) 2px;
	border-radius: 20px;
	cursor: pointer;
	transition: 0.2s ease;
	text-decoration: none;
	white-space: nowrap;
}

button.dark {
	color: var(--dark);
	border-color: var(--dark);
}

button:hover {
	background-color: var(--light);
	color: var(--dark);
}

button:hover.dark {
	background-color: var(--dark);
	color: var(--light);
}

button:disabled {
	opacity: 0.4;
	pointer-events: none;
}

button:focus {
	outline: none;
}
</style>
