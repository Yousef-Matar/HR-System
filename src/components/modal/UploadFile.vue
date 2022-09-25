<template>
	<teleport to="body">
		<v-modal
			v-if="showModal"
			:variant="'primary'"
			@closeModal="$emit('closeModal')"
		>
			<template #ModalHeader>
				Upload Files
			</template>

			<template #ModalBody>
				<div class="flex flex-col gap-8 min-w-[15rem]">
					<v-dropzone :dropzone-i-d="'documentDropzone'" @uploaded="addFile" />
					<div class="flex flex-col gap-1 overflow-y-auto max-h-40">
						<v-file-description
							v-for="(file, index) in dataFiles"
							:key="file.name"
							:file="file"
							:icon-action="[ { icon: 'fa fa-multiply', size: 'xl', class: 'cursor-pointer hover:text-red-500', action: () => { removeFile(index) }, }, ]"
						/>
					</div>
					<div class="flex justify-between flex-wrap gap-1">
						<v-button
							class="w-20 self-center"
							:type="'submit'"
							:text="'Confirm'"
							:disabled="dataFiles.length == 0"
							:method="submit"
						/>
						<v-button
							:type="'button'"
							:text="'Cancel'"
							:variant="'danger'"
							:method="closeModal"
							class="w-20 self-center"
						/>
					</div>
				</div>
			</template>
		</v-modal>
	</teleport>
</template>
<script>
import FileManager from '@/util/FileManager'

export default {
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
		files: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['closeModal', 'uploadFiles'],
	data() {
		return {
			dataFiles: [],
		}
	},
	watch: {
		files: {
			handler(newFiles) {
				this.dataFiles = []
				newFiles.forEach((encodedFile) => {
					FileManager.decodeFile(encodedFile.fileURL, encodedFile.fileName, encodedFile.fileType).then((file) => {
						this.dataFiles.push(file)
					})
				})
			},
			// force eager callback execution
			immediate: true,
		},
	},
	methods: {
		closeModal() {
			this.$emit('closeModal')
		},
		addFile(files) {
			this.dataFiles.push.apply(this.dataFiles, files)
			this.dataFiles = [...new Map(this.dataFiles.map((file) => [file['name'], file])).values()]
		},
		removeFile(fileIndex) {
			this.dataFiles.splice(fileIndex, 1)
		},
		submit() {
			this.$emit('uploadFiles', this.dataFiles)
			this.closeModal()
		},
	},
}
</script>
<style></style>
