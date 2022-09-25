<template>
	<MyAttendance v-if="username" :user="getAttendanceData" />
	<AllAttendance v-else :users="getAttendanceData" />
</template>

<script>
import AllAttendance from '@/pages/employees/attendance/util/AllAttendance'
import MyAttendance from '@/pages/employees/attendance/util/MyAttendance'

import UsersManager from '@/util/UsersManager'

export default {
	components: { MyAttendance, AllAttendance },
	props: {
		username: {
			type: String,
			default: null,
		},
	},
	computed: {
		getAttendanceData() {
			if (this.username) {
				return UsersManager.getActiveUser()
			} else {
				var activeUser = UsersManager.getActiveUser()
				if (activeUser == null) return
				if (activeUser.role == 'SuperAdmin') {
					return UsersManager.getAllUsers().filter((user) => user.role != 'SuperAdmin' && user.username != activeUser.username && user.status != 'disabled')
				} else if (activeUser.role == 'admin') {
					return UsersManager.getAllUsers().filter((user) => user.role != 'SuperAdmin' && user.username != activeUser.username && user.status != 'disabled')
				} else if (activeUser.role == 'human resources') {
					return UsersManager.getAllUsers().filter((user) => user.role != 'SuperAdmin' && user.role != 'admin' && user.username != activeUser.username && user.status != 'disabled')
				}
				return null
			}
		},
	},
}
</script>

<style></style>
