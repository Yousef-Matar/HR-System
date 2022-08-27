import UsersManager from '@/util/UsersManager'

var VacationManager = {
	getUserVacationDays() {
		return UsersManager.getActiveUser().yearlyVacation
	},
}
export default VacationManager
