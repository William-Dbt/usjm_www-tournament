import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import UserContainer from "./UserContainer";

function UsersList(props) {
	const { user } = props;
	const [usersList, setUsersList] = useState([]);

	const fetchUsersList = async () => {
		await API.post('/user/usersList', { exceptId: user.id })
			.then((res) => {
				setUsersList(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (user.id === undefined)
			return ;

		fetchUsersList();
		// eslint-disable-next-line
	}, [user]);

	return (
		<div className="listContainer">
			{usersList.map((userToShow) => {
				return (<UserContainer user={user} userToShow={userToShow} />);
			})}
		</div>
	);
}

export default UsersList
