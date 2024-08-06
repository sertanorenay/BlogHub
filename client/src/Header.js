import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
	const {userInfo, setUserInfo} = useContext(UserContext);

	useEffect(() => {
		fetch('http://localhost:4000/profile', {
			credentials: 'include',
		}).then(response => {
			response.json().then(userInfo => {
				setUserInfo(userInfo);
			});
		});
	}, []);

	const username = userInfo?.username;

	function logout() {
		fetch('http://localhost:4000/logout', {
			method: 'POST',
			credentials: 'include'
		}).then(r => () => {console.log(r)});
		setUserInfo(null);
	}

	return (
		<div className="header-div">
			<header>
				<Link to="/" className="logo">BlogHub</Link>
				<nav>
					{username && (
						<>
							<Link to="/create-post">Create Post</Link>
							<a onClick={logout}>Logout ({username})</a>
						</>
					)}
					{!username && (
						<>
							<Link to="/">Home</Link>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</>
					)}
				</nav>
			</header>
		</div>
	);
}