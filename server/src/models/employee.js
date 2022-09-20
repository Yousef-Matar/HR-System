const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		yearlyVacation: {
			type: Number,
			required: true,
		},
		attendance: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
)
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
