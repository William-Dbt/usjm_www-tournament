import React from "react";

function UserContainer(props) {
	const { user, userToShow } = props;

	var deleteButton = undefined;
	if (user.role === 'OWNER')
		deleteButton = <button>❌</button>;

	return (
		<div className="userContainer">
			<p className="names">{userToShow.lastName} {userToShow.firstName}</p>
			<p className="role">{userToShow.role}</p>

			<div className="manageButtons">
				{deleteButton ? deleteButton : <></>}
			</div>
		</div>
	);
}

export default UserContainer;
