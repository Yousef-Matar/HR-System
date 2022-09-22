<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit flex flex-col items-center">
		<h1 class="text-2xl mb-3">
			Login
		</h1>
		<div v-if="errors.length" class="mb-8">
			<form-errors
				v-for="error in errors"
				:key="error.message"
				:error="error"
			/>
		</div>
		<form class="formContainer" @submit.prevent="submit">
			<v-input
				:input-i-d="'username'"
				:type="'text'"
				:input-label="'Username'"
				:input-value="form.username"
				@usernameChange="(inputContent) => (form.username = inputContent)"
			/>
			<v-input
				:input-i-d="'password'"
				:type="'password'"
				:input-label="'Password'"
				:input-value="form.password"
				@passwordChange="(inputContent) => (form.password = inputContent)"
			/>

			<v-button
				class="w-full"
				:text="'Log In'"
				:type="'submit'"
			/>
			<v-button
				class="w-full"
				:text="'Register'"
				:type="'button'"
				:method=" () => { $router.push('/Register') } "
			/>
		</form>
	</div>
</template>

<script>
import authService from '@/plugins/services/authService'

export default {
	data() {
		return {
			errors: [],
			form: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		submit() {
			this.errors = []
			authService
				.login(this.form)
				.then((response) => {
					this.$store.commit('setActiveEmployeeID', response.data.employeeID)
					this.$store.commit('setActiveEmployeeNotifications')
					this.$router.push('/')
				})
				.catch((error) =>
					this.errors.push({
						show: true,
						message: error.response.data.message,
					})
				)
		},
	},
}
</script>

<style></style>
