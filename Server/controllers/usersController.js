const WhatsAppUser = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
	try {
		const { username, email, password, confirmpassword } = req.body;
		if (!username || !email || !password || !confirmpassword) {
			return res.json({ msg: "Please enter every field", status: false });
		}

		const usernameCheck = await WhatsAppUser.findOne({ username });
		if (usernameCheck) {
			return res.json({ msg: "Username already used", status: false });
		}

		const emailCheck = await WhatsAppUser.findOne({ email });
		if (emailCheck) {
			return res.json({ msg: "Email already used", status: false });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await WhatsAppUser.create({
			email,
			username,
			password: hashedPassword,
		});

		return res.json({ status: true, user });
	} catch (err) {
		next(err);
	}
};

module.exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await WhatsAppUser.findOne({ email });
		if (!user) {
			return res.json({
				msg: "Incorrect email or password",
				status: false,
			});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.json({
				msg: "Incorrect email or password",
				status: false,
			});
		}

		return res.json({ status: true, user });
	} catch (err) {
		next(err);
	}
};

module.exports.avatar = async (req, res, next) => {
	try {
		const { avatarImage, username } = req.body;
		// console.log(avatarImage);

		const user = await WhatsAppUser.findOne({ username });
		if (user) {
			user.avatarImageURL = avatarImage;
			await user.save();

			res.json({
				msg: "Avatar successfully uploaded",
				status: true,
				user,
			});
			// console.log(user);
		}
	} catch (err) {
		next(err);
	}
};

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await WhatsAppUser.find({
			_id: { $ne: req.params.id },
		}).select(["email", "username", "avatarImageURL", "_id"]);

		return res.json(users);
	} catch (err) {
		next(err);
	}
};

module.exports.addFriend = async (req, res, next) => {
	try {
		const { username, id } = req.body;

		const user = await WhatsAppUser.findOne({ username });

		user.friends.push(id);
		await user.save();

		return res.json({ msg: "Friend added successfully" });
	} catch (error) {
		next(error);
	}
};

module.exports.getAllFriends = async (req, res, next) => {
	try {
		const _id = req.params.id;

		const user = await WhatsAppUser.findOne({ _id });
		// console.log(user);

		const contacts = [];
		for (let i = 0; i < user.friends.length; i++) {
			const x = await WhatsAppUser.findOne({ _id: user.friends[i]._id });
			contacts.push(x);
		}
		// console.log("Contacts", contacts);

		return res.json(contacts);
	} catch (error) {
		next(error);
	}
};
