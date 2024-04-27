import { useNavigate } from "react-router-dom";
import getMe from "../../utils/getMe";
import { useEffect } from "react";

function Admin() {
	const navigate = useNavigate();

	const fetchUserDatas = async () => {
		const user = await getMe();
		if (!user)
			navigate("/login");

		if (user.role && user.role == 'TEACHER')
			navigate("/profile");
	};

	useEffect(() => {
		fetchUserDatas();
	}, []);

	return (
		<div>
			<p>Toto le rigolo haha</p>
		</div>
	);
}

export default Admin;
