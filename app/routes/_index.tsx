import { type MetaFunction,json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
	const res= await fetch('http://localhost:3003/store/offers')
	return json(await res.json())
}

export default function Index() {
	const json = useLoaderData<typeof loader>()
	console.log(json)

  return (
	<>
		<h1>Offers</h1> 
		{json.map((offer) => (
			<div style={{"margin":"10px","backgroundColor":"blue","padding":"10px"}}>
				<h1>{offer._name}</h1>
				<h2>Price: {offer._doublonerPrice}</h2>
				<button>Buy</button>
			</div>
		) )}
	</>
  );
}

function Buy(){
	// TODO : Add buy logic
	// here it should generate another buy kwikk button?
	// probably not even possible, since kwikk takes payments in real cash
}
