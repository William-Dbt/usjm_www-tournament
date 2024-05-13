import { useNavigate } from "react-router-dom";
import getMe from "../../utils/getMe";
import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";

function Admin() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const fetchUserDatas = async () => {
		const user = await getMe();
		if (user && user.role && user.role === 'TEACHER')
			navigate("/profile"); // TODO: popup Unauthrorized page

		setUser(user);
	};

	useEffect(() => {
		fetchUserDatas();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<UsersList user={user} />
		</>
	);
}

export default Admin;
