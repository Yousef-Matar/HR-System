<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit flex flex-col items-center">
		<h1 class="text-2xl mb-3 w-full">
			<div>Request Vacation</div>
			<div class="text-left">
				Remaining Yearly Vacation Days: {{ userRemainingVacations }}
			</div>
		</h1>
		<form class="formContainer" @submit.prevent="submit">
			<v-date
				:input-i-d="'startDate'"
				:input-value="startDate"
				:input-label="'Start Date'"
				:min="minDate"
				:max="maxDate"
				:disabled="userRemainingVacations > 0 ? false : true"
				@startDateChange="(inputContent) => (startDate = inputContent)"
			/>
			<v-date
				:input-i-d="'endDate'"
				:input-value="endDate"
				:min="startDate"
				:max="maxDate"
				:input-label="'End Date'"
				:disabled="userRemainingVacations > 0 ? false : true"
				@endDateChange="(inputContent) => (endDate = inputContent)"
			/>

			<v-button
				class="w-full"
				:type="'submit'"
				:text="'Submit Request'"
			/>
		</form>
	</div>
</template>

<script>
import UsersManager from '@/util/UsersManager'
import VacationManager from '@/util/VacationManager'

export default {
	data() {
		return {
			userRemainingVacations: VacationManager.getUserVacationDays(),
			startDate: null,
			endDate: null,
			maxDate: null,
			minDate: null,
		}
	},
	beforeMount() {
		const today = new Date()
		this.minDate = new Date(today)
		this.startDate = new Date(today)
		this.maxDate = new Date(today.getFullYear() + 1, 0, 1)
		this.endDate = new Date(this.startDate)
	},
	methods: {
		submit() {
			var vacationDays = VacationManager.calculateVacationDays(this.startDate, this.endDate)
			if (vacationDays > this.userRemainingVacations) {
				this.$swal.fire('', 'You exceeded the yearly limit of vacation days.', 'error')
			} else {
				var vacationRequest = {
					ID: VacationManager.getVacationRequestID(),
					requestedBy: UsersManager.getActiveUser().ID,
					handledBy: null,
					from: this.startDate.toLocaleDateString(),
					till: this.endDate.toLocaleDateString(),
					duration: vacationDays,
					status: 'pending',
				}
				VacationManager.addVacationRequest(vacationRequest)
				this.$swal.fire('Successfull', 'Your request has been successfully sent.', 'success')
			}
		},
	},
}
</script>

<style></style>
