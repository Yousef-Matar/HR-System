import authService from '@/plugins/services/authService'
import employeesService from '@/plugins/services/employeesService'
import notificationService from '@/plugins/services/notificationService'

// Authentication

export const login = ({ commit }, credentials) => {
	return authService
		.login(credentials)
		.then((response) => {
			commit('HIDE_ERROR')
			commit('SET_ACTIVE_EMPLOYEE', response.data)
		})
		.catch((error) => {
			commit('SET_ERROR', error.response.data.message)
		})
}
export const logout = ({ commit }) => {
	return authService.logout().then(() => {
		commit('SET_ACTIVE_EMPLOYEE', null)
	})
}

export const register = ({ commit }, credentials) => {
	return authService.register(credentials).then(() => {
		authService
			.login(credentials)
			.then((response) => {
				commit('HIDE_ERROR')
				commit('SET_ACTIVE_EMPLOYEE', response.data)
			})
			.catch((error) => {
				commit('SET_ERROR', error.response.data.message)
			})
	})
}
// Employees

export const setAllEmployees = ({ commit }, employees) => {
	commit('SET_ALL_EMPLOYEES', employees)
}
export const createEmployee = ({ commit }, newEmployee) => {
	employeesService
		.createEmployee(newEmployee)
		.then(() => {
			commit('HIDE_ERROR')
		})
		.catch((error) => {
			commit('SET_ERROR', error.response.data.message)
		})
}
export const updateActiveEmployee = ({ commit }, updatedEmployee) => {
	return employeesService
		.updateEmployee(updatedEmployee._id, updatedEmployee)
		.then((response) => {
			commit('HIDE_ERROR')
			commit('SET_ACTIVE_EMPLOYEE', response.data)
		})
		.catch((error) => {
			commit('SET_ERROR', error.response.data.message)
		})
}
export const updateEmployee = ({ commit }, updatedEmployee) => {
	employeesService
		.updateEmployee(updatedEmployee._id, updatedEmployee)
		.then(() => {
			commit('HIDE_ERROR')
		})
		.catch((error) => {
			commit('SET_ERROR', error.response.data.message)
		})
}
// Notifications
export const setActiveEmployeeNotifications = ({ commit }, employeeID) => {
	notificationService.getEmployeeNotifications(employeeID).then((response) => {
		commit('SET_ACTIVE_EMPLOYEE_NOTIFICATIONS', response.data)
	})
}
export const readNotification = ({ commit }, notificationID) => {
	notificationService.readNotification(notificationID).then((response) => {
		commit('READ_NOTIFICATION', response.data)
	})
}
// Monthly Hours
export const setMonthlyHours = ({ commit }, monthlyHours) => {
	commit('SET_MONTHLY_HOURS', monthlyHours)
}
// Errors
export const hideError = ({ commit }) => {
	commit('HIDE_ERROR')
}
export const setError = ({ commit }, error) => {
	commit('SET_ERROR', error)
}
