import axios from '@/plugins/axios'

export default {
	getAll() {
		return axios.get('employees')
	},
}
