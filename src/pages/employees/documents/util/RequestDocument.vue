<template>
	<form
		autocomplete="off"
		class="self-center"
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
			<v-input
				:input-i-d="'employeeName'"
				:type="'text'"
				:input-label="'Name'"
				:input-value="userName"
				:disabled="true"
			/>
			<v-date
				:input-i-d="'requestDate'"
				:input-value="form.requestDate"
				:input-label="'Request Date'"
				:max="new Date()"
				:required="true"
				@requestDateChange="(inputContent) => (form.requestDate = inputContent)"
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
			userName: '',
			form: {
				requestDate: new Date(),
				documentType: '',
			},
		}
	},
	computed: {
		userFirstLastName() {
			var userName = {
				firstName: UsersManager.getActiveUser().firstName,
				lastName: UsersManager.getActiveUser().lastName,
			}
			return userName
		},
	},
	// ...
	watch: {
		userFirstLastName: {
			handler(newData) {
				this.userName = newData.firstName + ' ' + newData.lastName
			},
			// force eager callback execution
			immediate: true,
		},
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
				requestedFile: null,
				requestDate: this.form.requestDate.toLocaleDateString(),
				documentType: this.form.documentType,
				status: 'pending',
			}
			FileManager.addFile(documentRequest, 'requestedFiles')
		},
	},
}
</script>

<style></style>
