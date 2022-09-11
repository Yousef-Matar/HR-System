<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<v-alert
			:text="error.show ? error.message : success.message"
			:show="error.show ? error.show : success.show"
			:variant="error.show ? 'error' : 'success'"
		/>
		<div class="flex flex-col gap-8">
			<div class="text-2xl text-left">
				Remaining Yearly Vacation Days: {{ userRemainingVacations }}
			</div>
			<form @submit.prevent="submit">
				<div class="flex flex-wrap items-center justify-center gap-8">
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
				</div>
				<v-button
					:disabled="success.show || error.show"
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
			error: {
				show: false,
				message: 'You exceeded the yearly limit of vacation days.',
			},
			success: {
				show: false,
				message: 'Your request has been successfully sent.',
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
				setTimeout(() => {
					this.error.show = false
				}, 2000)
			} else {
				this.success.show = true
				this.error.show = false
				setTimeout(() => {
					this.success.show = false
				}, 2000)

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
			}
		},
	},
}
</script>

<style></style>
