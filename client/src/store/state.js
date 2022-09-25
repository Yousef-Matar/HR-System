export default {
	activeEmployee: localStorage.getItem('Active Employee') == null ? null : JSON.parse(localStorage.getItem('Active Employee')),
	allEmployees: [],
	acitveEmployeeNotifications: [],
	currentMonthlyHours: 0,
	error: '',
}
