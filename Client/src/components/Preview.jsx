import React from "react";
import ComputerIcon from "@mui/icons-material/Computer";

export default function Preview() {
	const styleForComputerIcon = {
		height: "30vh",
		width: "30vh",
	};

	return (
		<div className="preview-section">
			<div className="preview">
				<div className="computer-icon">
					<ComputerIcon style={styleForComputerIcon} />
				</div>
				<div className="preview-info">
					<p>Now send and receive messages using this app.</p>
				</div>
			</div>
		</div>
	);
}
