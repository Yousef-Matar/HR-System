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
		<span class="flex gap-1">
			<v-button
				:method="openProfileModalAction"
				:text="activeUser.username"
				:icon="'fa fa-user'"
				:has-border="false"
			/>
			<span class="flex items-center mx-2">
				<div class="relative cursor-pointer rounded-3xl p-2 shadow text-primary hover:shadow-[#adffff]" @click="openNotificationModal = true">
					<font-awesome-icon icon="fa fa-bell" size="xl" />
					<span class="badge">count</span>
				</div>
			</span>
			<v-button
				:method="logout"
				:text="'Logout'"
				:icon="'fa fa-sign-out'"
				:has-border="false"
			/>
			<NotificationModal :open-modal="openNotificationModal" @closeModal="openNotificationModal = false" />
			<EmployeeForm
				:mode="'profile'"
				:active-employee="activeUser"
				:inital-employee="activeUser"
				:open-modal="openProfileModal"
				@closeModal="openProfileModal = false"
			/>
		</span>
	</div>
</template>

<script>
import EmployeeForm from '../../modal/EmployeeForm.vue'
import { mapState } from 'vuex'

import NotificationModal from '@/components/modal/NotificationModal'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

export default {
	components: {
		NotificationModal,
		EmployeeForm,
	},
	emits: ['toggleSideNav'],
	data() {
		return {
			openNotificationModal: false,
			openProfileModal: false,
			success: {
				show: false,
				message: 'You have successfully checked out at ',
			},
		}
	},
	computed: {
		...mapState(['activeUser']),
	},
	methods: {
		openProfileModalAction() {
			this.openProfileModal = true
		},
		logout() {
			AttendanceManager.userCheckOut(this.activeUser)
			UsersManager.logout()
			this.$router.push('/Login')
			this.$swal.fire('Successfully Checked Out', 'Checked out at ' + new Date().toLocaleTimeString() + ' on ' + new Date().toDateString(), 'success')
		},
	},
}
</script>

<style scoped>
.badge {
	position: absolute;
	top: -10px;
	right: -10px;
	padding: 5px 10px;
	border-radius: 50%;
	background-color: #ef4444;
	color: #18ffff;
}
</style>
