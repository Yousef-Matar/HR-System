<template>
	<form autocomplete="off" @submit.prevent="submit">
		<div>
			<h1 class="text-2xl">
				Login
			</h1>
			<div v-if="error.show" class="text-red-500 text-left mt-2 text-lg">
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
		<v-input
			:input-i-d="'password'"
			:type="'password'"
			:input-label="'Password'"
			:input-value="form.password"
			@passwordChange="(inputContent) => (form.password = inputContent)"
		/>

		<v-button :type="'submit'" :text="'Log In'" />
		<v-button
			:type="'button'"
			:text="'Register'"
			:method=" () => { $router.push('/Register') } "
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
			},
		}
	},
	methods: {
		submit() {
			var currentUser = UsersManager.getUser(this.form.username)
			if (currentUser) {
				currentUser = AttendanceManager.userCheckIn(currentUser)
				UsersManager.setActiveUser(currentUser)
				UsersManager.setAllUsers()
				this.error.show = false
				this.$router.push('/')
			} else {
				this.error.show = true
			}
		},
	},
}
</script>

<style></style>
