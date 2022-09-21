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
		<form class="formContainer" @submit.prevent="validateForm">
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
//import authService from '@/plugins/services/authService'

import AttendanceManager from '@/util/AttendanceManager'
import FormValidation from '@/util/FormValidation'
import UsersManager from '@/util/UsersManager'

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
		validateForm() {
			this.errors = []
			if (FormValidation.noSpace(this.form.username)) {
				this.errors.push({
					show: true,
					message: 'Username field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.form.password)) {
				this.errors.push({
					show: true,
					message: 'Password field cannot have whitespace.',
				})
			}

			if (this.errors.length == 0) {
				this.submit()
			}
		},
		submit() {
			//authService
			//	.login(this.form)
			//	.then((result) => {
			//		//UsersManager.setActiveUser(result.data.employeeID)
			//		this.$router.push('/')
			//	})
			//	.catch((error) =>
			//		this.errors.push({
			//			show: true,
			//			message: error.response.data.message,
			//		})
			//	)
			var currentUser = UsersManager.getUserByUsername(this.form.username)
			currentUser = AttendanceManager.userCheckIn(currentUser)
			UsersManager.setActiveUser(currentUser)
			UsersManager.setAllUsers()
			this.$router.push('/')
		},
	},
}
</script>

<style>
</style>
