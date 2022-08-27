<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<div class="flex flex-col gap-8 items-start">
			<div class="text-2xl items-start flex">
				Remaining Yearly Vacation Days: {{ userRemainingVacations }}
			</div>
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
		}
	},
}
</script>

<style></style>
