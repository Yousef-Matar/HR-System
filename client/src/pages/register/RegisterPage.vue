<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit flex flex-col items-center">
		<h1 class="text-2xl mb-3">
			Register
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
				:input-i-d="'firstName'"
				:type="'text'"
				:input-label="'First Name'"
				:input-value="form.firstName"
				@firstNameChange="(inputContent) => (form.firstName = inputContent)"
			/>
			<v-input
				:input-i-d="'lastName'"
				:type="'text'"
				:input-label="'Last Name'"
				:input-value="form.lastName"
				@lastNameChange="(inputContent) => (form.lastName = inputContent)"
			/>

			<v-input
				:input-i-d="'password'"
				:type="'password'"
				:input-label="'Password'"
				:input-value="form.password"
				@passwordChange="(inputContent) => (form.password = inputContent)"
			/>
			<v-input
				:input-i-d="'confirmPassword'"
				:type="'password'"
				:input-label="'Confirm Password'"
				:input-value="confirmPassword"
				@confirmPasswordChange="(inputContent) => (confirmPassword = inputContent)"
			/>

			<v-button
				class="w-full"
				:text="'Sign Up'"
				:type="'submit'"
			/>
			<v-button
				class="w-full"
				:text="'Already have an account ?'"
				:type="'button'"
				:method=" () => { $router.push('/Login') } "
			/>
		</form>
	</div>
</template>

<script>
import employeesService from '@/plugins/services/employeesService'

import AttendanceManager from '@/util/AttendanceManager'
import FormValidation from '@/util/FormValidation'
import UsersManager from '@/util/UsersManager'

export default {
	data() {
		return {
			errors: [],

			form: {
				ID: UsersManager.getUserID(),
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				yearlyVacation: 21,
				role: 'employee',
				status: 'active',
				hireDate: new Date().toLocaleDateString(),
				attendance: [],
			},
			confirmPassword: '',
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
			if (FormValidation.noSpace(this.form.firstName)) {
				this.errors.push({
					show: true,
					message: 'First Name field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.form.lastName)) {
				this.errors.push({
					show: true,
					message: 'Last Name field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.form.password)) {
				this.errors.push({
					show: true,
					message: 'Password field cannot have whitespace.',
				})
			}
			if (FormValidation.noSpace(this.confirmPassword)) {
				this.errors.push({
					show: true,
					message: 'Confirm Password field cannot have whitespace.',
				})
			}
			if (FormValidation.notMatching(this.form.password, this.confirmPassword)) {
				this.errors.push({
					show: true,
					message: 'Passwords do not match.',
				})
			}
			if (this.errors.length == 0) {
				this.submit()
			}
		},
		submit() {
			employeesService
				.createEmployee(this.form)
				.then((result) => {
					console.log(result)
					//UsersManager.setActiveUser(result.data.employeeID)
					//UsersManager.addUser(result.data)
					var currentUser = this.form
					currentUser = AttendanceManager.userCheckIn(currentUser)
					UsersManager.setActiveUser(currentUser)
					UsersManager.addUser(currentUser)
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
