<template>
	<div class="add">
		<span
			class="plusSymbol"
			title="Add new subject"
			@click="$store.commit('ADD_SUBJECT', dayIdx)"
			>+</span
		>
	</div>
</template>

<script>
export default {
	name: 'AddSymbol',
	props: {
		dayIdx: { type: Number, required: true },
	},
};
</script>

<style scoped>
.add > .plusSymbol {
	cursor: pointer;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	border-radius: 100px;
	font-size: 30px;
	color: var(--text-on-color);
	background: var(--app-color);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	transition: 0.3s ease;
}

.add > .plusSymbol:hover {
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
