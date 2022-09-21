import axios from '@/plugins/axios'

export default {
	getAll() {
		return axios.get('employees')
	},
	getEmployeeByID(employeeID) {
		return axios.get(`employees/${employeeID}`)
	},
	createEmployee(employee) {
		return axios.post('employees', employee)
	},
	updateEmployee(employee) {
		return axios.patch(`employees/${employee.id}`, employee)
	},
}
