import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			monthlyHours: localStorage.getItem('Monthly Hours') === null ? 40 : JSON.parse(localStorage.getItem('Monthly Hours')),
			activeUser: localStorage.getItem('Active User') === null ? null : JSON.parse(localStorage.getItem('Active User')),
			allEmployees:
				localStorage.getItem('Employees') === null
					? [
							{
								username: 'admin',
								password: 'admin',
								firstName: 'Admin First Name',
								lastName: 'Admin Last Name',
								role: 'admin',
								hireDate: new Date().toLocaleDateString(),
								attendance: [],
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ]
					: JSON.parse(localStorage.getItem('Employees')),
		}
	},

	mutations: {
		setAllEmployees(state, payload) {
			state.allEmployees = payload
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			state.allEmployees = JSON.parse(localStorage.getItem('Employees'))
		},
		setActiveUser(state, payload) {
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			state.allEmployees = JSON.parse(localStorage.getItem('Employees'))
			state.activeUser = payload
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
		},
		setMonthlyHours(state, payload) {
			state.monthlyHours = payload
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
		},
		updateActiveUserCheckOut(state, payload) {
			state.allEmployees = state.allEmployees.map((user) => (user.username === payload.username ? payload : user))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			state.allEmployees = JSON.parse(localStorage.getItem('Employees'))
		},
	},
	getters: {
		getMonthlyHours: (state) => () => state.monthlyHours,
		getAllEmployees: (state) => () => state.allEmployees,
		getActiveUser: (state) => () => state.activeUser,
	},
})
export default store
