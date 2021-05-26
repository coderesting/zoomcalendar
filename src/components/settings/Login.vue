<template>
	<div id="loginOptions">
		<img src="assets/login/google.svg" />
		<img src="assets/login/discord.svg" />
		<img src="assets/login/github.svg" />
	</div>
</template>

<script>
export default {
	name: 'Login',
};
</script>

<style scoped>
#loginOptions {
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 20px;
}

#loginOptions > img {
	width: 40px;
	height: 40px;
	cursor: pointer;
}
</style>
