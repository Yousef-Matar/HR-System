<template>
	<div>
		<teleport to="body">
			<ReusableModal v-if="showModal" @closeModal="$emit('closeModal')">
				<template #ModalHeader>
					Header
				</template>

				<template #ModalBody>
					Body
				</template>
			</ReusableModal>
		</teleport>
	</div>
</template>
<script>
import ReusableModal from '@/components/util/ReusableModal'

export default {
	components: { ReusableModal },
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
<style></style>
