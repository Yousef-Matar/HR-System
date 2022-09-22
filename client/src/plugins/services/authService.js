import axios from '@/plugins/axios'
import store from '@/store/index'

export default {
	login(credentials) {
		return axios.post('login', credentials)
	},
	register(credentials) {
		return axios.post('employees', credentials)
	},
	logout() {
		return axios.patch(`logout/${store.state.activeEmployeeID}`)
	},
}
