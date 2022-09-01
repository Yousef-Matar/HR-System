<template>
	<div class="mx-auto p-8 rounded-3xl bg-background w-fit">
		<form autocomplete="off" @submit.prevent="submit">
			<div class="text-center">
				<h1 class="text-2xl">
					Login
				</h1>
				<div v-if="error.show" class="text-red-500 mt-2 text-lg">
					<font-awesome-icon icon="fa fa-exclamation-triangle" />&nbsp;{{ error.message }}
				</div>
			</div>
			<div class="flex flex-wrap items-center justify-center">
				<v-input
					class="m-4"
					:input-i-d="'username'"
					:type="'text'"
					:input-label="'Username'"
					:input-value="form.username"
					@usernameChange="(inputContent) => (form.username = inputContent)"
				/>
				<div class="break" />
				<v-input
					class="m-4"
					:input-i-d="'password'"
					:type="'password'"
					:input-label="'Password'"
					:input-value="form.password"
					@passwordChange="(inputContent) => (form.password = inputContent)"
				/>
			</div>
			<v-button
				class="w-full self-center"
				:type="'submit'"
				:text="'Log In'"
			/>
			<v-button
				class="w-full self-center"
				:type="'button'"
				:text="'Register'"
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

<style scoped>
.break {
	flex-basis: 100%;
	height: 0;
}
</style>
