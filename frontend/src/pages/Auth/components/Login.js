import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Login() {
	const location = useLocation();

	const [inputFields, setInputFields] = useState({
		email: (location.state) ? location.state.email : "",
		password: ""
	});

	// Form's event
	function handleChange(event) {
		event.preventDefault();
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	}

	function handleSubmit(event) {
		event.preventDefault();
	}
	// ------------------------------

	return (
		<>
			<h1>Se connecter</h1>
			<form onSubmit={handleSubmit}>
				<input input="email"
					name="email"
					placeholder="Adresse email"
					value={inputFields.email}
					onChange={handleChange}
				/>
				<input input="password" name="password" placeholder="Mot de passe" />
				<input type="submit" name="login" value="Se connecter" />
			</form>
			<small>Pas encore inscrit ? <Link className="link" to="/signup">Créer un compte</Link></small>
		</>
	);
}

export default Login;
