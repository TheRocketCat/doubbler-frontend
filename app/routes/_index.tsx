import { type MetaFunction,json,LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {useEffect,useState} from "react"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({request}:LoaderFunctionArgs) {
	const cookie= request.headers.get("Cookie")
	const auth= cookie?.split(";").find((c) => c.trim().startsWith("access_token=")).split("=")[1]

	const res= await fetch('http://localhost:3003/store/offers',{
		headers: {
			"Authorization": "Bearer " + auth
		}
	})
	const codes= await fetch('http://localhost:3003/store/codes',{
		headers: {
			"Authorization": "Bearer " + auth
		}
	})
	const doubl= await fetch('http://localhost:3003/user/doubloner',{
		headers: {
			"Authorization": "Bearer " + auth
		}
	})
	if(!res.ok){
		throw new Error("Failed to fetch offers")
	}
	if(!codes.ok){
		throw new Error("Failed to codes")
	}
	if(!doubl.ok){
		console.log(doubl)
		throw new Error("Failed to fetch doubloner")
	}

	return json({
		offers: await res.json(),
		doubloner: (await doubl.json()).doubloner,
		codes: await codes.json()
	})
}

export default function Index() {
	const data = useLoaderData<typeof loader>()

	const [doubloner, setDoubloner] = useState(data.doubloner)
	const [message, setMessage] = useState("")
	const [codes, setCodes] = useState([...data.codes])

	async function buy(id:number){
			// TODO : Add buy logic
			// here it should generate another buy kwikk button?
			// probably not even possible, since kwikk takes payments in real cash
			const accessToken=window.localStorage.getItem("access_token")
			
			const res=await fetch(`http://localhost:3003/store/buy/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + accessToken
				}
			})
			if(res.ok){
				const json=await res.json()
				if(json.error){
					setMessage(json.error)
					return
				}

				setMessage("purchase successful")
				setDoubloner(json.doubloner)
				console.log(json)
				setCodes([...codes,json.code])
			}
	}
  return (
	<div className="container m-auto">
		<p>doubloner: {doubloner}</p>
		<p>message: {message}</p>
		<div>
			<h2>My Codes</h2>
			<div>
				{codes.map((code) => (
					<div>
						<p>{code.code}</p>
					</div>
				)
				)}
			</div>
		</div>
		<div>
			<h1 className="text-center text-2xl">Offers</h1> 
			<div className="grid grid-cols-3 gap-4">
				{data.offers.map((offer) => (
					<div className="bg-pink-500 p-5">
						<h1>{offer._name}</h1>
						<h2>Price: {offer._doublonerPrice}</h2>
						<button onClick={()=>buy(offer.id)}
							className="btn btn-blue"
						>
							Buy
						</button>
					</div>
				) )}
			</div>
		</div>
	</div>
  );
}

