const express = require('express')
const { login, checkout, logout } = require('../controllers/authController')
const { allEmployees, updateEmployee, employeeBYID, employeeCreation } = require('../controllers/employeesController')
const { allNotifications, notificationCreation, readNotification } = require('../controllers/notificationsController')
const { allHours, updateMonthlyHours, getCurrentMonthHours } = require('../controllers/monthlyHoursController')
const { allVacations, updateVacation, requestVacation, cancelVacation, employeeVacations } = require('../controllers/vacationsController')

// Router
const router = express.Router()
// Login
router.post('/login', login)
// Logout
router.patch('/logout/:id', logout)
// Check out
router.patch('/checkout/:id', checkout)
// Add Employee
router.post('/employees', employeeCreation)
// Get Employees
router.get('/employees', allEmployees)
// Get Employee By ID
router.get('/employees/:id', employeeBYID)
// Edit Employee
router.patch('/employees/:id', updateEmployee)
// Get All Notifiacations
router.get('/notifications/:id', allNotifications)
// Add Notifiacations
router.post('/notifications', notificationCreation)
// Read Notification
router.patch('/notifications/:id', readNotification)
// Get All Monthly Hours
router.get('/allhours', allHours)
// Get Current Monthly Hours
router.get('/hours', getCurrentMonthHours)
// Update Monthly Hours
router.patch('/hours/:id', updateMonthlyHours)
// Get All Vacation Requests
router.get('/vacations', allVacations)
// Get Employee Vacation Requests
router.get('/myvacations/:id', employeeVacations)
// Update Vacation Request
router.patch('/vacations/:id', updateVacation)
// Request Vacation
router.post('/vacations', requestVacation)
// Cancel Vacation Request
router.delete('/vacations/:id', cancelVacation)

module.exports = router
