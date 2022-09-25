import authService from '@/plugins/services/authService'

export const setAllEmployees = ({ commit }, employees) => {
	commit('SET_ALL_EMPLOYEES', employees)
}

export const logout = ({ commit }) => {
	authService.logout().then(() => {
		commit('SET_ACTIVE_EMPLOYEE', null)
	})
}
export const login = ({ commit }, credentials) => {
	authService
		.login(credentials)
		.then((response) => {
			commit('SET_ERROR', '')
			commit('SET_ACTIVE_EMPLOYEE', response.data)
		})
		.catch((error) => {
			commit('SET_ERROR', error.response.data.message)
		})
}

export const register = ({ commit }, credentials) => {
	authService.register(credentials).then(() => {
		authService
			.login(credentials)
			.then((response) => {
				commit('SET_ERROR', '')
				commit('SET_ACTIVE_EMPLOYEE', response.data)

			})
			.catch((error) => {
				commit('SET_ERROR', error.response.data.message)
			})
	})
}
export const setActiveEmployeeNotifications = ({ commit }, notifications) => {
	commit('SET_ACTIVE_EMPLOYEE_NOTIFICATIONS', notifications)
}

export const setMonthlyHours = ({ commit }, monthlyHours) => {
	commit('SET_MONTHLY_HOURS', monthlyHours)
}

export const hideError = ({ commit }) => {
	commit('HIDE_ERROR')
}
export const setError = ({ commit }, error) => {
	commit('SET_ERROR', error)
}
