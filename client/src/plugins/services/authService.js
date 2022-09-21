import axios from '@/plugins/axios'
import router from '@/router'
import store from '@/store/index'

export default {
	login(credentials) {
		return axios.post('login', credentials).then((result) => {
			store.commit('setActiveEmployeeID', result.data.employeeID)
			store.state.allEmployees.find((employee) => employee.id === result.data.employeeID)
			router.push('/')
		})
	},
	register(credentials) {
		axios.post('employees', credentials)
	},
}
