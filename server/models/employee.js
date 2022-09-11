const mongoose = require('mongoose')
const schema = mongoose.Schema

const employeeSchema = new schema(
	{
		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee
