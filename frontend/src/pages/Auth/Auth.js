import Signup from "./components/Signup";
import Login from "./components/Login";
import "../../styles/Auth.css";

function Auth(props) {
	return (
		<div className="formWindow">
			{props.signup === true ? <Signup /> : <Login />}
		</div>
	);
}

export default Auth;
