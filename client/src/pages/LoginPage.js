import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const[redirect, setRedirect] = useState(false);
	const {setUserInfo} = useContext(UserContext);

	async function login(ev) {
		ev.preventDefault();
		const response  = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify({username, password}),
			headers: {'Content-Type': 'application/json'},
			credentials: 'include'
		});

		if (response.ok) {
			response.json().then(userInfo => {
				setUserInfo(userInfo);
				setRedirect(true);
			});
		} else {
			alert('wrong credentials');
		}
	}

	if (redirect) {
		return <Navigate to={'/'}/>
	}

	return (
		<form className="login" onSubmit={login}>
			<div><h1>Login</h1></div>
			<div>
				<label>Username:</label>
				<input type="text" id="username" value={username} onChange={ev => setUsername(ev.target.value)} required/>
			</div>

			<div>
				<label>Password:</label>
				<input type="password" id="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
			</div>

			<div>
				<button>Login</button>
			</div>
		</form>
	);
}
