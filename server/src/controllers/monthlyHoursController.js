const monthlyHours = require('../models/monthlyHoursModel')

exports.allHours = async (req, res) => {
	monthlyHours.find().then((result) => res.status(200).send(result))
}
exports.getCurrentMonthHours = async (req, res) => {
	monthlyHours
		.findOne()
		.sort({ createdAt: -1 })
		.limit(1)
		.then((result) => res.status(200).send(result))
}
exports.updateMonthlyHours = async (req, res) => {
	monthlyHours
		.findOneAndUpdate(
			req.params.id,
			{
				hours: req.body.hours,
			},
			{ new: true }
		)
		.then((result) => res.status(200).send(result))
}