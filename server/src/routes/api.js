const express = require('express')
const { login, employeeCreation } = require('../controllers/authController')
const { allEmployees, updateEmployee } = require('../controllers/employeesController')
// Router
const router = express.Router()
// Login
router.post('/login', login)
// Add Employee
router.post('/employees', employeeCreation)
// Get Employees
router.get('/employees', allEmployees)
// Edit Employee
router.patch('/employees/:id', updateEmployee)

module.exports = router
