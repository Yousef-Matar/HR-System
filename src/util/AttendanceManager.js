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
		store.commit('updateActiveUserCheckOut', user)
		return user
	},
}
export default AttendanceManager
