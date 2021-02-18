<template>
	<div class="add">
		<span class="plusSymbol" title="Add new subject" @click="$emit('add')"
			>+</span
		>
	</div>
</template>

<script>
export default {
	name: 'AddSymbol',
	props: {
		dayIdx: Number
	},
	components: {}
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
	color: var(--light);
	background: var(--gradient);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	transition: 0.3s ease;
}

.add > .plusSymbol:hover {
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
</style>
