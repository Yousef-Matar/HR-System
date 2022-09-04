<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<div class="flex flex-col gap-8">
			<div class="text-2xl text-left">
				Remaining Yearly Vacation Days: {{ userRemainingVacations }}
			</div>
			<form @submit.prevent="submit">
				<div v-if="error.show" class="text-red-500 text-lg">
					<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;{{ error.message }}
				</div>
				<div class="flex flex-wrap items-center justify-center">
					<v-date
						class="m-4"
						:input-i-d="'startDate'"
						:input-value="startDate"
						:input-label="'Start Date'"
						:min="minDate"
						:max="maxDate"
						:disabled="userRemainingVacations > 0 ? false : true"
						@startDateChange="(inputContent) => (startDate = inputContent)"
					/>
					<v-date
						class="m-4"
						:input-i-d="'endDate'"
						:input-value="endDate"
						:min="startDate"
						:max="maxDate"
						:input-label="'End Date'"
						:disabled="userRemainingVacations > 0 ? false : true"
						@endDateChange="(inputContent) => (endDate = inputContent)"
					/>
				</div>
				<v-button
					class="w-full self-center"
					:type="'submit'"
					:text="'Submit Request'"
				/>
			</form>
		</div>
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
			test: new Date(),
			error: {
				show: false,
				message: 'You exceeded your yearly limit of vacation days.',
			},
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
				this.error.show = true
			} else {
				var vacationRequest = {
					ID: VacationManager.getAllVacationRequests().length == 0 ? 1 : VacationManager.getAllVacationRequests()[VacationManager.getAllVacationRequests().length - 1].ID + 1,
					requestedBy: UsersManager.getActiveUser(),
					handledBy: null,
					from: this.startDate.toLocaleDateString(),
					till: this.endDate.toLocaleDateString(),
					duration: vacationDays,
					status: 'pending',
				}
				VacationManager.addVacationRequest(vacationRequest)
			}
		},
	},
}
</script>

<style></style>
