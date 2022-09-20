const vacation = require('../models/vacationModel')

exports.allVacations = async (req, res) => {
	vacation.find().then((result) => res.status(200).send(result))
}
exports.employeeVacations = async (req, res) => {
	vacation.find({ requestedBy: req.params.id }).then((result) => res.status(200).send(result))
}
exports.updateVacation = async (req, res) => {
	vacation
		.findOneAndUpdate(
			req.params.id,
			{
				handledBy: req.body.handledBy,
				status: req.body.status,
			},
			{ new: true }
		)
		.then((result) => res.status(200).send(result))
}
exports.requestVacation = async (req, res) => {
	const Vacation = new vacation(req.body)
	Vacation.save().then((result) => res.status(200).send(result))
}
exports.cancelVacation = async (req, res) => {
	vacation.findOneAndDelete(req.params.id).then(() => res.json({ redirect: '/vacations' }))
}
