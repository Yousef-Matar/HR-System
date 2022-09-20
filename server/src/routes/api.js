const express = require('express')
const { login } = require('../controllers/authController')
const { allEmployees, updateEmployee, employeeBYID, employeeCreation } = require('../controllers/employeesController')
// Router
const router = express.Router()
// Login
router.post('/login', login)
// Add Employee
router.post('/employees', employeeCreation)
// Get Employees
router.get('/employees', allEmployees)
// Get Employee By ID
router.get('/employees/:id', employeeBYID)
// Edit Employee
router.patch('/employees/:id', updateEmployee)

module.exports = router
