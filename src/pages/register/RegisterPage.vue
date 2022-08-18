<template>
	<form autocomplete="off" @submit.prevent="submit">
		<div>
			<h1 class="text-2xl">
				Sign Up
			</h1>
			<div v-if="error.show" class="text-red-500 text-left mt-2 text-lg">
				<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;{{ error.message }}
			</div>
		</div>
		<div class="inputGroup">
			<input
				id="username"
				v-model="form.username"
				placeholder=" "
				type="text"
				required
			>
			<label for="username">Username</label>
		</div>
		<div class="flex gap-8">
			<div class="inputGroup">
				<input
					id="firstName"
					v-model="form.firstName"
					placeholder=" "
					type="text"
					required
				>
				<label for="firstName">First Name</label>
			</div>
			<div class="inputGroup">
				<input
					id="lastName"
					v-model="form.lastName"
					placeholder=" "
					type="text"
					required
				>
				<label for="lastName">Last Name</label>
			</div>
		</div>
		<div class="flex gap-8">
			<div class="inputGroup">
				<input
					id="password"
					v-model="form.password"
					placeholder=" "
					type="password"
					required
				>
				<label for="password">Password</label>
			</div>
			<div class="inputGroup">
				<input
					id="confirmPassword"
					v-model="confirmPassword"
					placeholder=" "
					type="password"
					required
				>
				<label for="confirmPassword">Confirm Password</label>
			</div>
		</div>

		<v-button :type="'submit'" :text="'Sign Up'" />
		<v-button
			:type="'button'"
			:text="'Already have an account ?'"
			:method=" () => { $router.push('/Login') } "
		/>
	</form>
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
