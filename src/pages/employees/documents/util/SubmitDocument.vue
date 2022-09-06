<template>
	<div class="flex flex-col gap-8 w-full">
		<h1 class="text-2xl">
			Submit Documents
		</h1>
		<v-dropzone :dropzone-i-d="'documentDropzone'" @uploaded="addFile" />
		<div class="flex flex-col w-full gap-1">
			<v-file-description
				v-for="(file, index) in files"
				:key="file.name"
				:file="file"
				:icon-action="[ { icon: 'fa fa-multiply', size: 'xl', class: 'cursor-pointer hover:text-red-500', action: () => { removeFile(index) }, }, ]"
			/>
		</div>
		<v-button
			class="w-full self-center"
			:type="'submit'"
			:text="'Submit'"
			:disabled="files.length == 0"
			:method="submit"
		/>
	</div>
</template>

<script>
import FileManager from '@/util/FileManager'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			files: [],
			fileDescriptionIcons: [],
		}
	},
	methods: {
		addFile(files) {
			this.files.push.apply(this.files, files)
			this.files = [...new Map(this.files.map((file) => [file['name'], file])).values()]
		},
		removeFile(fileIndex) {
			this.files.splice(fileIndex, 1)
		},
		submit() {
			this.$swal.fire({
				title: 'Your attachments has been submitted successfully!',
				icon: 'success',
			})
			FileManager.encodeFile(this.files, UsersManager.getActiveUser().ID)
			this.files = []
		},
	},
}
</script>

<style></style>
