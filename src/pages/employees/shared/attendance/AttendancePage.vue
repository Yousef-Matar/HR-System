<template>
	<div v-if="username">
		<MyAttendance />
		<div>{{ username }}</div>
	</div>
	<div v-else>
		<AllAttendance />
	</div>
</template>

<script>
import AllAttendance from '@/pages/employees/shared/attendance/util/AllAttendance'
import MyAttendance from '@/pages/employees/shared/attendance/util/MyAttendance'

export default {
	components: { MyAttendance, AllAttendance },
	props: {
		username: {
			type: String,
			default: null,
		},
	},
}
</script>

<style></style>
