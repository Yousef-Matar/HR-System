const express = require('express')
const { login } = require('../controllers/authController')
const { allEmployees, updateEmployee, employeeBYID, employeeCreation } = require('../controllers/employeesController')
const { allNotifications, notificationCreation, readNotification } = require('../controllers/notificationsController')
const { allHours, updateMonthlyHours, getCurrentMonthHours } = require('../controllers/monthlyHoursController')

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

module.exports = router
