<template>
	<form
		autocomplete="off"
		class="self-center formContainer"
		@submit.prevent="submit"
	>
		<div>
			<h1 class="text-2xl">
				Request A Document
			</h1>
			<div class="text-lg">
				Tell us how can we assist you.
			</div>
		</div>
		<div class="flex flex-col gap-8">
			<v-date
				:input-i-d="'requestDate'"
				:input-value="form.requestDate"
				:input-label="'Request Date'"
				:disabled="true"
			/>
			<v-select
				:select-i-d="'documentType'"
				:select-label="'Document Type'"
				:select-value="form.documentType"
				:items="documentTypes"
				:required="true"
				@documentTypeChange="(selectContent) => (form.documentType = selectContent)"
			/>
		</div>

		<v-button
			class="w-full self-center"
			:type="'submit'"
			:text="'Submit Request'"
		/>
	</form>
</template>

<script>
import FileManager from '@/util/FileManager'
import SelectOptions from '@/util/SelectOptions'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			documentTypes: SelectOptions.getDocumentTypes(),
			form: {
				requestDate: new Date(),
				documentType: '',
			},
		}
	},
	methods: {
		submit() {
			this.$swal.fire({
				title: 'Your request has been submitted successfully!',
				icon: 'success',
			})
			var documentRequest = {
				ID: FileManager.getFileID(),
				userID: UsersManager.getActiveUser().ID,
				handledBy: null,
				handleDate: null,
				requestedFile: [],
				requestDate: this.form.requestDate.toLocaleDateString(),
				documentType: this.form.documentType,
				status: 'pending',
			}
			this.form.documentType = ''
			FileManager.addFile(documentRequest, 'requestedFiles')
		},
	},
}
</script>

<style></style>
