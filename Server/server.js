const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const messagesRoute = require("./routes/messagesRoute");

const app = express();

const socket = require("socket.io");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

require("./DB/connection");

const server = app.listen(process.env.PORT, () => {
	console.log(`Server listening on PORT ${process.env.PORT}`);
});

const io = socket(server, {
	cors: {
		// origin: "http://localhost:3000",
		origin: "https://chatappwhatsappclone.netlify.app",
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	// console.log(socket.id);

	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("send-msg", (data) => {
		// console.log(data);
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data);
		}
	});
});
