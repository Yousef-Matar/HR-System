<template>
	<MyAttendance v-if="getActiveUser" :user="getActiveUser" />
	<div v-else>
		<AllAttendance />
		<div>{{ username }}</div>
	</div>
</template>

<script>
import AllAttendance from '@/pages/employees/shared/attendance/util/AllAttendance'
import MyAttendance from '@/pages/employees/shared/attendance/util/MyAttendance'

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
		getActiveUser() {
			if (this.username) {
				return UsersManager.getUser(this.username)
			} else {
				return null
			}
		},
	},
}
</script>

<style></style>
