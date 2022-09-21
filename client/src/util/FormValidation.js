/* eslint-disable no-useless-escape */
var FormValidation = {
	noSpace(input) {
		let regex = /\s/i
		return regex.test(input)
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
