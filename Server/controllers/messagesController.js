const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
	try {
		const { from, to, message, time } = req.body;

		const data = await messageModel.create({
			message: { text: message, time: time },
			users: [from, to],
			sender: from,
		});

		if (data) {
			return res.json({
				msg: "Message added successfully",
				status: true,
			});
		} else {
			return res.json({
				msg: "Failed to add message to the database",
				status: false,
			});
		}
	} catch (err) {
		next(err);
	}
};

module.exports.getAllMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;

		const messages = await messageModel
			.find({
				users: {
					$all: [from, to],
				},
			})
			.sort({ updatedAt: 1 });

		const porjectedMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text,
				time: msg.message.time,
			};
		});

		res.json(porjectedMessages);
	} catch (err) {
		next(err);
	}
};
