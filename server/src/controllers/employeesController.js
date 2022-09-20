const employee = require('../models/employeeModel')

exports.allEmployees = async (req, res) => {
	employee.find().then((result) => res.status(200).send(result))
}
exports.updateEmployee = async (req, res) => {
	employee
		.findOneAndUpdate(
			req.params.id,
			{
				username: req.body.username,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				role: req.body.role,
				status: req.body.status,
				yearlyVacation: req.body.yearlyVacation,
				attendance: req.body.attendance,
			},
			{ new: true }
		)
		.then((result) => res.status(200).send(result))
}
