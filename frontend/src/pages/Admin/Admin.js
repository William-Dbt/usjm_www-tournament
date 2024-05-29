import { useNavigate } from "react-router-dom";
import getMe from "../../utils/getMe";
import { useEffect, useState } from "react";
import AdminNavigation from "./components/AdminNavigation";
import "../../styles/Admin.css"

function Admin() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [contentToShow, setContentToShow] = useState(undefined);

	const fetchUserDatas = async () => {
		const user = await getMe();
		if (user && user.role && user.role === 'TEACHER')
			navigate("/profile"); // TODO: popup Unauthrorized page
		else if (!user)
			navigate("/login");

		setUser(user);
	};

	useEffect(() => {
		fetchUserDatas();
		// eslint-disable-next-line
	}, []);

	if (contentToShow === undefined) {
		setContentToShow(
			// TODO : Show stats of players ...
			<p>toto</p>
		);
	}

	return (
		<div className="adminComponent">
			<AdminNavigation user={user} setContent={setContentToShow} />
			<div className="selectedContent">
				{contentToShow}
			</div>
		</div>
	);
}

export default Admin;
