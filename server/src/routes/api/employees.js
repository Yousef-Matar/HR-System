const express = require('express')
const employee = require('../../models/employee')
// Router
const router = express.Router()

// Get Employees
router.get('/', async (req, res) => {
	employee
		.find()
		.then((result) => res.send(result))
		.catch((err) => console.error(err))
})
// Get One Employee
router.get('/:id', async (req, res) => {
	employee
		.findById(req.params.id)
		.then((result) => res.send(result))
		.catch((err) => console.error(err))
})
// Add Employee
router.post('/', async (req, res) => {
	const Employee = new employee(req.body)
	Employee.save()
		.then((result) => res.send(result))
		.catch((err) => console.error(err))
	res.status(201).send()
})

// Edit Employee
router.patch('/:id', async (req, res) => {
	employee
		.findOneAndUpdate(req.params.id, {
			username: req.body.username,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			role: req.body.role,
			status: req.body.status,
			yearlyVacation: req.body.yearlyVacation,
			attendance: req.body.attendance,
		},{new: true})
		.then((result) => res.send(result))
		.catch((err) => console.error(err))
})

module.exports = router
