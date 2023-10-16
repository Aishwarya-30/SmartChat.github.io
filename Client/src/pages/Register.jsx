import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
	const navigate = useNavigate();

	const [focus, setFocus] = useState({
		username: true,
		email: true,
		password: true,
		confirmpassword: true,
	});

	const [change, setChange] = useState({
		username: "",
		email: "",
		password: "",
		confirmpassword: "",
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

	async function signUpUser(event) {
		event.preventDefault();

		if (handleValidation()) {
			const { username, email, password, confirmpassword } = change;
			const res = await fetch(registerRoute, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
					confirmpassword,
				}),
			});

			const data = await res.json();
			console.log(data);

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

	const handleValidation = () => {
		const { username, email, password, confirmpassword } = change;

		if (password !== confirmpassword) {
			toast.error(
				"Password and confirm password should be same",
				toastOptions
			);
			return false;
		} else if (username.length < 3) {
			toast.error(
				"Username should be greater than 3 characters",
				toastOptions
			);
			return false;
		} else if (email === "") {
			toast.error("Email is required", toastOptions);
			return false;
		}
		return true;
	};

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
					<h1> SMARTCHAT </h1>
					<p>Breaking barriers,connections that last.Your world, SmartChat!!!</p>
				</div>
				<div className="login-form">
					<div className="logins">
						<form>
							<div className="login-credentials">
								<div className="login-input">
									<p
										className={
											focus.username
												? "label-username"
												: "lable-username"
										}
									>
										Username
									</p>
									<input
										type="text"
										name="username"
										id="username"
										className="username"
										required
										onFocus={handleFocus}
										onChange={handleChange}
										autoComplete="on"
									/>
								</div>
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

								<div className="login-input">
									<p
										className={
											focus.confirmpassword
												? "label-confirmpassword"
												: "lable-confirmpassword"
										}
									>
										Confirm Password
									</p>
									<input
										type="password"
										name="confirmpassword"
										id="confirmpassword"
										className="confirmpassword"
										required
										onFocus={handleFocus}
										onChange={handleChange}
										autoComplete="on"
									/>
								</div>

								<button type="submit" onClick={signUpUser}>
									Sign Up
								</button>
							</div>
						</form>

						{<div className="login-social">
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
						<p>Have an account?</p>
						<Link className="register-page" to="/login">
							<button>Login here</button>
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
