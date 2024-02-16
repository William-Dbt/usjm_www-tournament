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
		<div>
			{formToShow}
		</div>
	);
}

export default Auth;
