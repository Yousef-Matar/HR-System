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
			default: null,
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
			default: 'Pending',
		},
	},
	{ timestamps: true }
)

const Vacations = mongoose.model('Vacations', vacationSchema)

module.exports = Vacations
