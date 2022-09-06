<template>
	<label
		:for="dropzoneID"
		class="p-1 text-base font-normal text-white bg-gray-800 bg-clip-padding border border-gray-600 rounded m-0 shadow focus:outline-none cursor-pointer hover:shadow-[#adffff] focus:border-[#adffff]"
		:class="active ? 'shadow-[#adffff] border-[#adffff]' : ''"
		@dragenter.prevent="toggleActive"
		@dragleave.prevent="toggleActive"
		@dragover.prevent
		@drop.prevent="onFileDrop"
	>
		<div class="p-5" :class="active ? 'border-[#adffff] border border-dashed opacity-50' : ''">
			<font-awesome-icon icon="fa fa-file-arrow-up" size="4x" />
			<p class="text-center mt-4">
				<strong>Drag and drop files to upload</strong>
			</p>
			<p class="text-center text-gray-400">
				<small>Your files will be added automatically</small>
			</p>
			<input
				:id="dropzoneID"
				type="file"
				class="hidden"
				:multiple="multiple"
				:required="required"
				@change="onFileSelected"
			>
		</div>
	</label>
</template>

<script>
export default {
	props: {
		dropzoneID: {
			type: String,
			default: 'dropzoneID',
			required: true,
		},
		multiple: {
			type: Boolean,
			default: true,
		},
		required: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			files: '',
			active: false,
		}
	},
	methods: {
		toggleActive() {
			this.active = !this.active
		},
		onFileDrop(event) {
			this.active = !this.active
			if (Array.from(event.dataTransfer.files).find((file) => file.size == 0)) {
				this.$swal.fire({
					title: 'Invalid attachment size!',
					icon: 'error',
				})
				return
			}
			this.files = event.dataTransfer.files
			this.$emit('uploaded', this.files)
		},
		onFileSelected(event) {
			if (Array.from(event.target.files).find((file) => file.size == 0)) {
				this.$swal.fire({
					title: 'Invalid attachment size!',
					icon: 'error',
				})
				return
			}
			this.files = event.target.files
			this.$emit('uploaded', this.files)
		},
	},
}
</script>

<style></style>
