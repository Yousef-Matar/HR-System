import axios from '@/plugins/axios'

export default {
	getAll() {
		return axios.get('employees')
	},
	createEmployee(credentials) {
		return axios.post('employees', credentials)
	},
	updateEmployee(employeeID, updatedEmployee) {
		return axios.patch('employees/' + employeeID, updatedEmployee)
	},
}
