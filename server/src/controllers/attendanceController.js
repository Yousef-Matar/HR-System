const attendance = require('../models/attendanceModel')

exports.allAttendance = async (req, res) => {
	attendance.find().then((result) => res.status(200).send(result))
}
exports.employeeAttendance = async (req, res) => {
	attendance.find({ employeeID: req.params.id }).then((result) => res.status(200).send(result))
}
exports.attendanceCreation = async (req, res) => {
	const Attendance = new attendance(req.body)
	Attendance.save().then((result) => res.status(200).send(result))
}
