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

		const json=await res.json()
		if(json["error"]=="wrong code"){
			setMessage("wrong code")
		}else{
			setMessage("User Created")
		}
	}

	const [email, setEmail] = useState("test@test.com")
	const [username, setUsername] = useState("test")
	const [password, setPassword] = useState("test")
	const [oneTimeCode, setOneTimeCode] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("123456789")
	const [message, setMessage] = useState("")

	return (
		<div className="w-[300px] m-auto">
			<h1 className="text-2xl text-center">
				Register Account
			</h1>
			<div className="[&_*]:block">
				<label className="font-bold">Email</label>
				<input type="text" name="email" placeholder="email"
					value={email} onChange={event => setEmail(event.target.value)}
				/>
				<label className="font-bold">Phone Number</label>
				<input type="text" name="phone-number" placeholder="phone number"
					value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)}
				/>
				<label className="font-bold">Username</label>
				<input type="text" name="username" placeholder="username"
					value={username} onChange={event => setUsername(event.target.value)}
				/>
				<label className="font-bold">Password</label>
				<input type="text" name="password" placeholder="password"
					value={password} onChange={event => setPassword(event.target.value)}
				/>
				<label className="font-bold">One Time Code</label>
				<input type="text" name="one-time-code" placeholder="one time code"
					value={oneTimeCode} onChange={event => setOneTimeCode(event.target.value)}
				/>
				<button 
					onClick={register}
					className="p-3 bg-green-500"
				>
					Register
				</button>
				<p className="mt-5 bg-red-500">{message}</p>
			</div>
		</div>
	)
}
