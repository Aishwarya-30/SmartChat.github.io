import React from "react";
import { Avatar } from "@mui/material";

export default function AvailableContacts({
	item,
	username,
	avatarImageURL,
	handleStartChat,
}) {
	function handleClick() {
		handleStartChat(item);
	}

	return (
		<div className="contact-info" onClick={handleClick}>
			<Avatar src={avatarImageURL} />
			<p>{username}</p>
		</div>
	);
}
