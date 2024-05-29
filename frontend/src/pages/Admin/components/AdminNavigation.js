import UsersList from "./usersList/UsersList";

function AdminNavigation(props) {
	return (
		<nav className="adminNav">
			<button onClick={() => {props.setContent(undefined)}}>
				main page
			</button>
			<button onClick={() => {
					props.setContent(<UsersList user={props.user} />)
				}}>
				list of users
			</button>
		</nav>
	);
}

export default AdminNavigation;
