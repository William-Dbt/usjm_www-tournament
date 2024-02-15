import { Link } from "react-router-dom";

function Signup() {
	return (
		<div className="container">
			<h1>S'inscrire</h1>
			<form>
				<input type="text" name="firstname" placeholder="Prénom" />
				<input type="text" name="lastname" placeholder="Nom de famille" />
				<input type="email" name="email" placeholder="Adresse mail" />
				<input type="password" name="password" placeholder="Mot de passe" />
				<input type="submit" name="register" value="Créer un compte" />
			</form>
			<small>Déjà inscrit ? Connecte toi <Link className="link" to="/login">ici</Link></small>
		</div>
	);
}

export default Signup;