<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<form class="formContainer" @submit.prevent="submit">
			<div class="text-left">
				<h1 class="text-2xl">
					Update Monthly Hours
				</h1>
				<h1 class="text-xl">
					Current Monthly Hours : {{ getMonthlyHours }}
				</h1>
			</div>
			<v-input
				:input-i-d="'hours'"
				:type="'number'"
				:input-label="'Monthly Hours'"
				:input-value="monthlyHours"
				@hoursChange="(inputContent) => (monthlyHours = inputContent)"
			/>
			<v-button
				:disabled="getMonthlyHours == monthlyHours ? true : false"
				:type="'submit'"
				:text="'Update'"
				class="w-full"
			/>
		</form>
	</div>
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
		submit() {
			this.$swal.fire('Successful', 'Monthly hours have been updated.', 'success')
			HoursManager.setMonthlyHours(this.monthlyHours)
		},
	},
}
</script>

<style></style>
