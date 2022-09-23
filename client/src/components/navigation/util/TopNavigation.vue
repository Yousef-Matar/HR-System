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
				:text="activeEmployee.username"
				:icon="'fa fa-user'"
				:has-border="false"
			/>
			<span class="flex items-center mx-2">
				<div class="relative cursor-pointer rounded-3xl p-2 shadow text-primary hover:shadow-[#adffff]" @click="openNotificationModal = true">
					<font-awesome-icon icon="fa fa-bell" size="xl" />
					<span v-if="unreadNotificationsCount" class="badge">{{ unreadNotificationsCount }}</span>
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
				:active-employee="activeEmployee"
				:inital-employee="activeEmployee"
				:open-modal="openProfileModal"
				@closeModal="openProfileModal = false"
			/>
		</span>
	</div>
</template>

<script>
import EmployeeForm from '../../modal/EmployeeForm.vue'
import authService from '@/plugins/services/authService'

import NotificationModal from '@/components/modal/NotificationModal'

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
		}
	},
	computed: {
		activeEmployee() {
			return this.$store.state.allEmployees.find((employee) => employee._id == this.$store.state.activeEmployeeID)
		},
		unreadNotificationsCount() {
			return this.$store.state.acitveEmployeeNotifications.filter((activeEmployeeNotification) => activeEmployeeNotification.status == 'unread').length
		},
	},
	methods: {
		openProfileModalAction() {
			this.openProfileModal = true
		},
		logout() {
			authService.logout().then(() => {
				this.$store.commit('setActiveEmployeeID', null)
				this.$router.push('/Login')
				this.$swal.fire('Successfully Checked Out', 'Checked out at ' + new Date().toLocaleTimeString() + ' on ' + new Date().toDateString(), 'success')
			})
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
