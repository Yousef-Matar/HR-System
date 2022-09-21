const employee = require('../models/employeeModel')
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
				if (Employee.attendance.length == 0 || !Employee.attendance[Employee.attendance.length - 1].currentDay == new Date().toLocaleDateString()) {
					Employee.attendance = Employee.attendance.concat([
						{
							currentDay: new Date().toLocaleDateString(),
							checkInTime: new Date().toLocaleTimeString(),
							checkOutTime: null,
						},
					])
					Employee.save()
				}
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
	employee
		.findOneAndUpdate(
			{
				_id: req.params.id,
				attendance: { $elemMatch: { currentDay: new Date().toLocaleDateString() } },
			},
			{ $set: { 'attendance.$.checkOutTime': new Date().toLocaleTimeString() } },
			{ new: true }
		)
		.then((result) => {
			res.status(200).send(result)
		})
}
