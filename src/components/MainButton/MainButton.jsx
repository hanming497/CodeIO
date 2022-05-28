import React from "react";
import "./MainButton.css";

const MainButton = (props) => {
	return (
		<button
			onClick={props.clicked}
			disabled={props.disabled}
			className="buttons"
		>
			{props.name}
		</button>
	);
};

export default MainButton;
