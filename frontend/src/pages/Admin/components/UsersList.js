import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

function UsersList(props) {
	const [usersList, setUsersList] = useState([]);

	const fetchUsersList = async () => {
		await API.get("/user/usersList", props.user.id )
			.then((res) => {
				setUsersList(res);
			});
	};

	useEffect(() => {
		fetchUsersList();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{usersList.map((user) => {
				return <p key={user.firstName}>{user.firstName} {user.lastName}</p>;
			})}
		</>
	);
}

export default UsersList
