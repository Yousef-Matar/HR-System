import store from '@/store/index'

import UsersManager from '@/util/UsersManager'

var VacationManager = {
	getUserVacationDays() {
		return UsersManager.getActiveUser().yearlyVacation
	},
	addVacationRequest(request) {
		store.commit('setVacationRequests', this.getAllVacationRequests().concat([request]))
	},
	calculateVacationDays(startDate, endDate) {
		var vacationDays = 0
		var tempDate = new Date(startDate)
		while (tempDate.getDate() != new Date(endDate).getDate() || tempDate.getFullYear() != new Date(endDate).getFullYear() || tempDate.getMonth() != new Date(endDate).getMonth()) {
			if (tempDate.getDay() != 5 && tempDate.getDay() != 6) {
				vacationDays++
			}
			tempDate.setDate(tempDate.getDate() + 1)
		}
		if (tempDate.getDate() == new Date(endDate).getDate() && tempDate.getFullYear() == new Date(endDate).getFullYear() && tempDate.getMonth() == new Date(endDate).getMonth() && tempDate.getDay() != 5 && tempDate.getDay() != 6) {
			vacationDays++
		}
		return vacationDays
	},
}
export default VacationManager
