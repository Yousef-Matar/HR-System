<template>
	<div class="bg-background p-10 w-max rounded-3xl mx-auto">
		<div class="flex flex-col gap-7 items-start">
			<div class="text-2xl items-start flex">
				<div v-if="remainingHours >= 0">
					Remaining Monthly Hours: {{ remainingHours }}
				</div>
				<div v-else>
					Overtime: {{ Math.abs(remainingHours) }}
				</div>
			</div>
			<h1 class="text-primarylight text-2xl">
				{{ currentTime }}
			</h1>
			<h1 class="text-primarylight text-xl">
				{{ currentDate }}
			</h1>
			<v-button
				class="self-center"
				:text="'Check Out'"
				:method="checkOut"
			/>
		</div>
	</div>
</template>

<script>
import AttendanceManager from '@/util/AttendanceManager'
import HoursManager from '@/util/HoursManager'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			interval: null,
			currentTime: new Date().toLocaleTimeString(),
			currentDate: new Date().toDateString(),
			remainingHours: null,
		}
	},
	beforeUnmount() {
		clearInterval(this.interval)
		this.interval = null
	},
	beforeMount() {
		if (this.interval == null) {
			this.interval = setInterval(() => {
				this.currentTime = new Date().toLocaleTimeString()
				this.currentDate = new Date().toDateString()
			}, 1000)
		}
		this.remainingHours = this.getRemainingHours()
	},
	methods: {
		checkOut() {
			AttendanceManager.userCheckOut(UsersManager.getActiveUser())
			this.remainingHours = this.getRemainingHours()
		},
		getRemainingHours() {
			return (HoursManager.getMonthlyHours() - HoursManager.calculateCurrentMonthWorkedHours(UsersManager.getActiveUser().attendance)).toFixed(2)
		},
	},
}
</script>

<style></style>
