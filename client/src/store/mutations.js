export const SET_ALL_EMPLOYEES = (state, employees) => {
	state.employees = employees
}
export const SET_ACTIVE_EMPLOYEE = (state, activeEmployee) => {
	state.activeEmployee = activeEmployee
}
export const SET_ACTIVE_EMPLOYEE_NOTIFICATIONS = (state, notifications) => {
	state.employeeNotifications = notifications
}
export const SET_MONTHLY_HOURS = (state, monthlyHours) => {
	state.monthlyHours = monthlyHours
}
export const SET_ERROR = (state, error) => {
	state.error = error
}
export const HIDE_ERROR = (state) => {
	state.error = ''
}