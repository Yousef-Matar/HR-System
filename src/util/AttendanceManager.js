

import UsersManager from '@/util/UsersManager'

var AttendanceManager = {
	vacationAttendance(vacationRequest) {
		var user = UsersManager.getUserByID(vacationRequest.requestedBy)
		var vacationStart = new Date(vacationRequest.from)
		var vacationEnd = new Date(vacationRequest.till)
		while (vacationStart.getDate() != vacationEnd.getDate() || vacationStart.getFullYear() != vacationEnd.getFullYear() || vacationStart.getMonth() != vacationEnd.getMonth()) {
			if (vacationStart.getDay() != 5 && vacationStart.getDay() != 6) {
				user.attendance.push({
					currentDay: vacationStart.toLocaleDateString(),
					time: [
						{
							checkInTime: '8:00:00 AM',
							checkOutTime: '4:00:00 PM',
						},
					],
				})
			}
			vacationStart.setDate(vacationStart.getDate() + 1)
		}
		if (vacationStart.getDate() == vacationEnd.getDate() && vacationStart.getFullYear() == vacationEnd.getFullYear() && vacationStart.getMonth() == vacationEnd.getMonth() && vacationStart.getDay() != 5 && vacationStart.getDay() != 6) {
			user.attendance.push({
				currentDay: vacationStart.toLocaleDateString(),
				time: [
					{
						checkInTime: '8:00:00 AM',
						checkOutTime: '4:00:00 PM',
					},
				],
			})
		}
		UsersManager.replaceUser(user.ID, user)
	},
	userCheckIn(user) {
		if (!user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString())) {
			user.attendance.push({
				currentDay: new Date().toLocaleDateString(),
				time: [
					{
						checkInTime: new Date().toLocaleTimeString(),
						checkOutTime: null,
					},
				],
			})
		} else if (user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString())) {
			user.attendance
				.find((day) => day.currentDay == new Date().toLocaleDateString())
				.time.push({
					checkInTime: new Date().toLocaleTimeString(),
					checkOutTime: null,
				})
		}
		return user
	},
	userCheckOut(user) {
		if (!user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString())) {
			user.attendance.push({
				currentDay: new Date().toLocaleDateString(),
				time: [
					{
						checkInTime: '12:00:00 AM',
						checkOutTime: new Date().toLocaleTimeString(),
					},
				],
			})
		} else if (user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString()).time.find((time) => time.checkOutTime == null)) {
			user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString()).time.find((time) => time.checkOutTime == null).checkOutTime = new Date().toLocaleTimeString()
		} else {
			user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString()).time[user.attendance.find((day) => day.currentDay == new Date().toLocaleDateString()).time.length - 1].checkOutTime = new Date().toLocaleTimeString()
		}
		UsersManager.replaceUser(user.ID, user)
		return user
	},
	getUserYears(userHireDate) {
		var hireYear = userHireDate.slice(userHireDate.lastIndexOf('/') + 1)
		hireYear = parseInt(hireYear)
		var years = [
			{
				title: hireYear,
				value: hireYear,
				hidden: false,
			},
		]
		while (hireYear != new Date().getFullYear()) {
			hireYear += 1
			years.push({
				title: hireYear,
				value: hireYear,
				hidden: false,
			})
		}
		return years
	},
	getAllMonths() {
		var allMonths = [...Array(12).keys()].map((key) => new Date(0, key).toLocaleString('en', { month: 'long' }))
		var selectMonths = []
		allMonths.forEach((month) => {
			selectMonths.push({
				value: allMonths.indexOf(month),
				title: month,
				hidden: false,
			})
		})
		return selectMonths
	},
	getUserMonths(userHireDate, yearFilter) {
		var hireMonth = userHireDate.slice(0, userHireDate.indexOf('/'))
		var hireYear = userHireDate.slice(userHireDate.lastIndexOf('/') + 1)
		hireMonth = parseInt(hireMonth)
		hireYear = parseInt(hireYear)
		if (hireYear > new Date().getFullYear()) {
			return this.getAllMonths()
		} else {
			if (hireYear == new Date().getFullYear()) {
				return this.getAllMonths().slice(hireMonth - 1, new Date().getMonth() + 1)
			}
			if (yearFilter == new Date().getFullYear()) {
				return this.getAllMonths().slice(0, new Date().getMonth() + 1)
			} else {
				if (yearFilter != hireYear) {
					return this.getAllMonths()
				} else {
					return this.getAllMonths().slice(hireMonth - 1)
				}
			}
		}
	},
	getDaysInMonth(yearFilter, monthFilter) {
		return [...Array(new Date(yearFilter, monthFilter + 1, 0).getDate()).keys()].map((key) => (key += 1))
	},
	showAttendance(userHireDate, yearFilter, monthFilter, day) {
		var reason = ''
		var hireYear = userHireDate.slice(userHireDate.lastIndexOf('/') + 1)
		var hireMonth = userHireDate.slice(0, userHireDate.indexOf('/'))
		var hireDay = parseInt(userHireDate.slice(userHireDate.indexOf('/') + 1, userHireDate.lastIndexOf('/')))
		var currentYear = new Date().getFullYear()
		var currentMonth = new Date().getMonth()
		var currentDay = new Date().getDate()
		if (yearFilter == hireYear && monthFilter + 1 == hireMonth) {
			if (yearFilter == currentYear && monthFilter == currentMonth) {
				if (day >= hireDay && currentDay >= day) {
					reason = 'Past'
					return reason
				}
			} else {
				if (day >= hireDay) {
					reason = 'Past'
					return reason
				}
			}
		} else {
			if (currentYear > yearFilter) {
				reason = 'Past'
				return reason
			} else {
				if (currentMonth > monthFilter) {
					reason = 'Past'
					return reason
				} else {
					if (currentDay >= day) {
						reason = 'Past'
						return reason
					}
				}
			}
		}
		reason = 'Future/PreHire'
		return reason
	},
}
export default AttendanceManager
