import API from "./api";

export default async function getMe() {
	const accessToken = sessionStorage.getItem("access_token");

	if (!accessToken)
		return null;

	try {
		const user = await API.get("/auth/getMe");
		if (!user)
			sessionStorage.removeItem("access_token");

		return user;
	}
	catch (error) {
		console.log(error);
		sessionStorage.removeItem("access_token");
	}
}
