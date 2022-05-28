import React from "react";
import "./TextContent.css";
const TextContent = (props) => {
	return (
		<label>
			{props.name}:
			<textarea
				value={props.value}
				onChange={props.onChange}
				className="text"
			/>
		</label>
	);
};

export default TextContent;
