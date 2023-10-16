const mongoose = require("mongoose");

const whatsAppUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 20,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatarImageURL: {
		type: String,
		default:
			"https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
	},
	friends: [
		{
			friendId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "WhatsAppUser",
			},
		},
	],
});

module.exports = mongoose.model("WhatsAppUser", whatsAppUserSchema);
