export default {
	activeEmployee: localStorage.getItem('Active Employee') == null ? null : JSON.parse(localStorage.getItem('Active Employee')),
	allEmployees: [],
	acitveEmployeeNotifications: [],
	//allMonthlyHours:[],
	currentMonthlyHours: 0,
	error: '',
}
