import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAllMessagesRoute, sendingMessageRoute } from "../utils/APIRoutes";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";

export default function Message({ currentUser, currentChat, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const scrollRef = useRef();

	async function handleSendMsg(msg) {
		const date = new Date().toString();
		const hour = date.slice(16, 18);
		const minute = date.slice(19, 21);
		const time = [hour, minute];

		await fetch(sendingMessageRoute, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: currentUser._id,
				to: currentChat._id,
				message: msg,
				time: time,
			}),
		});

		socket.current.emit("send-msg", {
			to: currentChat._id,
			from: currentUser._id,
			message: msg,
			time: time,
		});

		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg, time: time });
		setMessages(msgs);
	}

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				// console.log(msg);
				setArrivalMessage({
					fromSelf: false,
					message: msg.message,
					time: msg.time,
				});
			});
		}
	}, [socket]);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		if (currentChat) {
			async function fetchData() {
				const response = await fetch(getAllMessagesRoute, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						from: currentUser._id,
						to: currentChat._id,
					}),
				});

				const content = await response.json();

				setMessages(content);
				// console.log(content);
			}

			fetchData();
		}
	}, [currentChat, currentUser]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [messages]);

	return (
		<>
			{currentChat && (
				<div className="message-section">
					<div className="message-header">
						<div className="message-profile-picture">
							<Avatar src={currentChat.avatarImageURL} />

							<p>{currentChat.username}</p>
						</div>

						<div className="find-menu">
							<div className="icons-section">
								<div className="icons">
									<IconButton>
										<SearchIcon />
									</IconButton>
								</div>
							</div>

							<div className="icons-section">
								<div className="icons">
									<IconButton>
										<MoreVertIcon />
									</IconButton>
								</div>
							</div>
						</div>
					</div>

					<div className="message-container">
						{messages.map((message) => {
							return (
								<div
									className={
										message.fromSelf ? "you" : "other"
									}
									key={uuidv4()}
									ref={scrollRef}
								>
									{/* {console.log(message)} */}
									<div className="message">
										<div className="message-content">
											<p>{message.message}</p>
										</div>
										<div className="timestamp">
											{message.time[0]}:{message.time[1]}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<Input handleSendMsg={handleSendMsg} />
				</div>
			)}
		</>
	);
}
