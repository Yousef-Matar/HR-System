const employee = require('../models/employeeModel')

exports.allEmployees = async (req, res) => {
	employee.find().then((result) => res.status(200).send(result))
}
exports.updateEmployee = async (req, res) => {
	const checkEmployee = await employee.findOne({ username: req.body.username })
	if (!checkEmployee) {
		employee
			.findByIdAndUpdate(
				req.params.id,
				{
					username: req.body.username,
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					role: req.body.role,
					status: req.body.status,
					yearlyVacation: req.body.yearlyVacation,
				},
				{ new: true }
			)
			.then((result) => res.status(200).send(result))
	} else {
		if (checkEmployee._id == req.params.id) {
			employee
				.findByIdAndUpdate(
					req.params.id,
					{
						username: req.body.username,
						password: req.body.password,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						role: req.body.role,
						status: req.body.status,
						yearlyVacation: req.body.yearlyVacation,
					},
					{ new: true }
				)
				.then((result) => res.status(200).send(result))
		} else {
			return res.status(400).send({ message: 'Username is already in use.' })
		}
	}
}
exports.employeeCreation = async (req, res) => {
	const checkEmployee = await employee.findOne({ username: req.body.username })
	if (!checkEmployee) {
		const Employee = new employee(req.body)
		Employee.save().then((result) => res.status(200).send(result))
	} else {
		return res.status(400).send({ message: 'Username already exist.' })
	}
}
