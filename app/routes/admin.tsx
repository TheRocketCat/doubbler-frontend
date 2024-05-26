import {useState} from "react"

export default function Admin() {
	return (
		<section className="flex">
			<KwikkPayment />
		</section>
	)
}

function KwikkPayment(){
	const [phoneNumber, setPhoneNumber] = useState("")
	const [amount, setAmount] = useState(500)

	return (
		<div>
			<h1 className="text-2xl">Kwikk Payment</h1>
			<div className="[&_*]:block [&_*]:m-3">
				<label>phone number</label>
				<input 
					type="text" placeholder="phone number" value={phoneNumber} 
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<label>Amount</label>
				<input type="number" placeholder="amount" value={amount}

					onChange={(e) => setAmount(Number(e.target.value))}
				/>

				<button onClick={() => kwikkPayment(phoneNumber, amount)} className="p-3 bg-green-500">
					Simulate Kwikk Payment
				</button>
			</div>
		</div>
	)
}


async function kwikkPayment(phoneNumber: string, doubbloner: number){
	const res = await fetch("http://localhost:3003/store/kwikk-payment-hook", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			phoneNumber,
			amount:doubbloner
		})
	})
	if(!res.ok){
		alert("An Error Occured")
	}
	const json= await res.json()

	if(json["newUser"] === true){
		alert("New User Created, sign in code: " + json["code"])
	}else{
		alert("User got payment")
	}}
