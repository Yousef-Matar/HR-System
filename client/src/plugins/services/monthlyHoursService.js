import axios from '@/plugins/axios'

export default {
	getCurrentMonthHours() {
		return axios.get('hours')
	},
	getAllMonthHours() {
		return axios.get('allhours')
	},
	updateCurrentMonthHours(monthlyHoursID, updatedMonthlyHours) {
		return axios.patch('hours/' + monthlyHoursID, { hours: updatedMonthlyHours })
	},
}
