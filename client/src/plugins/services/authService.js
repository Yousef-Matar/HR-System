import axios from '@/plugins/axios'

export default {
	login(credentials) {
		return axios.post('login', credentials)
	},
}
