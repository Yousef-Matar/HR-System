<template>
	<div class="w-full h-12 items-center bg-background flex justify-between text-sm">
		<router-link class="p-2 rounded-3xl shadow-md" to="/">
			Home
		</router-link>
		<span v-if="getActiveUser()">
			<UserForm :mode="'profile'" :user="getActiveUser()" />
			<router-link
				class="p-2 rounded-3xl shadow-md"
				to="/"
				@click="logout"
			>Logout </router-link>
		</span>
		<span v-else>
			<router-link class="p-2 rounded-3xl shadow-md" to="/Login">Login </router-link>
			<router-link class="p-2 rounded-3xl shadow-md" to="/Register">Register </router-link>
		</span>
	</div>
</template>

<script>
import UserForm from '@/components/modal/UserForm'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

export default {
	components: { UserForm },
	methods: {
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
		logout() {
			AttendanceManager.userCheckOut(this.getActiveUser())
			UsersManager.logout()
		},
	},
}
</script>

<style></style>
