const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		reciverID: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
