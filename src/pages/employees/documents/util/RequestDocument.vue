<template>
	<form autocomplete="off" @submit.prevent="submit">
		<div>
			<h1 class="text-2xl">
				Request a document
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

			<v-textarea
				:text-area-i-d="'requestDetails'"
				:value="form.requestDetails"
				:input-label="'Describe accurately the details of your request:'"
				@requestDetailsChange="(inputContent) => (form.requestDetails = inputContent)"
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
import DocumentManager from '@/util/DocumentManager'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			userName: UsersManager.getActiveUser().firstName + ' ' + UsersManager.getActiveUser().lastName,
			form: {
				requestDate: new Date(),
				requestDetails: '',
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
				ID: DocumentManager.getAllDocumentRequests().length == 0 ? 1 : DocumentManager.getAllDocumentRequests()[DocumentManager.getAllDocumentRequests().length - 1].ID + 1,
				userID: UsersManager.getActiveUser().ID,
				handledBy: null,
				requestDate: this.form.requestDate.toLocaleDateString(),
				requestDetails: this.form.requestDetails,
				status: 'pending',
			}
			DocumentManager.addDocumentRequest(documentRequest)
		},
	},
}
</script>

<style></style>
