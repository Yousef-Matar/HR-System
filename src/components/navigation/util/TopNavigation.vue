<template>
	<div class="fixed top-0 w-full h-16 items-center bg-background flex justify-between text-sm px-3 z-[1]">
		<v-alert
			:text="success.message"
			:show="success.show"
			:variant="'success'"
		/>
		<span class="flex gap-1">
			<v-button
				class="w-full self-center"
				:class="user ? 'text-left min-w-[226px]' : ''"
				:text="'Home'"
				:has-border="false"
				:icon="'fa fa-home'"
				:method=" () => { $router.push('/') } "
			/>
		</span>
		<span v-if="user" class="flex gap-1">
			<UserForm :mode="'profile'" :user="user" />
			<v-button
				:method="logout"
				:text="'Logout'"
				:icon="'fa fa-sign-out'"
				:has-border="false"
			/>
		</span>
		<span v-else class="flex gap-1">
			<v-button
				:text="'Login'"
				:has-border="false"
				:icon="'fa fa-sign-in'"
				:method=" () => { $router.push('/Login') } "
			/>
			<v-button
				:text="'Register'"
				:has-border="false"
				:icon="'fa fa-user-plus'"
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
	props: {
		user: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			success: {
				show: false,
				message: 'You have successfully checked out at ',
			},
		}
	},
	methods: {
		logout() {
			AttendanceManager.userCheckOut(this.user)
			UsersManager.logout()
			this.$router.push('/')
			this.success.show = true
			this.success.message += new Date().toLocaleTimeString() + ' on ' + new Date().toDateString()
			setTimeout(() => {
				this.success.show = false
				this.success.message = 'You have successfully checked out at '
			}, 2000)
		},
	},
}
</script>

<style></style>
