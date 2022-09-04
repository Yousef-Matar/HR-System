import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			vacationRequests:
				localStorage.getItem('Vacation Requests') === null
					? [
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('Vacation Requests')),
			monthlyHours: localStorage.getItem('Monthly Hours') === null ? 40 : JSON.parse(localStorage.getItem('Monthly Hours')),
			activeUser: localStorage.getItem('Active User') === null ? null : JSON.parse(localStorage.getItem('Active User')),
			allHours:
				localStorage.getItem('All Hours') === null
					? [
							{
								year: new Date().getFullYear(),
								month: new Date().getMonth(),
								hours: 40,
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('All Hours')),
			allEmployees:
				localStorage.getItem('Employees') === null
					? [
							{
								username: 'SuperAdmin',
								password: 'SuperAdmin',
								firstName: 'SuperAdmin First Name',
								lastName: 'SuperAdmin Last Name',
								role: 'SuperAdmin',
								yearlyVacation: 21,
								hireDate: new Date().toLocaleDateString(),
								attendance: [],
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('Employees')),
		}
	},

	mutations: {
		init(state) {
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))

			if (state.allHours.find((element) => element.month == new Date().getMonth() && element.year == new Date().getFullYear())) {
				localStorage.setItem('All Hours', JSON.stringify(state.allHours))
			} else {
				state.allHours.push({
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					hours: state.monthlyHours,
				})
				localStorage.setItem('All Hours', JSON.stringify(state.allHours))
			}
		},
		setAllEmployees(state, payload) {
			state.allEmployees = payload
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},
		setVacationRequests(state, payload) {
			state.vacationRequests = payload
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
		},
		replaceUserVacationRequest(state, payload) {
			state.vacationRequests = state.vacationRequests.map((request) =>
				request.requestedBy.username === payload.username
					? {
							requestedBy: payload.updatedUser,
							handledBy: request.handledBy,
							from: request.from,
							till: request.till,
							duration: request.duration,
							status: request.status,
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: request
			)
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
		},
		cancelVacationRequest(state, payload) {
			state.vacationRequests = state.vacationRequests.filter((request) => request.ID != payload)
			localStorage.setItem('Vacation Requests', JSON.stringify(state.vacationRequests))
		},
		setActiveUser(state, payload) {
			state.activeUser = payload
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
		},
		setMonthlyHours(state, payload) {
			state.monthlyHours = payload
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
		},
		setAllHours(state, payload) {
			state.allHours = payload
			localStorage.setItem('All Hours', JSON.stringify(state.allHours))
		},
		replaceUser(state, payload) {
			state.allEmployees = state.allEmployees.map((user) => (user.username === payload.username ? payload.updatedUser : user))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},
	},
})
export default store
