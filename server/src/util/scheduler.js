var cron = require('node-cron')
const employee = require('../models/employeeModel')
const monthlyHours = require('../models/monthlyHoursModel')

exports.yearlyVacationReset = cron.schedule('* * 1 1 *', async () => {
	console.log('vacation')
	await employee.updateMany({}, { $set: { yearlyVacation: 21 } })
})
exports.MonthlyHoursCreation = cron.schedule('1 * * * *', async () => {
	const MonthlyHours = new monthlyHours({ hours: 40 })
	await MonthlyHours.save()
	console.log('MonthlyHours')
	//await monthlyHours.find().limit(1).sort({ $natural: -1 })
})





