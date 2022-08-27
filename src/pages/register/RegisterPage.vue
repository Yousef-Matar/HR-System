<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<form autocomplete="off" @submit.prevent="submit">
			<div class="text-left">
				<h1 class="text-2xl">
					Sign Up
				</h1>
				<div v-if="error.show" class="text-red-500 mt-2 text-lg">
					<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;{{ error.message }}
				</div>
			</div>

			<v-input
				:input-i-d="'username'"
				:type="'text'"
				:input-label="'Username'"
				:input-value="form.username"
				@usernameChange="(inputContent) => (form.username = inputContent)"
			/>

			<div class="flex gap-8 flex-wrap">
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
			</div>
			<div class="flex gap-8 flex-wrap">
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
			</div>

			<v-button :type="'submit'" :text="'Sign Up'" />
			<v-button
				:type="'button'"
				:text="'Already have an account ?'"
				:method=" () => { $router.push('/Login') } "
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
			error: {
				show: false,
				message: 'Invalid username or password.',
			},
			form: {
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				yearlyVacation: 21,
				role: 'employee',
				hireDate: new Date().toLocaleDateString(),
				attendance: [],
			},
			confirmPassword: '',
		}
	},
	methods: {
		submit() {
			if (UsersManager.getUser(this.form.username)) {
				this.error.show = true
				this.error.message = 'Username is already in use.'
			} else if (this.form.password !== this.confirmPassword) {
				this.error.show = true
				this.error.message = 'Passwords do not match.'
			} else {
				var currentUser = this.form
				currentUser = AttendanceManager.userCheckIn(currentUser)
				UsersManager.setActiveUser(currentUser)
				UsersManager.addUser(currentUser)
				this.error.show = false
				this.$router.push('/')
			}
		},
		resetForm() {
			this.form.username = ''
			this.form.password = ''
			this.error.show = false
		},
	},
}
</script>

<style></style>
