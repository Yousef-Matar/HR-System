<template>
	<div>
		<div
			class="h-screen w-screen bg-black fixed top-0 left-0 opacity-40"
			:class="variant == 'primary' ? 'z-20' : 'z-40'"
			@click="closeModal()"
		/>
		<div class="modal w-full md:w-3/4" :class="variant == 'primary' ? 'z-30' : 'z-50'">
			<div class="bg-background shadow border rounded-3xl p-8 gap-8 flex flex-col" :class="variant == 'primary' ? 'border-primary text-primary z-30' : 'text-red-500 border-red-600 z-50'">
				<h1 class="text-2xl text-left">
					<slot name="ModalHeader" />
				</h1>
				<main>
					<slot name="ModalBody" />
				</main>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		variant: {
			type: String,
			default: 'primary',
			validator: (value) => ['primary', 'danger'].includes(value),
		},
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
	},
}
</script>

<style scoped>
.modal {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
