<template>
	<div class="mx-auto p-8 rounded-3xl bg-background flex flex-col gap-8 w-fit text-red-500">
		<h1 class="text-6xl">
			<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;Error 403
		</h1>
		<h1 class="text-5xl">
			Access Denied
		</h1>
		<v-button
			class="self-center w-full"
			:text="'Back'"
			:method="goBack"
		/>
	</div>
</template>

<script>
export default {
	methods: {
		goBack() {
			history.back()
		},
	},
}
</script>

<style></style>
