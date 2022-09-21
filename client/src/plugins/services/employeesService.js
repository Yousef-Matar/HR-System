import axios from '@/plugins/axios'
import store from '@/store/index'

export default {
	getAll() {
		axios.get('employees').then((response) => {
			store.commit('setAllEmployees', response.data)
			
		})
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
