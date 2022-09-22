const employee = require('../models/employeeModel')
const attendance = require('../models/attendanceModel')
exports.login = async (req, res) => {
	const Employee = await employee.findOne({ username: req.body.username })
	if (!Employee) {
		// Employee not found
		return res.status(400).send({ message: 'User not found. Please contact your supervisor.' })
	}
	if (Employee.status === 'Disabled' || Employee.status === 'disabled') {
		// Employee Disabled
		return res.status(400).send({ message: 'This account has been disabled. Please contact your supervisor.' })
	}
	Employee.verifyPassword(req.body.password)
		.then((valid) => {
			if (valid) {
				// Employee Check In
				const Attendance = new attendance({ employeeID: Employee.id })
				Attendance.save()

				// Employee Found Correct
				return res.status(200).send({ employeeID: Employee.id })
			} else {
				// Incorrect Password
				return res.status(400).send({ message: 'Incorrect Username or Password.' })
			}
		})
		.catch((err) => {
			console.log(err)
		})
}
exports.checkout = async (req, res) => {
	attendance
		.findOneAndUpdate(
			{
				employeeID: req.params.id,
				checkout: false,
			},
			{ checkout: true },
			{ new: true }
		)
		.then((result) => {
			const Attendance = new attendance({ employeeID: req.params.id })
			Attendance.save()
			res.status(200).send(result)
		})
}
exports.logout = async (req, res) => {
	attendance
		.findOneAndUpdate(
			{
				employeeID: req.params.id,
				checkout: false,
			},
			{ checkout: true },
			{ new: true }
		)
		.then((result) => {
			res.status(200).send(result)
		})
}
