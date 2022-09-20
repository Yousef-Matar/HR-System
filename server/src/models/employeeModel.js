const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			bcrypt: true,
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
			default: 'Employee',
		},
		status: {
			type: String,
			required: true,
			default: 'Active',
		},
		yearlyVacation: {
			type: Number,
			required: true,
			default: 21,
		},
	},
	{ timestamps: true }
)
employeeSchema.plugin(require('mongoose-bcrypt'))
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
