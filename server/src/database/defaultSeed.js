const employee = require('../models/employeeModel')
employee.countDocuments({}, function (err, count) {
	if (count <= 0) {
		var superAdmin = {
			username: 'SuperAdmin',
			password: 'SuperAdmin',
			firstName: 'SuperAdmin',
			lastName: 'SuperAdmin',
			role: 'SuperAdmin',
			status: 'active',
			yearlyVacation: 21,
		}
		employee.create(superAdmin, function (e) {
			if (e) {
				throw e
			}
		})
	}
})

const monthlyHours = require('../models/monthlyHoursModel')
monthlyHours.countDocuments({}, function (err, count) {
	if (count <= 0) {
		var monthlyhours = {
			hours: 40,
		}
		monthlyHours.create(monthlyhours, function (e) {
			if (e) {
				throw e
			}
		})
	}
})
