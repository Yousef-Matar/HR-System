<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<!--<v-alert
			:text="success.message"
			:show="success.show"
			:variant="'success'"
		/>-->
		<form @submit.prevent="updateHours">
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
				:type="'submit'"
				:text="'Update'"
				:disabled="success.show"
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
			success: {
				show: false,
				message: 'Monthly hours have been successfully updated.',
			},
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
			this.success.show = true
			setTimeout(() => {
				this.success.show = false
			}, 2000)
			HoursManager.setMonthlyHours(this.monthlyHours)
		},
	},
}
</script>

<style></style>
