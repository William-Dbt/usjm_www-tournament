import React from "react";

function UserButton(props) {
	return (
		<div className="containerUser">
			<button>
				{props.user.firstName} {props.user.lastName}
			</button>
		</div>
	);
}

export default UserButton;
