<template>
	<form autocomplete="off" @submit.prevent="submit">
		<div>
			<h1 class="text-2xl">
				Complaint
			</h1>
			<div class="text-lg">
				Tell us what happened in the form below.
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-center gap-8">
			<v-input
				:input-i-d="'employeeName'"
				:type="'text'"
				:input-label="'Name of Employee'"
				:input-value="form.employeeName"
				:disabled="true"
				@employeeNameChange="(inputContent) => (form.employeeName = inputContent)"
			/>
			<v-date
				:input-i-d="'complaintDate'"
				:input-value="form.complaintDate"
				:input-label="'Date of Complaint'"
				:max="new Date()"
				:required="true"
				@complaintDateChange="(inputContent) => (form.complaintDate = inputContent)"
			/>
		</div>
		<div class="flex flex-wrap items-end justify-center gap-8">
			<v-textarea
				:text-area-i-d="'complaintDetails'"
				:value="form.complaintDetails"
				:input-label="'Describe accurately the details of your complaint and against whom:'"
				@complaintDetailsChange="(inputContent) => (form.complaintDetails = inputContent)"
			/>
			<v-textarea
				:text-area-i-d="'complaintReason'"
				:value="form.complaintReason"
				:input-label="'Describe how the incident you are complaining about has impacted negatively on your work:'"
				@complaintReasonChange="(inputContent) => (form.complaintReason = inputContent)"
			/>
		</div>
		<div class="flex flex-wrap items-end justify-center gap-8">
			<v-textarea
				:text-area-i-d="'complaintSolution'"
				:value="form.complaintSolution"
				:input-label="'Describe how the company can deal effectively with your complaint:'"
				@complaintSolutionChange="(inputContent) => (form.complaintSolution = inputContent)"
			/>
			<v-textarea
				:text-area-i-d="'additionalComments'"
				:value="form.additionalComments"
				:input-label="'Give additional comments which you believe will be important during further investigations of your complaint:'"
				@additionalCommentsChange="(inputContent) => (form.additionalComments = inputContent)"
			/>
		</div>
		<div class="text-lg">
			By signing here you declare that all information you have given here is truthful and accurate.
		</div>
		<div class="flex flex-wrap items-end justify-center gap-8">
			<v-input
				:input-i-d="'signature'"
				:type="'text'"
				:input-label="'Your Signature'"
				:input-value="form.signature"
				:disabled="false"
				@signatureChange="(inputContent) => (form.signature = inputContent)"
			/>
		</div>
		<v-button
			class="w-full self-center"
			:type="'submit'"
			:text="'Submit Complaint'"
		/>
	</form>
</template>

<script>
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			form: {
				employeeName: UsersManager.getActiveUser().username,
				complaintDate: new Date(),
				complaintDetails: '',
				complaintReason: '',
				complaintSolution: '',
				additionalComments: '',
				signature: '',
			},
		}
	},
	methods: {
		submit() {
			this.$swal
				.fire({
					title: 'Complaint submitted successfully!',
					icon: 'success',
				})
				.then((result) => {
					if (result.isConfirmed) {
						console.log('Submit')
					}
				})
		},
	},
}
</script>

<style></style>
