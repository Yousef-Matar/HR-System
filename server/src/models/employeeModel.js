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
			bcrypt: true
		},
	},
	{ timestamps: true }
)
employeeSchema.plugin(require('mongoose-bcrypt'))
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
