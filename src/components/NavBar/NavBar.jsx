import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
	let nav = props.user ? (
		<div className="navigation">
			<span className="NavBar-welcome">
				Welcome, {props.user.name[0].toUpperCase() + props.user.name.slice(1)}
			</span>
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<Link to="" className="NavBar-link" onClick={props.handleLogout}>
				Log Out
			</Link>
		</div>
	) : (
		<div className="navigation">
			<Link to="/login" className="NavBar-link">
				Log In
			</Link>
			&nbsp;&nbsp;|&nbsp;&nbsp;
			<Link to="/signup" className="NavBar-link">
				Sign Up
			</Link>
		</div>
	);

	return (
		<div className="NavBar">
			{" "}
			<div className="header">C O D E &nbsp;&nbsp;&nbsp; I O</div> {nav}
		</div>
	);
};

export default NavBar;
