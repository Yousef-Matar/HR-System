<template>
	<div>
		<div class="h-screen w-screen bg-black fixed top-0 left-0 opacity-40 z-20" @click="closeModal()" />
		<div class="modal z-30">
			<div class="flex">
				<div class="bg-background shadow z-30 text-primary border border-primary rounded-3xl p-5">
					<h1 class="text-2xl">
						<slot name="ModalHeader" />
					</h1>
					<main class="m-3">
						<slot name="ModalBody" />
					</main>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
