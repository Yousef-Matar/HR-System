<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<form class="formContainer" @submit.prevent="submit">
			<div class="text-left">
				<h1 class="text-2xl">
					Update Monthly Hours
				</h1>
				<h1 class="text-xl">
					Current Monthly Hours : {{ getMonthlyHours.hours }}
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
				class="w-full"
			/>
		</form>
	</div>
</template>

<script>


export default {
	data() {
		return {
			monthlyHours: 0,
		}
	},
	computed: {
		getMonthlyHours() {
			return this.$store.state.currentMonthlyHours
		},
	},
	beforeMount() {
		this.monthlyHours = this.getMonthlyHours.hours
	},
	methods: {
		submit() {
			this.$swal.fire('Successfull', 'Monthly hours have been updated.', 'success')
			this.$store.commit('updateMonthlyHours',this.monthlyHours)
		},
	},
}
</script>

<style></style>
