import store from '@/store/index'

import TimeConverter from '@/util/TimeConverter'

var HoursManager = {
	getMonthlyHours() {
		return store.state.monthlyHours
	},
	getAllHours() {
		return store.state.allHours
	},
	getMonthHours(year, month) {
		var monthHours = this.getAllHours()
		if (monthHours.find((element) => element.month == month && element.year == year)) {
			return monthHours.find((element) => element.month == month && element.year == year)
		} else {
			if (year == new Date().getFullYear() && month == new Date().getMonth()) {
				monthHours.push({
					year: year,
					month: month,
					hours: this.getMonthlyHours(),
				})
			} else {
				monthHours.push({
					year: year,
					month: month,
					hours: 40,
				})
			}
			store.commit('setAllHours', monthHours)
			return monthHours.find((element) => element.month == month && element.year == year)
		}
	},
	setMonthlyHours(hours) {
		store.commit('setMonthlyHours', hours)
		var allHours = this.getAllHours()
		if (allHours.find((element) => element.month == new Date().getMonth() && element.year == new Date().getFullYear())) {
			allHours.find((element) => element.month == new Date().getMonth() && element.year == new Date().getFullYear()).hours = hours
			store.commit('setAllHours', allHours)
		} else {
			allHours.push({
				year: new Date().getFullYear(),
				month: new Date().getMonth(),
				hours: hours,
			})
			store.commit('setAllHours', allHours)
		}
	},
	calculateCurrentMonthWorkedHours(user) {
		var currentMonthAttendance = user.attendance.filter((attendance) => attendance.currentDay.slice(attendance.currentDay.lastIndexOf('/') + 1) == new Date().getFullYear() && attendance.currentDay.slice(0, attendance.currentDay.indexOf('/')) == new Date().getMonth() + 1)

		var totalMinutes = 0
		currentMonthAttendance.forEach((day) => {
			day.time.forEach((check) => {
				if (check.checkInTime && check.checkOutTime) {
					totalMinutes += TimeConverter.difference_24_hours(check.checkInTime, check.checkOutTime)
				}
			})
		})

		return (totalMinutes / 60).toFixed(2)
	},
	getMonthWorkedHours(user, year, month) {
		var currentMonthAttendance = user.attendance.filter((attendance) => attendance.currentDay.slice(attendance.currentDay.lastIndexOf('/') + 1) == year && attendance.currentDay.slice(0, attendance.currentDay.indexOf('/')) == month + 1)

		var totalMinutes = 0
		currentMonthAttendance.forEach((day) => {
			day.time.forEach((check) => {
				if (check.checkInTime && check.checkOutTime) {
					totalMinutes += TimeConverter.difference_24_hours(check.checkInTime, check.checkOutTime)
				}
			})
		})

		return (totalMinutes / 60).toFixed(2)
	},

	getDayTotalHours(user, year, month, day) {
		var selectedDate = month + 1 + '/' + day + '/' + year
		var selectedAttendance = user.attendance.find((attendanceDay) => attendanceDay.currentDay == selectedDate)
		if (selectedAttendance != null) {
			var totalWorkingMinutes = 0
			//var totalBreakMinutes = 0
			selectedAttendance.time.forEach((check) => {
				if (check.checkInTime && check.checkOutTime) {
					totalWorkingMinutes += TimeConverter.difference_24_hours(check.checkInTime, check.checkOutTime)
				}
			})
			//var index = 0
			//while (index < selectedAttendance.time.length && selectedAttendance.time[index + 1]) {
			//	totalBreakMinutes += TimeConverter.difference_24_hours(selectedAttendance.time[index].checkOutTime, selectedAttendance.time[index + 1].checkInTime)
			//	index += 1
			//}

			return 'Covered Hours: ' + (totalWorkingMinutes / 60).toFixed(2) 
			//+ '/n' + 'Break Hours: ' + (totalBreakMinutes / 60).toFixed(2)
		} else {
			return 'Missed this Day'
		}
	},
}
export default HoursManager
