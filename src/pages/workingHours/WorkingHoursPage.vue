<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<form class="formContainer" @submit.prevent="submit">
			<div class="text-left">
				<h1 class="text-2xl">
					Update Monthly Hours
				</h1>
				<h1 class="text-xl">
					Current Monthly Hours : {{ currentMonthlyHours }}
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
				:disabled="currentMonthlyHours == monthlyHours ? true : false"
				:type="'submit'"
				:text="'Update'"
				class="w-full"
			/>
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			monthlyHours: 0,
		}
	},
	computed: {
		...mapState({
			currentMonthlyHoursID: (state) => state.currentMonthlyHours._id,
			currentMonthlyHours: (state) => state.currentMonthlyHours.hours,
		}),
	},

	beforeMount() {
		this.$store.dispatch('getCurrentMonthlyHours').then(() => {
			this.monthlyHours = this.currentMonthlyHours
		})
	},
	methods: {
		submit() {
			var monthlyHours = {
				oldID: this.currentMonthlyHoursID,
				newHours: this.monthlyHours,
			}
			this.$store.dispatch('updateCurrentMonthlyHours', monthlyHours).then(() => {
				this.$swal.fire('Successfull', 'Monthly hours have been updated.', 'success')
			})
		},
	},
}
</script>

<style></style>
