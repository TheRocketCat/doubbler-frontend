import {Form} from "@remix-run/react"
//import {redirect} from "@remix-run/node"
import React from "react"
import {useNavigate,redirect} from "react-router-dom"
import {Link} from "@remix-run/react"

export async function action({request}) {
	const body = await request.formData()

	const res = await fetch("http://localhost:3003/auth/login", {
		method: "POST",
		body:JSON.stringify({
			username: body.get("username"),
			password: body.get("password")
		}),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if(!res.ok){
		return new Response(
			new Blob(
				[JSON.stringify({error:"Login failed"})],
				{type:"application/json"}
			),
			{status:401}
		)
	}

	const json = await res.json()

	return redirect("/", {
		headers: {
			"Content-Type": "application/json",
		},
		body: res.body
	})
}

export default function Login() {
	const [user, setUser] = React.useState("user")
	const [password, setPassword] = React.useState("password")
	const [message, setMessage] = React.useState("")

	const navigate = useNavigate()

	async function login(){
		const res = await fetch("http://localhost:3003/auth/login", {
			method: "POST",
			body:JSON.stringify({
				username: user,
				password: password
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if(res.ok){
			const json = await res.json()
			if(!json.access_token){
				throw new Error("No access token")
			}
			window.localStorage.setItem("access_token", json.access_token)
			document.cookie = `access_token=${json.access_token}`
			//return redirect("/")
			navigate("/")
		}
		setMessage("Login failed")
	}

	return (
			<div>
				<h1>Login</h1>
					<label>Username</label>
					<input type="text" name="username" value={user} onChange={event => setUser(event.target.value)}/>
					<label>Password</label>
					<input type="password" name="password" value={password} onChange={event=>setPassword(event.target.value)}/>
					<button onClick={login}>Login</button>
				<p>{message}</p>
				<Link to="/register">Register / First Time Login</Link>
			</div>
	)
}
