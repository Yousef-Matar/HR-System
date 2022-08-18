<template>
	<div class="bg-background p-10 w-max rounded-3xl mx-auto">
		<div class="flex flex-col gap-7 items-start">
			<div class="text-2xl items-start flex">
				<div v-if="getRemainingHours() >= 0">
					Remaining Monthly Hours: {{ getRemainingHours() }}
				</div>
				<div v-else>
					Overtime: {{ Math.abs(getRemainingHours()) }}
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
import UsersManager from '@/util/UsersManager'
import HoursManager from '@/util/HoursManager'
export default {
	data() {
		return {
			interval: null,
			currentTime: new Date().toLocaleTimeString(),
			currentDate: new Date().toDateString(),
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
	},
	methods: {
		checkOut() {
			AttendanceManager.userCheckOut(UsersManager.getActiveUser())
		},
		getRemainingHours() {
			return HoursManager.calculateRemaingHours(UsersManager.getActiveUser())
		},
	},
}
</script>

<style></style>
