import { useNavigate } from "react-router-dom";
import getMe from "../../utils/getMe";
import { useEffect } from "react";

function Admin() {
	const navigate = useNavigate();

	const fetchUserDatas = async () => {
		const user = await getMe();
		if (user && user.role && user.role === 'TEACHER')
			navigate("/profile"); // TODO: popup Unauthrorized page
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
