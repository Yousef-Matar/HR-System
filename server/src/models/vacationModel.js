const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vacationSchema = new Schema(
	{
		requestedBy: {
			type: String,
			required: true,
		},
		handledBy: {
			type: String,
			nullable: true,
		},
		from: {
			type: String,
			required: true,
		},
		till: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Vacations = mongoose.model('Vacations', vacationSchema)

module.exports = Vacations
