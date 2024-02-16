import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="container">
			<h1>Se connecter</h1>
			<form>
				<input input="email" name="email" placeholder="Adresse email" />
				<input input="password" name="password" placeholder="Mot de passe" />
				<button type="button">Se connecter</button>
			</form>
			<small>Pas encore inscrit ? <Link className="link" to="/signup">Créer un compte</Link></small>
		</div>
	);
}

export default Login;