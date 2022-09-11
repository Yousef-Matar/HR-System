<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit flex flex-col items-center">
		<h1 class="text-2xl mb-3">
			Login
		</h1>
		<div v-if="errors.length" class="mb-3">
			<form-errors
				v-for="error in errors"
				:key="error.message"
				:error="error"
			/>
		</div>
		<div class="formContainer">
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
				:method="validateForm"
			/>
			<v-button
				class="w-full"
				:text="'Register'"
				:method=" () => { $router.push('/Register') } "
			/>
		</div>
	</div>
</template>

<script>
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
			if (FormValidation.empty(this.form.username)) {
				this.errors.push({
					show: true,
					message: 'Username field is required.',
				})
			}
			if (FormValidation.empty(this.form.password)) {
				this.errors.push({
					show: true,
					message: 'Password field is required.',
				})
			}
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
			if (!FormValidation.empty(this.form.username) && !FormValidation.noSpace(this.form.username)) {
				var currentUser = UsersManager.getUserByUsername(this.form.username)
				if (currentUser) {
					if (currentUser.password != this.form.password) {
						this.errors.push({
							show: true,
							message: 'Invalid username or password.',
						})
					}
					if (currentUser.status == 'disabled') {
						this.errors.push({
							show: true,
							message: 'This account has been disabled. Please contact your supervisor.',
						})
					}
				} else {
					this.errors.push({
						show: true,
						message: 'User not found. Please contact your supervisor.',
					})
				}
			}
			if (this.errors.length == 0) {
				this.submit()
			}
		},
		submit() {
			var currentUser = UsersManager.getUserByUsername(this.form.username)
			currentUser = AttendanceManager.userCheckIn(currentUser)
			UsersManager.setActiveUser(currentUser)
			UsersManager.setAllUsers()
			this.$router.push('/')
		},
	},
}
</script>

<style scoped>
.break {
	flex-basis: 100%;
	height: 0;
}
</style>
