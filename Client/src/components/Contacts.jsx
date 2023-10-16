import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getAllMessagesRoute } from "../utils/APIRoutes";

export default function Contacts({
	friends,
	hour,
	minute,
	handlePreview,
	currentUser,
}) {
	const [currentSelected, setCurrentSelected] = useState();
	const [currentChat, setCurrentChat] = useState();
	const [lastMessage, setLastMessage] = useState();

	function handleCurrentSelected(index, item) {
		setCurrentSelected(index);
		// console.log(item);
		handlePreview(item);
		setCurrentChat(item);
	}

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

				setLastMessage(content[content.length - 1]);

				// console.log(content);
				// console.log(lastMessage);
			}

			fetchData();
		}
	}, [currentChat, currentUser, lastMessage]);

	function handleMessage(message) {
		if (message.length > 45) {
			return message.slice(0, 45) + "...";
		} else {
			return message;
		}
	}

	return (
		<div className="chat-body">
			{friends.map((item, index) => {
				return (
					<div
						key={index}
						className={`chat-messages ${
							index === currentSelected ? "selected" : ""
						}`}
						onClick={() => handleCurrentSelected(index, item)}
					>
						<div className="profile-picture">
							<Avatar src={item.avatarImageURL} />
						</div>

						<div className="chat-details">
							<div className="chat-title-time">
								<div className="chat-title">
									<p>{item.username}</p>
								</div>
								{lastMessage &&
									item.username === currentChat.username && (
										<div className="chat-time">
											<p>
												{lastMessage.time[0]}:
												{lastMessage.time[1]}
											</p>
										</div>
									)}
							</div>
							{lastMessage &&
								item.username === currentChat.username && (
									<div className="chat-info">
										<p>
											{handleMessage(lastMessage.message)}
										</p>
									</div>
								)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
