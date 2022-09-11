import UsersManager from '@/util/UsersManager'

/* eslint-disable no-useless-escape */
var FormValidation = {
	usedUsername(input) {
		if (UsersManager.getUserByUsername(input)) return true
		return false
	},
	noSpace(input) {
		let regex = /\s/i
		return regex.test(input)
	},
	empty(input) {
		if (input == '') return true
		return false
	},
	//	email(input) {
	//		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	//		return regex.test(input)
	//	},
	notMatching(input, confirmInput) {
		if (input != confirmInput) return true
		return false
	},
}
export default FormValidation
