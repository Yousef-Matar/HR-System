import store from '@/store/index'

import AttendanceManager from '@/util/AttendanceManager'
import UsersManager from '@/util/UsersManager'

var VacationManager = {
	getVacationRequestID() {
		return this.getAllVacationRequests().length == 0 ? 1 : this.getAllVacationRequests()[this.getAllVacationRequests().length - 1].ID + 1
	},
	getAllVacationRequests() {
		return store.state.vacationRequests
	},
	getVacationRequestByID(requestID) {
		return this.getAllVacationRequests().find((vacationRequest) => vacationRequest.ID == requestID)
	},
	getUserVacationDays() {
		return UsersManager.getActiveUser().yearlyVacation
	},
	addVacationRequest(request) {
		store.commit('setVacationRequests', this.getAllVacationRequests().concat([request]))
	},
	cancelVacationRequest(requestID) {
		store.commit('cancelVacationRequest', requestID)
	},

	changeVacationRequestStatus(requestID, status) {
		var vacationRequest = this.getVacationRequestByID(requestID)
		if (status == 'approved') {
			var canTakeVacations = UsersManager.changeUserYearlyVacations(vacationRequest)
			if (canTakeVacations) {
				store.commit('changeVacationRequestStatus', { requestID: requestID, status: status, handler: UsersManager.getActiveUser().ID })
				AttendanceManager.vacationAttendance(vacationRequest)
				return true
			} else {
				return false
			}
		} else {
			store.commit('changeVacationRequestStatus', { requestID: requestID, status: status, handler: UsersManager.getActiveUser().ID })
			return true
		}
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
