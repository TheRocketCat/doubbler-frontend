import {Form} from "@remix-run/react"

export async function action({request}) {
	return new Response("ok", {
		headers: {
			"Set-Cookie": "session=123"
			}
		})
}

export default function Login() {
	return (
		<Form method="post">
			<label>Username</label>
			<input type="text" name="username" />
			<label>Password</label>
			<input type="password" name="password" />
			<button type="submit">Login</button>
		</Form>
	)
}
