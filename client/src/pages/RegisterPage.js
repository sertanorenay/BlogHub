import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function RegisterPage(){
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const[redirect, setRedirect] = useState(false);

	async function register(ev) {
		ev.preventDefault();
		console.log({name, lastname, email, username, password});

		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify({name, lastname, email, username, password}),
			headers: {'Content-Type':'application/json'},
			credentials: 'include'
		});

		if (response.ok) {
			setRedirect(true);
		} else {
			alert('wrong credentials');
		}
	}

	if (redirect) {
		return <Navigate to={'/login'}/>
	}

	return (
		<form className="register" onSubmit={register}>
			<div><h1>Register</h1></div>
			<div>
				<label>Name:</label>
				<input type="text" id="name" value={name} onChange={ev => setName(ev.target.value)} required/>
			</div>

			<div>
				<label>Surname:</label>
				<input type="text" id="lastname" value={lastname} onChange={ev => setLastname(ev.target.value)} required/>
			</div>

			<div>
				<label>E-Mail Address:</label>
				<input type="text" id="email" value={email} onChange={ev => setEmail(ev.target.value)} required/>
			</div>

			<div>
				<label>Username:</label>
				<input type="text" id="username" value={username} onChange={ev => setUsername(ev.target.value)} required/>
			</div>

			<div>
				<label>Password:</label>
				<input type="password" id="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
			</div>

			<div>
				<button>Register</button>
			</div>
		</form>
	);
}