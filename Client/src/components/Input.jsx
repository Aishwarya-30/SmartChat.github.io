import { IconButton } from "@mui/material";
import React, { useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Picker from "emoji-picker-react";

export default function Input({ handleSendMsg }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [msg, setMsg] = useState("");
	const [isSubmit, setIsSubmit] = useState(false);

	function handleChange(event) {
		setIsSubmit(true);
		setMsg(event.target.value);
	}

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	function handleEmojiClick(event) {
		// console.log(event);
		setIsSubmit(true);
		let message = msg;
		message += event.emoji;
		setMsg(message);
	}

	function handleClick(event) {
		event.preventDefault();
		if (msg.length > 0) {
			handleSendMsg(msg);
			setMsg("");
		}
		setIsSubmit(false);
	}

	return (
		<form>
			<div className="message-form">
				<div className="icons-section emoji-picker">
					<div className="icons " onClick={handleEmojiPickerHideShow}>
						<IconButton>
							<TagFacesIcon />
						</IconButton>
					</div>
					<div className="emoji-picker-options">
						{showEmojiPicker && (
							<Picker onEmojiClick={handleEmojiClick} />
						)}
					</div>
				</div>

				<div className="sending-message">
					<input
						onChange={handleChange}
						type="text"
						placeholder="Type a message"
						name="conversation"
						value={msg}
						onKeyDown={(event) => {
							event.key === "Enter" && handleClick(event);
						}}
					/>
					<div className="icons-section">
						{isSubmit ? (
							<div onClick={handleClick} className="icons">
								<IconButton>
									<SendIcon />
								</IconButton>
							</div>
						) : (
							<div className="icons">
								<IconButton>
									<MicIcon />
								</IconButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</form>
	);
}
