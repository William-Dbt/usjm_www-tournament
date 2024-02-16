import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isStringEmpty from "../../utils/isStringEmpty";

function Signup() {
	// function handleSubmit(event) {
	// 	event.preventDefault();

	// 	axios.post(`http://localhost:3000/auth/signIn`, {
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 		email: email,
	// 		password: password
	// 	})
	// 	.then(res => {
	// 		console.log('res', res);
	// 		console.log('data', res.data);
	// 	})
	// 	.catch(error => {
	// 		if (error.response)
	// 			arr_errorMessages = error.response.data.message;

	// 		console.log(arr_errorMessages);
	// 	})
	// }

	const [inputFields, setInputFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	});
	const [errors, setErrors] = useState({});
	const [submitForm, setSubmitForm] = useState(false);

	// This function is called by useEffect() when the client
	// has complete all fields to register without errors
	// It will call the API to register the user in the db
	// !!!!!!!!!!!!!!!!!!!!!!
	// TODO: Connect the client and redirect on home ? page
	// Let's check how tokens works
	// !!!!!!!!!!!!!!!!!!!!!!
	function finishSubmitForm() {
		console.log('inputFields', inputFields);
		setInputFields({
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		});
		setSubmitForm(false);
	}

	// Check every time errors object is modifying if we can register the client
	// The errors object is modified only when the button to register is clicked
	useEffect(() => {
		if (Object.keys(errors).length === 0 && submitForm)
			finishSubmitForm();
	}, [errors]);

	// Function to check if every field is well-formated to create the client
	// !!!!!!!!!!!!!!!!!!!!!!
	// TODO: Check error cases (empty strings ...)
	// !!!!!!!!!!!!!!!!!!!!!!
	function validateValues(inputValues) {
		let arr_errors = {};

		if (isStringEmpty(inputValues.firstName))
			arr_errors.firstName = "Vous devez renseigner un prénom.";
		// TODO: Trim whitspaces for every fields
		// TODO: Make arr_errors fields array to manage multiple errors at same time

		if (inputValues.password.length < 6
			|| inputValues.password.length > 14)
			arr_errors.password = "Le mot de passe doit contenir entre 6 et 14 caractères.";

		return arr_errors;
	};

	// Form's events
	function handleChange(event) {
		event.preventDefault();
		setInputFields({ ...inputFields, [event.target.name]: event.target.value });
	};

	function handleSubmit(event) {
		event.preventDefault();
		setErrors(validateValues(inputFields));
		setSubmitForm(true);
	}
	// -----

	return (
		<div className="container">
			<h1>S'inscrire</h1>
			<form onSubmit={handleSubmit}>
				<input required
					type="text"
					name="firstName"
					placeholder="Prénom"
					value={inputFields.firstName}
					onChange={handleChange}
				/>
				{errors.firstName ? (
					<span className="fieldError">{errors.firstName}</span>
				) : null}
				<input required
					type="text"
					name="lastName"
					placeholder="Nom de famille"
					value={inputFields.lastName}
					onChange={handleChange}
				/>
				<input required
					type="email"
					name="email"
					placeholder="Adresse mail"
					value={inputFields.email}
					onChange={handleChange}
				/>
				<input required
					type="password"
					name="password"
					placeholder="Mot de passe"
					value={inputFields.password}
					onChange={handleChange}
				/>
				{errors.password ? (
					<span className="fieldError">{errors.password}</span>
				) : null}
				<input type="submit" name="login" value="Créer un compte" />
			</form>
			<small>Déjà inscrit ? Connecte toi <Link className="link" to="/login">ici</Link></small>
		</div>
	);
}

export default Signup;