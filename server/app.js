const express = require('express')
const mongoose = require('mongoose')
// Employees
const Employee = require('./models/employee')
// Express App
const app = express()
// CORS
const cors = require('cors')
app.use(cors({
	origin: 'http://localhost:8080',
}))
// Middleware
app.use(express.urlencoded({ extended: true }))
// Connect to MongoDB
const databaseURL = 'mongodb+srv://admin:admin@hr-system.1wfvawk.mongodb.net/HR-System-Database?retryWrites=true&w=majority'
mongoose
	.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('Connection to Database is Successfull')
		console.log(result)
		// Listening for requests
		app.listen(3000)
	})
	.catch((error) => {
		console.log('Connection to Database Failed')
		console.log(error)
	})

// Requests
// Get
app.get('/employees', (request, response) => {
	Employee.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			response.send(result)
		})
		.catch((error) => {
			console.log(error)
		})
})
app.get('/employee/:id', (request, response) => {
	Employee.findById('631b440ccaec3e5589c67e20')
		.then((result) => {
			response.send(result)
		})
		.catch((error) => {
			console.log(error)
		})
})
// Post
app.post('/employees', (request, response) => {
	const employee = new Employee(request.body)
	employee
		.save()
		.then((result) => {
			response.send(result)
		})
		.catch((error) => {
			console.log(error)
		})
})
// Redirects
// Error Pages
