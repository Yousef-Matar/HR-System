import employeesService from '@/plugins/services/employeesService'
import notificationService from '@/plugins/services/notificationService'
import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			activeEmployeeID: localStorage.getItem('Active Employee ID') == null ? null : JSON.parse(localStorage.getItem('Active Employee ID')),
			allEmployees: [],
			acitveEmployeeNotifications: [],
		}
	},

	mutations: {
		init(state) {
			localStorage.setItem('Active Employee ID', JSON.stringify(state.activeEmployeeID))
			employeesService.getAll().then((response) => {
				state.allEmployees = response.data
			})
		},
		setAllEmployees(state) {
			employeesService.getAll().then((response) => {
				state.allEmployees = response.data
			})
		},
		setActiveEmployeeNotifications(state) {
			if (state.acitveEmployeeNotifications != null)
				notificationService.getEmployeeNotifications(state.activeEmployeeID).then((response) => {
					state.acitveEmployeeNotifications = response.data
				})
		},
		setActiveEmployeeID(state, employeeID) {
			state.activeEmployeeID = employeeID
		},
	},
})
export default store
