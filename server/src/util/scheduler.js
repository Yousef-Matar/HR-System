const cron = require('node-cron')
const employee = require('../models/employeeModel')

exports.yearlyVacationReset = cron.schedule('* * 1 1 *', async () => {
	await employee.updateMany({}, { $set: { yearlyVacation: 21 } })
})
