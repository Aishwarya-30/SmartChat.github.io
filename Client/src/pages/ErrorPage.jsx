import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div id="notfound">
			<div className="notfound-404">
				<h1>404</h1>
			</div>
			<div className="not-found-details">
				<h2>WE ARE SORRY, PAGE NOT FOUND!!</h2>
				<p className="para">
					The page you are looking for might have been removed or had
					it's name changed or is temporarily unavailable.
				</p>
			</div>
			<div className="not-found-button">
				<button>
					<Link className="back-home" to="/">
						Back to Home page
					</Link>
				</button>
			</div>
		</div>
	);
}
