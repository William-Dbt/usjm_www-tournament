import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import isStringEmpty from "../../../utils/isStringEmpty";

function Signup() {
	const [inputFields, setInputFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	});
	const [errors, setErrors] = useState({ password: [] });
	const [submitForm, setSubmitForm] = useState(false);

	// const navigate = useNavigate();

	// Check every time errors object is modifying if we can register the client
	// The errors object is modified only when the button to register is clicked
	useEffect(() => {
		if ((Object.keys(errors).length === 1 && errors.password.length === 0) && submitForm)
			finishSubmitForm();
	}, [errors, errors.password, submitForm]);

	// This function is called by useEffect() when the client
	// has complete all fields to register without errors
	// It will call the API to register the user in the db
	function finishSubmitForm() {
		let registerError;

		axios.post(`http://localhost:3000/auth/signIn`, {
			firstName: inputFields.firstName.trim(' '),
			lastName: inputFields.lastName.trim(' '),
			email: inputFields.email.trim(' '),
			password: inputFields.password.trim(' ')
		})
		.catch(error => { registerError = error; })

		// Reset variables
		setInputFields({
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		});
		setSubmitForm(false);
		// navigate('/login');
	}

	// Function to check if every field is well-formated to create the client
	// It returns an object of all errors to show to the client on the form
	function validateValues(inputValues) {
		const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
		let arr_errors = { password: [] };

		if (isStringEmpty(inputValues.firstName))
			arr_errors.firstName = "Vous devez renseigner un prénom.";

		if (isStringEmpty(inputValues.lastName))
			arr_errors.lastName = "Vous devez renseigner un nom de famille.";

		// - Email verification ---------
		if (isStringEmpty(inputValues.email))
			arr_errors.email = "Vous devez renseigner un email.";
		else if (!inputValues.email.match(validEmailRegex))
			arr_errors.email = "Votre adresse email n'est pas valide.";
		// ------------------------------

		// - Password verification ------
		if (inputValues.password.length < 6
			|| inputValues.password.length > 14)
			arr_errors.password.push("entre 6 et 14 caractères");

		if (!inputValues.password.match(/[A-Z]/g))
			arr_errors.password.push("au moins une lettre majuscule");

		if (!inputValues.password.match(/[a-z]/g))
			arr_errors.password.push("au moins une lettre minuscule");

		if (!inputValues.password.match(/[0-9]/g))
			arr_errors.password.push("au moins un chiffre");
		// ------------------------------
		
		return arr_errors;
	}

	function showPasswordErrorMessages(arrErrorMessages) {
		return (
			<div className="passwordErrorMessages">
				<span className="fieldError">⚠️ Le mot de passe doit contenir :</span>
				<ul className="ulPasswordErrors">
					{arrErrorMessages.map((errorMessage) => (
						<li className="fieldError" key={errorMessage}>{errorMessage}</li>
					))}
				</ul>
			</div>
		);
	}

	// Form's events
	function handleChange(event) {
		event.preventDefault();
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		setErrors(validateValues(inputFields));
		if (Object.keys(errors).length === 1 && errors.password.length === 0)
			setSubmitForm(true);
	}
	// -----

	return (
		<>
			<h1>S'inscrire</h1>
			<small>TODO: Do warning infos on personal datas</small>
			<form onSubmit={handleSubmit}>
				<input type="text"
					name="firstName"
					placeholder="Prénom"
					value={inputFields.firstName}
					onChange={handleChange}
				/>
				{errors.firstName ? (
					<span className="fieldError">⚠️ {errors.firstName}</span>
				) : null}
				<input type="text"
					name="lastName"
					placeholder="Nom de famille"
					value={inputFields.lastName}
					onChange={handleChange}
				/>
				{errors.lastName ? (
					<span className="fieldError">⚠️ {errors.lastName}</span>
				) : null}
				<input type="text"
					name="email"
					placeholder="Adresse mail"
					value={inputFields.email}
					onChange={handleChange}
				/>
				{errors.email ? (
					<span className="fieldError">⚠️ {errors.email}</span>
				) : null}
				<input type="password"
					name="password"
					placeholder="Mot de passe"
					value={inputFields.password}
					onChange={handleChange}
				/>
				{errors.password.length ? showPasswordErrorMessages(errors.password) : null}
				<input type="submit" name="login" value="Créer un compte" />
			</form>
			<small>Déjà inscrit ? Connecte toi <Link className="link" to="/login">ici</Link></small>
		</>
	);
}

export default Signup;
