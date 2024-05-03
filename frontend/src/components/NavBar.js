import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
	}, []); // TODO: Do timer instead of only on component loaded (every 5 / 10 seconds)
	// ------------------------------

	function handleClick() {
		sessionStorage.removeItem("access_token");
		navigate("/login");
	}

	return (
		<div className="navBar">
			{userData.firstName === undefined | null ? <p>toto</p> : <p>{userData.firstName}, {userData.email}</p>}
			{location.pathname}
			<button onClick={handleClick}>
				logout
			</button>
		</div>
	);
}

export default NavBar
