<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<div class="flex flex-col gap-8 items-start">
			<div class="text-2xl text-left">
				Remaining Yearly Vacation Days: {{ userRemainingVacations }}
			</div>
			<form @submit.prevent="submit">
				<div class="flex gap-8 flex-wrap">
					<v-date
						:input-i-d="'startDate'"
						:input-value="startDate"
						:input-label="'Start Date'"
						:min="new Date()"
						:disabled="false"
						@startDateChange="(inputContent) => (startDate = inputContent)"
					/>
					<v-date
						:input-i-d="'endDate'"
						:input-value="endDate"
						:min="startDate"
						:input-label="'End Date'"
						:disabled="false"
						@startDateChange="(inputContent) => (endDate = inputContent)"
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
import VacationManager from '@/util/VacationManager'

export default {
	data() {
		return {
			userRemainingVacations: VacationManager.getUserVacationDays(),
			startDate: new Date(),
			endDate: new Date(),
		}
	},
	methods: {
		submit() {
			var vacationRequest = VacationManager.calculateVacationDays(this.endDate, this.startDate)
			console.log(vacationRequest)
		},
	},
}
</script>

<style></style>
