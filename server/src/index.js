const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
// MongoDB URL
const { MongoDBURL } = require('./config/index')
// Scheduler
const schedule = require('node-schedule')
const employee = require('./models/employeeModel')
const monthlyHours = require('./models/monthlyHoursModel')
schedule.scheduleJob('0 0 1 * *', async () => {
	monthlyHours
		.findOne()
		.sort({ createdAt: -1 })
		.limit(1)
		.then(async (result) => {
			const MonthlyHours = new monthlyHours({
				hours: result.hours,
			})
			await MonthlyHours.save()
			console.log('done')
		})
})
schedule.scheduleJob('0 0 1 1 *', async () => {
	await employee.updateMany({}, { $set: { yearlyVacation: 21 } })
})
// Middleware
app.use(bodyParser.json())
app.use(cors())
// Port
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000
// MongoDB Connection
mongoose
	.connect(MongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		// Default Seed
		require('./database/defaultSeed')
		// Start the server
		app.listen(port, () => console.log(`Server is running on port ${port}`))
	})
	.catch((err) => console.error(err))
// API Routes
const api = require('./routes/api')
app.use('/api/', api)
