const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema(
	{
		employeeID: {
			type: String,
			required: true,
		},
		checkout: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
)

const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance
