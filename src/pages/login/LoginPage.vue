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
import AttendanceManager from '@/util/AttendanceManager'
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

<style></style>
