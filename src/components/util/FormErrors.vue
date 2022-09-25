<template>
	<div v-if="error.show" class="rounded m-1 p-2 w-full border text-left border-red-500 text-red-500 flex items-center justify-between">
		<div>
			<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;
			{{ error.message }}
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
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			initialError: {},
		}
	},
	watch: {
		error: {
			handler(newError) {
				this.initialError = newError
			},
			// force eager callback execution
			immediate: true,
		},
	},
	methods: {
		hideError() {
			this.initialError.show = false
		},
	},
}
</script>

<style></style>
