<template>
	<div class="flex flex-col gap-8 w-full">
		<h1 class="text-2xl">
			My Documents
		</h1>
		<div class="flex w-full gap-8">
			<div class="flex flex-col w-full gap-1">
				<h1 class="text-xl text-left">
					Submitted Documents:
				</h1>
				<v-file-description
					v-for="file in uploadedDecodedFiles"
					:key="file.ID"
					:file="file.data"
					:icon-action="[ { icon: 'fa fa-file-arrow-down', size: 'xl', class: 'cursor-pointer hover:text-primary', action: () => { downloadFile(file.data) }, }, { icon: 'fa fa-multiply', size: 'xl', class: 'cursor-pointer hover:text-red-500', action: () => { deleteFile(file.ID, 'uploadedFiles') }, }, ]"
				/>
				<div v-if="uploadedDecodedFiles.length == 0" class="p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded m-0 flex justify-between items-center">
					<div class="flex items-start flex-col text-left">
						<p>No files have been submitted yet.</p>
					</div>
				</div>
			</div>
			<div class="flex flex-col w-full gap-1">
				<h1 class="text-xl text-left">
					Requested Documents:
				</h1>
				<v-file-description
					v-for="file in requestedDecodedFiles.approvedFiles"
					:key="file.ID"
					:file="file.data"
					:icon-action="[ { icon: 'fa fa-file-arrow-down', size: 'xl', class: 'cursor-pointer hover:text-primary', action: () => { downloadFile(file.data) }, }, ]"
				/>
				<v-file-status
					v-for="file in requestedDecodedFiles.rejectedFiles"
					:key="file.ID"
					:file="file"
					:icon-action="[ { icon: 'fa fa-multiply', size: 'xl', class: 'cursor-pointer hover:text-red-500', action: () => { deleteFile(file.ID, 'requestedFiles') }, }, ]"
				/>
				<v-file-status
					v-for="file in requestedDecodedFiles.pendingFiles"
					:key="file.ID"
					:file="file"
					:icon-action="[ { icon: 'fa fa-multiply', size: 'xl', class: 'cursor-pointer hover:text-red-500', action: () => { deleteFile(file.ID, 'requestedFiles') }, }, ]"
				/>
				<div v-if="requestedDecodedFiles.approvedFiles.length == 0 && requestedDecodedFiles.pendingFiles.length == 0 && requestedDecodedFiles.rejectedFiles.length == 0" class="p-2 text-sm font-normal text-gray-400 bg-gray-800 bg-clip-padding border shadow border-gray-600 rounded m-0 flex justify-between items-center">
					<div class="flex items-start flex-col text-left">
						<p>No files have been sent yet.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FileManager from '@/util/FileManager'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			userUploadedEncodedFiles: FileManager.getUserUploadedFiles(UsersManager.getActiveUser().ID),
			uploadedDecodedFiles: [],
			userRequestedEncodedFiles: FileManager.getUserRequestedFiles(UsersManager.getActiveUser().ID),
			requestedDecodedFiles: {
				approvedFiles: [],
				pendingFiles: [],
				rejectedFiles: [],
			},
		}
	},
	watch: {
		userUploadedEncodedFiles: {
			handler(newFiles) {
				this.uploadedDecodedFiles = []
				newFiles.forEach((encodedFile) => {
					FileManager.decodeFile(encodedFile.fileURL, encodedFile.fileName, encodedFile.fileType).then((file) => {
						this.uploadedDecodedFiles.push({
							ID: encodedFile.ID,
							data: file,
						})
					})
				})
			},
			// force eager callback execution
			immediate: true,
		},
		userRequestedEncodedFiles: {
			handler(newFiles) {
				this.requestedDecodedFiles = {
					approvedFiles: [],
					pendingFiles: [],
					rejectedFiles: [],
				}
				newFiles.forEach((encodedFile) => {
					switch (encodedFile.status) {
						case 'approved':
							encodedFile.requestedFile.forEach((requestedFile) => {
								FileManager.decodeFile(requestedFile.fileURL, requestedFile.fileName, requestedFile.fileType).then((file) => {
									this.requestedDecodedFiles.approvedFiles.push({
										ID: encodedFile.ID,
										data: file,
									})
								})
							})

							break
						case 'rejected':
							this.requestedDecodedFiles.rejectedFiles.push(encodedFile)
							break

						default:
							this.requestedDecodedFiles.pendingFiles.push(encodedFile)
							break
					}
				})
			},
			// force eager callback execution
			immediate: true,
		},
	},

	methods: {
		deleteFile(fileID, fileType) {
			this.$swal
				.fire({
					title: 'Are you sure?',
					text: 'You won\'t be able to revert this!',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, delete it!',
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.$swal.fire('Deleted!', 'Your file has been deleted.', 'success')
						FileManager.deleteFile(fileID, fileType)
						this.userUploadedEncodedFiles = FileManager.getUserUploadedFiles(UsersManager.getActiveUser().ID)
						this.userRequestedEncodedFiles = FileManager.getUserRequestedFiles(UsersManager.getActiveUser().ID)
					}
				})
		},
		downloadFile(file) {
			var url = window.URL.createObjectURL(file)
			var link = document.createElement('a')
			link.download = file.name
			link.href = url
			link.click()
			window.URL.revokeObjectURL(url)
		},
	},
}
</script>

<style></style>
