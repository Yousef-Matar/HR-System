<template>
	<teleport to="body">
		<v-modal
			v-if="showModal"
			:variant="'danger'"
			@closeModal="$emit('closeModal')"
		>
			<template #ModalHeader>
				<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp; Warning
			</template>

			<template #ModalBody>
				<h1 class="text-xl">
					Due to inactivity, you will be logged out soon.
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
	},
}
</script>
<style></style>
