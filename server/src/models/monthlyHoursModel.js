const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthlyHoursSchema = new Schema(
	{
		hours: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

const MonthlyHours = mongoose.model('MonthlyHours', monthlyHoursSchema)

module.exports = MonthlyHours
