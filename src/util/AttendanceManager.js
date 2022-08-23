import store from '@/store/index'

var AttendanceManager = {
	userCheckIn(user) {
		if (!user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString())) {
			user.attendance.push({
				currentDay: new Date().toLocaleDateString(),
				time: [
					{
						checkInTime: new Date().toLocaleTimeString(),
						checkOutTime: null,
					},
				],
			})
		} else if (user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString())) {
			user.attendance
				.find((day) => day.currentDay === new Date().toLocaleDateString())
				.time.push({
					checkInTime: new Date().toLocaleTimeString(),
					checkOutTime: null,
				})
		}
		return user
	},
	userCheckOut(user) {
		if (!user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString())) {
			user.attendance.push({
				currentDay: new Date().toLocaleDateString(),
				time: [
					{
						checkInTime: '12:00:00 AM',
						checkOutTime: new Date().toLocaleTimeString(),
					},
				],
			})
		} else if (user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString()).time.find((time) => time.checkOutTime === null)) {
			user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString()).time.find((time) => time.checkOutTime === null).checkOutTime = new Date().toLocaleTimeString()
		} else {
			user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString()).time[user.attendance.find((day) => day.currentDay === new Date().toLocaleDateString()).time.length - 1].checkOutTime = new Date().toLocaleTimeString()
		}
		store.commit('replaceUser', { username: user.username, updatedUser: user })
		return user
	},
	getUserYears(user) {
		var hireYear = user.hireDate.slice(user.hireDate.lastIndexOf('/') + 1)
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
	getUserMonths(user,yearFilter) {
		var hireMonth = user.hireDate.slice(0, user.hireDate.indexOf('/'))
		hireMonth = parseInt(hireMonth)
		if (user.hireDate.slice(user.hireDate.lastIndexOf('/') + 1) == new Date().getFullYear()) {
			return this.getAllMonths().slice(hireMonth - 1, new Date().getMonth() + 1)
		} else if (yearFilter == new Date().getFullYear()) {
			return this.getAllMonths().slice(0, new Date().getMonth() + 1)
		} else {
			return this.getAllMonths()
		}
	},
	getDaysInMonth(yearFilter, monthFilter) {
		return [...Array(new Date(yearFilter, monthFilter + 1, 0).getDate()).keys()].map((key) => (key += 1))
	},
	tableData(){}
}
export default AttendanceManager
