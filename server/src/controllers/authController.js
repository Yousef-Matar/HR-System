const employee = require('../models/employeeModel')
exports.login = async (req, res) => {
	const Employee = await employee.findOne({ username: req.body.username })
	if (!Employee) {
		// User not found
		return res.status(400).send({ message: 'User not found. Please contact your supervisor.' })
	}
	if(Employee.status === 'Disabled'||Employee.status === 'disabled'){
		// User not found
		return res.status(400).send({ message: 'This account has been disabled. Please contact your supervisor.' })
	}
	Employee.verifyPassword(req.body.password)
		.then((valid) => {
			if (valid) {
				// User Found Correct
				return res.status(200).send({employeeID:Employee.id})
			} else {
				// Incorrect Password
				return res.status(400).send({ message: 'Incorrect Username or Password.' })
			}
		})
		.catch(function (err) {
			console.log(err)
		})
}
