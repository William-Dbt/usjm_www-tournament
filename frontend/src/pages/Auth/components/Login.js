import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getMe from "../../../utils/getMe";
import API from "../../../utils/api";

function Login() {
	const location = useLocation();
	const navigate = useNavigate();

	// Check if the user is already logged in when component is loaded
	// Redirect in his profile page if he is
	const fetchUserDatas = async () => {
		const user = await getMe();
		if (user)
			navigate("/profile");
	};

	useEffect(() => {
		fetchUserDatas();
		// eslint-disable-next-line
	}, []);

	const [inputFields, setInputFields] = useState({
		email: (location.state) ? location.state.email : "",
		password: ""
	});
	const [error, setError] = useState("");

	// Form's event
	function handleChange(event) {
		event.preventDefault();
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		API.post(
			"/auth/logIn",
			inputFields
		)
		.then((res) => {
			sessionStorage.setItem("access_token", res.access_token);
			navigate("/profile");
		})
		.catch(() => {
			setError("Email ou mot de passe incorrect");
		});
	}
	// ------------------------------

	return (
		<>
			<h1>Se connecter</h1>
			{error ? <span className="registrationError">{error}</span> : null}
			<form onSubmit={handleSubmit}>
				<input type="text"
					name="email"
					placeholder="Adresse email"
					value={inputFields.email}
					onChange={handleChange}
				/>
				<input type="password"
					name="password"
					placeholder="Mot de passe"
					value={inputFields.password}
					onChange={handleChange}
				/>
				<input type="submit" name="login" value="Se connecter" />
			</form>
			<small>Pas encore inscrit ? <Link className="link" to="/signup">Créer un compte</Link></small>
		</>
	);
}

export default Login;
