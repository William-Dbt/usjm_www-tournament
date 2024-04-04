import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getMe from "../utils/getMe";

function Profile() {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({});

	const fetchUserDatas = async () => {
		const user = await getMe();
		if (!user)
			navigate("/login");

		setUserData(user);
	};

	useEffect(() => {
		fetchUserDatas();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<p>{userData.email}</p>
		</>
	);
}

export default Profile;
