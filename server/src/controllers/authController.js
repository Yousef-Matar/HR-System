const employee = require('../models/employeeModel')
exports.login = async (req, res) => {
	const Employee = await employee.findOne({ username: req.body.username })
	if (!Employee) {
		// User not found
		return res.status(404).send({ message: 'User not found.' })
	}
	Employee.verifyPassword(req.body.password)
		.then((valid) => {
			if (valid) {
				// User Found Correct
				return res.status(200).send()
			} else {
				// Incorrect Password
				return res.status(404).send({ message: 'Incorrect Username or Password.' })
			}
		})
		.catch(function (err) {
			console.log(err)
		})
}
exports.employeeCreation = async (req, res) => {
	const Employee = new employee(req.body)
	const checkEmployee = await employee.findOne({ username: Employee.username })
	if (!checkEmployee) {
		Employee.save().then((result) => res.status(200).send(result))
	} else {
		return res.status(404).send({ message: 'Username already exist.' })
	}
}
