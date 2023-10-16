import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();

	async function handleClick() {
		localStorage.clear();
		navigate("/login");
	}

	return (
		<form>
			<div className="menu-list">
				<button onClick={handleClick}>Logout</button>
			</div>
		</form>
	);
}
