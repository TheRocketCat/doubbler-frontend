import { type MetaFunction,json,LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
	const doubl= await fetch('http://localhost:3003/user/doubloner',{
		headers: {
			"Authorization": "Bearer " + auth
		}
	})
	if(!res.ok){
		throw new Error("Failed to fetch offers")
	}
	if(!doubl.ok){
		console.log(doubl)
		throw new Error("Failed to fetch doubloner")
	}

	return json({
		offers: await res.json(),
		doubloner: (await doubl.json()).doubloner
	})
}

export default function Index() {
	const json = useLoaderData<typeof loader>()

	console.log(json)
  return (
	<div>
		<p>doubloner: {json.doubloner}</p>
		<div>
			<h1>Offers</h1> 
			{json.offers.map((offer) => (
				<div style={{"margin":"10px","backgroundColor":"blue","padding":"10px"}}>
					<h1>{offer._name}</h1>
					<h2>Price: {offer._doublonerPrice}</h2>
					<button onClick={()=>buy(offer.id)}>Buy</button>
				</div>
			) )}
		</div>
	</div>
  );
}

function buy(name){
	console.log(name)
	// TODO : Add buy logic
	// here it should generate another buy kwikk button?
	// probably not even possible, since kwikk takes payments in real cash
}
