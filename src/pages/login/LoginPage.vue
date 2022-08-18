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
