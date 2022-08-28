import UsersManager from '@/util/UsersManager'

var VacationManager = {
	getUserVacationDays() {
		return UsersManager.getActiveUser().yearlyVacation
	},
	calculateVacationDays(startDate, endDate) {
		const _MS_PER_DAY = 1000 * 60 * 60 * 24
		const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
		const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())

		var difference = Math.floor((utc2 - utc1) / _MS_PER_DAY)
		return difference
	},
}
export default VacationManager
