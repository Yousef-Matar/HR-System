const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthlyHoursSchema = new Schema(
	{
		hours: {
			type: Number,
			required: true,
			default: 40,
		},
	},
	{ timestamps: true }
)

const MonthlyHours = mongoose.model('MonthlyHours', monthlyHoursSchema)

module.exports = MonthlyHours
