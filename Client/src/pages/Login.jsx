import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { loginRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
	const navigate = useNavigate();

	const [focus, setFocus] = useState({
		email: true,
		password: true,
	});

	const [change, setChange] = useState({
		email: "",
		password: "",
	});

	function handleFocus(event) {
		const { name } = event.target;
		setFocus((prevValue) => {
			return {
				...prevValue,
				[name]: false,
			};
		});
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setChange((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000,
		pauseOnHover: "true",
		draggable: true,
		theme: "light",
	};

	useEffect(() => {
		if (localStorage.getItem("chat-app-user")) {
			navigate("/");
		}
	}, [navigate]);

	async function loginUser(event) {
		event.preventDefault();

		if (handleValidation()) {
			const res = await fetch(loginRoute, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: change.email,
					password: change.password,
				}),
			});

			const data = await res.json();

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem(
					"chat-app-user",
					JSON.stringify(data.user)
				);
				navigate("/");
			}
		}
	}

	function handleValidation() {
		const { email, password } = change;

		if (email === "") {
			toast.error("Email and password is required", toastOptions);
			return false;
		} else if (password === "") {
			toast.error("Email and password is required", toastOptions);
			return false;
		}
		return true;
	}

	const reactFacebookIconStyle = {
	color: "blue",
	paddingRight: "10px",
	};

	const reactGoogleIconStyle = {
	paddingRight: "10px",
	};

	return (
		<>
			<div className="login-section">
				<div className="login-about">
					<h1>SmartChat</h1>
					<p>Breaking barriers,connections that last.Your world, SmartChat!!!</p>
				</div>
				<div className="login-form">
					<div className="logins">
						<form>
							<div className="login-credentials">
								<div className="login-input">
									<p
										className={
											focus.email
												? "label-email"
												: "lable-email"
										}
									>
										Email Address
									</p>
									<input
										type="email"
										name="email"
										id="email"
										className="email"
										required
										onFocus={handleFocus}
										onChange={handleChange}
										autoComplete="on"
									/>
								</div>

								<div className="login-input">
									<p
										className={
											focus.password
												? "label-password"
												: "lable-password"
										}
									>
										Password
									</p>
									<input
										type="password"
										name="password"
										id="password"
										className="password"
										required
										onFocus={handleFocus}
										onChange={handleChange}
										autoComplete="on"
									/>
								</div>

								<button type="submit" onClick={loginUser}>
									Log In
								</button>
							</div>
						</form>
						{ <div className="login-social">
							<div className="google-login">
								<Link className="google" to="/auth/google">
									<FcGoogle
										style={reactGoogleIconStyle}
										size={28}
									/>{" "}
									Google
								</Link>
							</div>
							<div className="facebook-login">
								<Link className="facebook" to="/auth/facebook">
									<BsFacebook
										style={reactFacebookIconStyle}
										size={28}
									/>{" "}
									Facebook
								</Link>
							</div>
						</div> }
					</div>
					<hr className="break"></hr>
					<div className="signup-section">
						<p>Don't have an account?</p>
						<Link className="register-page" to="/register">
							<button>Create a new Account</button>
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
