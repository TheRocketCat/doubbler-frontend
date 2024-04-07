import {useState} from "react";

export default function Register(){
	async function register(){
		const res = await fetch("http://localhost:3003/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				email, username, password, oneTimeCode,phoneNumber
			})
		})
	}

	const [email, setEmail] = useState("test@test.com")
	const [username, setUsername] = useState("test")
	const [password, setPassword] = useState("test")
	const [oneTimeCode, setOneTimeCode] = useState("123")
	const [phoneNumber, setPhoneNumber] = useState("123456789")

	return (
		<div style={{'display':'flex',"flex-flow":"column"}}>
			<h1>Register</h1>
			<input type="text" name="email" placeholder="email"
				value={email} onChange={event => setEmail(event.target.value)}
			/>
			<input type="text" name="phone-number" placeholder="phone number"
				value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}
			/>
			<input type="text" name="username" placeholder="username"
				value={username} onChange={event => setUsername(event.target.value)}
			/>
			<input type="text" name="password" placeholder="password"
				value={password} onChange={event => setPassword(event.target.value)}
			/>
			<input type="text" name="one-time-code" placeholder="one time code"
				value={oneTimeCode} onChange={event => setOneTimeCode(event.target.value)}
			/>
			<button onClick={register}>Register</button>
		</div>
	)
}
