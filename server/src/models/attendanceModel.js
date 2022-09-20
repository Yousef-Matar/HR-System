const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema(
	{
		time: {
			type: Array,
			required: true,
			default: [],
		},
		employeeID: { type: String, required: true },
	},
	{ timestamps: true }
)

const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance
