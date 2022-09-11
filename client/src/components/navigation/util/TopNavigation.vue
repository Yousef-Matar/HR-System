<template>
	<div class="fixed top-0 w-full h-16 items-center bg-background flex justify-between text-sm px-3 z-[1]">
		<span class="flex gap-1">
			<font-awesome-icon
				icon="fa fa-bars"
				size="2xl"
				class="cursor-pointer rounded-3xl p-2 shadow text-primary hover:shadow-[#adffff]"
				@click="$emit('toggleSideNav')"
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
			this.$router.push('/Login')
			this.$swal.fire('Successfully Checked Out', 'Checked out at ' + new Date().toLocaleTimeString() + ' on ' + new Date().toDateString(), 'success')
		},
	},
}
</script>

<style></style>
