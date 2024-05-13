import React, { useEffect, useState } from "react";
import API from "../../../utils/api";

function UsersList(props) {
	const {user} = props;
	const [usersList, setUsersList] = useState([]);

	const fetchUsersList = async () => {
		await API.post('/user/machin', { 'toto':'titi' });
		await API.get('/user/usersList', { "toto": 'titi' })
			.then((res) => {
				console.log(res);
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
		<>
			{usersList.map((user) => {
				return <p key={user.firstName}>{user.firstName} {user.lastName}</p>;
			})}
		</>
	);
}

export default UsersList
