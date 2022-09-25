<template>
	<div class="rounded m-1 p-2 w-full border text-left border-red-500 text-red-500 flex items-center justify-between">
		<div>
			<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;
			{{ error }}
		</div>
		<font-awesome-icon
			icon="fa fa-multiply"
			class="cursor-pointer p-1"
			@click="hideError"
		/>
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: String,
			required: true,
		},
	},
	methods: {
		hideError() {
			this.$store.dispatch('hideError')
		},
	},
}
</script>

<style></style>
