<template>
	<div class="w-full h-12 items-center bg-background flex justify-between text-sm px-3">
		<span class="flex gap-1">
			<v-button
				:text="'Home'"
				:has-border="false"
				:method=" () => { $router.push('/') } "
			/>
		</span>
		<span v-if="getActiveUser()" class="flex gap-1">
			<UserForm :mode="'profile'" :user="getActiveUser()" />
			<v-button
				:text="'Logout'"
				:has-border="false"
				:method="logout"
			/>
		</span>
		<span v-else class="flex gap-1">
			<v-button
				:text="'Login'"
				:has-border="false"
				:method=" () => { $router.push('/Login') } "
			/>
			<v-button
				:text="'Register'"
				:has-border="false"
				:method=" () => { $router.push('/Register') } "
			/>
		</span>
	</div>
</template>

<script>
import UserForm from '@/components/modal/UserForm'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

export default {
	components: { UserForm },

	computed: {
		getNavigationLinks() {
			var navigationLinks = {
				leftSide: [
					{
						text: 'Home',
						to: '/',
					},
				],
				RightSide: this.getActiveUser ? [{}] : [],
			}
			return navigationLinks
		},
	},
	methods: {
		getActiveUser() {
			return UsersManager.getActiveUser()
		},
		logout() {
			AttendanceManager.userCheckOut(this.getActiveUser())
			UsersManager.logout()
			this.$router.push('/')
		},
	},
}
</script>

<style></style>
