<template>
	<form @submit.prevent="updateHours">
		<div>
			<h1 class="text-2xl">
				Update Monthly Hours
			</h1>
			<h1 class="text-xl">
				Current Monthly Hours : {{ getMonthlyHours }}
			</h1>
		</div>
		<v-input />
		<div class="inputGroup">
			<input
				id="hours"
				v-model="monthlyHours"
				type="number"
				min="0"
				placeholder=" "
			>
			<label for="hours">Monthly Hours</label>
		</div>
		<v-button :type="'submit'" :text="'Update'" />
	</form>
</template>

<script>
import HoursManager from '@/util/HoursManager'

export default {
	data() {
		return {
			monthlyHours: 0,
		}
	},
	computed: {
		getMonthlyHours() {
			return HoursManager.getMonthlyHours()
		},
	},
	beforeMount() {
		this.monthlyHours = this.getMonthlyHours
	},
	methods: {
		updateHours() {
			HoursManager.setMonthlyHours(this.monthlyHours)
		},
	},
}
</script>

<style></style>
