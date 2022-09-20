const express = require('express')
const mongodb = require('mongodb')
// Router
const router = express.Router()

// Get Employees
router.get('/', async (req, res) => {
	const employees = await loadEmployeesCollection()
	res.send(await employees.find({}).toArray())
})
// Add Employee
router.post('/', async (req, res) => {
	const employees = await loadEmployeesCollection()
	await employees.insertOne({
		text: 'Employ',
		createdAt: new Date(),
	})
	res.status(201).send()
})

// Edit Employee

// Delete Employee
router.delete('/:id', async (req, res) => {
	const employees = await loadEmployeesCollection()
	await employees.deleteOne({
		_id: new mongodb.ObjectId(req.params.id),
	})
	res.status(200).send()
})
async function loadEmployeesCollection() {
	const client = await mongodb.MongoClient.connect('#', { useNewUrlParser: true })
	return client.db('HR-System').collection('employees')
}
module.exports = router
