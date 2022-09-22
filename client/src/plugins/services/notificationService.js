import axios from '@/plugins/axios'

export default {
	getEmployeeNotifications(employeeID) {
		return axios.get('notifications/' + employeeID)
	},
	readNotification(notificationID) {
		return axios.patch('notifications/' + notificationID)
	},
}
