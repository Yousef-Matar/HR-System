import axios from '@/plugins/axios'

export default {
	register(credentials) {
		return axios.post('/register', credentials)
	},
}
