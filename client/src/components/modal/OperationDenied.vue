<template>
	<teleport to="body">
		<v-modal
			v-if="showModal"
			:variant="'danger'"
			@closeModal="$emit('closeModal')"
		>
			<template #ModalHeader>
				<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp; Operation Denied
			</template>

			<template #ModalBody>
				<h1 class="text-xl">
					{{ modalMessage }}
				</h1>
			</template>
		</v-modal>
	</teleport>
</template>
<script>
export default {
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
		modalMessage: {
			type: String,
			required: true,
			default: 'Modal Message',
		},
	},
}
</script>
<style></style>
