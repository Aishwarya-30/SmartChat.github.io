const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: {
				type: String,
				required: true,
			},
			time: Array,
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "WhatsAppUser",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Messages", messageSchema);
