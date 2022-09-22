const notification = require('../models/notificationModel')

exports.allNotifications = async (req, res) => {
	notification.find({ reciverID: req.params.id }).then((result) => res.status(200).send(result))
}
exports.notificationCreation = async (req, res) => {
	const Notification = new notification(req.body)
	Notification.save().then((result) => res.status(200).send(result))
}
exports.readNotification = async (req, res) => {
	notification
		.findByIdAndUpdate(
			req.params.id,
			{
				status: 'read',
			},
			{ new: true }
		)
		.then((result) => res.status(200).send(result))
}
