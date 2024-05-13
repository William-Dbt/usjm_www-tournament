import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import getMe from "../utils/getMe";
import "../styles/NavBar.css"

function NavBar() {
	const navigate = useNavigate();
	const location = useLocation();

	const [userData, setUserData] = useState({});

	const blacklistedLocations = [
		"/login",
		"/signup"
	];

	// When component is loaded, check if the user is already connected or not
	// Depending of the blacklisted locations (where users doesn't have to be connected)
	// Redirect the user to the login page to be logged
	const fetchUserDatas = async () => {
		const user = await getMe();
		if (user)
			setUserData(user);
		else {
			const isBlacklistedLocation = blacklistedLocations.find((word) => {
				if (word === location.pathname)
					return true; // Return the finded pathname

				return false; // Return undefined
			});
			// If user is not connected and is not on protected page, redirect to login page
			if (!isBlacklistedLocation)
				navigate("/login")
		}
	};

	useEffect(() => {
		fetchUserDatas();
		// eslint-disable-next-line
	}, []);
	// ------------------------------

	function handleLogoutClick() {
		sessionStorage.removeItem("access_token");
		navigate("/login");
	}

	return (
		<div className="navBar">
			{userData.firstName === undefined | null ? <p>toto</p> : <p>{userData.firstName}, {userData.email}</p>}
			{location.pathname}
			<Link to="/admin">Admin</Link>
			{
				(sessionStorage.getItem("access_token") !== null)
					? <button onClick={handleLogoutClick}>logout</button> : <></>
			}
		</div>
	);
}

export default NavBar;
