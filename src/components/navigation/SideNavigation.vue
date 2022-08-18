<template>
	<div class="sidenav px-3 py-2">
		<v-button
			class="w-full text-left"
			:text="'Home'"
			:has-border="false"
			:method=" () => { $router.push('/') } "
		/>
		<v-button
			class="w-full text-left"
			:text="'Home'"
			:has-border="false"
			:method=" () => { $router.push('/') } "
		/>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.sidenav {
	background-color: #060b23;
	align-items: flex-start;
	flex-direction: column;
	overflow-x: hidden;
	text-align: left;
	position: fixed;
	display: flex;
	height: 100%;
	width: 250px;
	z-index: 1;
	top: 3rem;
	gap: 4px;
	left: 0;
}
.sidenav a {
	width: 100%;
}
</style>
