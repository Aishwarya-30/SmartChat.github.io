import React from "react";
import { Avatar, IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchIcon from "@mui/icons-material/Search";
import WestIcon from "@mui/icons-material/West";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import {
	addFriendsRoute,
	allUsersRoute,
	avatarRoute,
	getAllFriendsRoute,
} from "../utils/APIRoutes";
import Contacts from "./Contacts";
import AvailableContacts from "./AvailableContacts";
import Logout from "./Logout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

export default function Chat({ currentUser, handlePreview }) {
	const date = new Date().toString();
	const hour = date.slice(16, 18);
	const minute = date.slice(19, 21);

	const [show, setShow] = useState(false);
	const [showArrow, setShowArrow] = useState(false);
	const [showAvatar, setShowAvatar] = useState(false);
	const [avatarImage, setAvatarImage] = useState("");
	const [allUsers, setAllUsers] = useState({});
	const [contact, setContact] = useState("");
	const [availableContacts, setAvailableContacts] = useState([]);
	const [showContact, setShowContact] = useState(false);
	// const [contacts, setContacts] = useState([]);
	const [friends, setFriends] = useState([]);
	const [edit, setEdit] = useState(true);

	useEffect(() => {
		if (currentUser) {
			setAvatarImage(currentUser.avatarImageURL);
		}
	}, [currentUser]);

	function handleMenu() {
		setShow(!show);
	}

	function handleArrow() {
		setShowArrow(!showArrow);
		const input = document.getElementById("user-search-bar");
		input.focus();
	}

	function handleSearchFocus() {
		setShowArrow(true);
	}

	function handleShowAvatar() {
		setShowAvatar(!showAvatar);
	}

	function handleClick() {
		setShowAvatar(!showAvatar);
	}

	function handleEdit() {
		setEdit(!edit);
		const input = document.getElementById("avatarImage");
		input.focus();
		input.select();
	}

	function handleAvatarImageURL(event) {
		const { value } = event.target;
		setAvatarImage(value);
		if (edit) {
			setEdit(!edit);
		}
	}

	async function handleAvatarImageSubmission(event) {
		event.preventDefault();

		const res = await fetch(avatarRoute, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				avatarImage,
				username: currentUser.username,
			}),
		});

		const data = await res.json();

		if (!data.status) {
			// console.log("Avatar image not sent");
		} else {
			// console.log("Avatar image sent");
			localStorage.setItem("chat-app-user", JSON.stringify(data.user));
		}

		setEdit(!edit);
		// setAvatarImage("");
		// navigate("/chats");
	}

	useEffect(() => {
		async function fetchData() {
			if (currentUser) {
				const res = await fetch(`${allUsersRoute}/${currentUser._id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await res.json();
				setAllUsers(data);
				// console.log(data);
			}
		}

		fetchData();
	}, [currentUser]);

	function handleContact(event) {
		const { value } = event.target;
		setContact(value);
		// console.log(contact);
		// handleSearchContacts();
	}

	function handleShowContact() {
		setShowContact(false);
	}

	function handleSearchContacts() {
		setAvailableContacts([]);
		allUsers.forEach(function (item) {
			let name = item.username;
			name = name.slice(0, contact.length);
			if (name === contact) {
				setAvailableContacts((prevValues) => {
					return [
						...prevValues,
						{
							_id: item._id,
							username: item.username,
							avatarImageURL: item.avatarImageURL,
						},
					];
				});
			}
		});
		setShowContact(true);
	}

	function handleStartChat(item) {
		setContact("");
		setShowContact(false);
		// setContacts((prevValues) => {
		// 	return [...prevValues, item];
		// });
		// console.log(contacts);
		handleSaveContacts(item);
	}

	async function handleSaveContacts(item) {
		// console.log(item);
		// console.log(currentUser);
		await fetch(addFriendsRoute, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: item._id,
				username: currentUser.username,
			}),
		});
	}

	useEffect(() => {
		async function getFriends() {
			if (currentUser) {
				const res = await fetch(
					`${getAllFriendsRoute}/${currentUser._id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const contacts = await res.json();

				// console.log(contacts);
				setFriends(contacts);
			}
		}

		getFriends();
	}, [currentUser, friends]);

	return (
		<div className="chat-section">
			<div
				className={
					showAvatar ? "inside-avatar slide-in" : "inside-avatar"
				}
			>
				<div className="user-heading-section">
					<div className="user-heading" onClick={handleClick}>
						<ArrowBackIosNewIcon className="user-heading-icon" />
						<p className="user-heading-name">Profile</p>
					</div>
				</div>
				<div className="user-profile">
					<img
						src={
							currentUser &&
							(avatarImage
								? avatarImage
								: currentUser.avatarImageURL)
						}
						alt="profile"
					/>
				</div>
				<div className="user-name">
					<p>Your username</p>
					<p>{currentUser && currentUser.username}</p>
				</div>

				<div className="insert-avatar-name">
					<p>Your display picture URL</p>
				</div>
				<form>
					<div className="insert-avatar">
						<input
							type="text"
							name="avatarImage"
							placeholder="Insert image URL"
							onKeyDown={(event) => {
								event.key === "Enter" &&
									handleAvatarImageSubmission();
							}}
							autoComplete="off"
							onChange={handleAvatarImageURL}
							value={avatarImage}
							id="avatarImage"
						/>

						{edit ? (
							<div onClick={handleEdit}>
								<IconButton>
									<EditIcon />
								</IconButton>
							</div>
						) : (
							<button
								className="icons"
								type="submit"
								onClick={handleAvatarImageSubmission}
							>
								<IconButton>
									<DoneIcon />
								</IconButton>
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="chat-header">
				<div className="display-picture" onClick={handleShowAvatar}>
					<Avatar
						src={
							currentUser &&
							(avatarImage
								? avatarImage
								: currentUser.avatarImageURL)
						}
					/>
				</div>
				<div className="menu">
					<div className="icons-section">
						<div className="icons donut">
							<IconButton>
								<DonutLargeIcon />
							</IconButton>
						</div>
					</div>
					<div className="icons-section">
						<div className="icons message">
							<IconButton>
								<MessageIcon />
							</IconButton>
						</div>
					</div>

					<div className="icons-section">
						<div className={show ? "icons more" : "icons"}>
							<IconButton onClick={handleMenu}>
								<MoreVertIcon />
							</IconButton>
						</div>
						{show && (
							<div className="menu-options">
								<div className="menu-list">
									<p>Settings</p>
								</div>
								<Logout />
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="chat-searchbar">
				<div className="icons-section">
					<div className="icons" onClick={handleArrow}>
						<IconButton>
							{showArrow ? <WestIcon /> : <SearchIcon />}
						</IconButton>
					</div>
				</div>
				<div className="chat-input-bar">
					<input
						type="text"
						name="contact"
						placeholder="Search or start a new chat"
						id="user-search-bar"
						onClick={handleSearchFocus}
						onChange={handleContact}
						value={contact}
						onKeyDown={(event) => {
							event.key === "Enter" && handleSearchContacts();
							event.key !== "Enter" && handleShowContact();
						}}
						autoComplete="off"
					/>
				</div>
				<div className="icons-section">
					<div className="icons" onClick={handleSearchContacts}>
						<IconButton>
							<ManageSearchIcon />
						</IconButton>
					</div>
				</div>

				{showContact && (
					<div className="show-users">
						{availableContacts.map((item, index) => (
							<AvailableContacts
								key={index}
								item={item}
								username={item.username}
								avatarImageURL={item.avatarImageURL}
								handleStartChat={handleStartChat}
							/>
						))}
					</div>
				)}
			</div>
			<Contacts
				friends={friends}
				hour={hour}
				minute={minute}
				handlePreview={handlePreview}
				currentUser={currentUser}
			/>
		</div>
	);
}
