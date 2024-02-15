import Signup from "./Signup";
import Login from "./Login";
import "../../styles/Auth.css";

function Auth(props) {
	let formToShow;

	if (props.signup === true)
		formToShow = <Signup />
	else
		formToShow = <Login />

	return (
		<div className="auth-page">
			{formToShow}
		</div>
	);
}

export default Auth;
