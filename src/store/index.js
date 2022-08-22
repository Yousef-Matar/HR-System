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
		init(state) {
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
		},
		setAllEmployees(state, payload) {
			state.allEmployees = payload
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},
		setActiveUser(state, payload) {
			state.activeUser = payload
			localStorage.setItem('Active User', JSON.stringify(state.activeUser))
		},
		setMonthlyHours(state, payload) {
			state.monthlyHours = payload
			localStorage.setItem('Monthly Hours', JSON.stringify(state.monthlyHours))
		},
		replaceUser(state, payload) {
			state.allEmployees = state.allEmployees.map((user) => (user.username === payload.username ? payload.updatedUser : user))
			localStorage.setItem('Employees', JSON.stringify(state.allEmployees))
		},
	},
})
export default store
