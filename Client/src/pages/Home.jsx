import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Chat from "../components/Chat";
import Preview from "../components/Preview";
import Message from "../components/Message";
import { io } from "socket.io-client";
import { useRef } from "react";
import { host } from "../utils/APIRoutes";

export default function Home() {
	const socket = useRef();
	const navigate = useNavigate();
	const [click, setClick] = useState(true);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);

	function handlePreview(chat) {
		setClick(false);
		// console.log(chat);
		// console.log(currentChat);
		setCurrentChat(chat);
	}

	useEffect(() => {
		async function fetchData() {
			if (!localStorage.getItem("chat-app-user")) {
				navigate("/login");
			} else {
				setCurrentUser(
					await JSON.parse(localStorage.getItem("chat-app-user"))
				);
			}
		}
		fetchData();
	}, [navigate]);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);

	return (
		<div>
			<div className="whatsapp-container">
				<Chat currentUser={currentUser} handlePreview={handlePreview} />
				{click ? (
					<Preview />
				) : (
					<Message
						currentUser={currentUser}
						currentChat={currentChat}
						socket={socket}
					/>
				)}
			</div>
		</div>
	);
}
