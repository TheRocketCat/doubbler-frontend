import { useState } from "react";

export default function FakeStore() {

  const items = [
		{
			"id": 1,
			"name": "T-shirt Röd",
			"price": 100,
			"image": "https://via.placeholder.com/150",
			"description": "This is a fake item. It's not real. It's just a demo."
		},
		{
			"id": 2,
			"name": "Jacka Svart",
			"price": 200,
			"image": "https://via.placeholder.com/150",
			"description": "This is a fake item. It's not real. It's just a demo."
		},
		{
			"id": 3,
			"name": "Grön Kepps",
			"price": 400,
			"image": "https://via.placeholder.com/150",
			"description": "This is a fake item. It's not real. It's just a demo."
		},
		{
			"id": 4,
			"name": "Viol Skor",
			"price": 800,
			"image": "https://via.placeholder.com/150",
			"description": "This is a fake item. It's not real. It's just a demo."
		},
	]

	async function checkDiscountCode(){
		const accessToken=window.localStorage.getItem("access_token")
		const res = await fetch('http://localhost:3003/store/check-code-validity',{
			method: 'POST',
			body: JSON.stringify({code: discountCode}),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			}
		})

		if(!res.ok){
			console.error("Error")
			return
		}
		
		const json = await res.json()
		console.log(json)
		setDiscountedPrice(price * 0.8)
	}

	async function buyItems(){
		const accessToken=window.localStorage.getItem("access_token")
		const res = await fetch('http://localhost:3003/store/use-code',{
			method: 'POST',
			body: JSON.stringify({code: discountCode}),
			headers: {
				"content-type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
		})

		const json = await res.json()
		
		if(!res.ok){
			console.error("Error: ", json)
			return
		}

		window.alert("Items bought - code deleted")
	}

	function addItemToCart(item:any) {
		const newItems=[...cartItems, item]
		setCartItems(newItems)
		let totalPrice:number=0
		newItems.forEach((item:any) => {
			totalPrice+= item.price
		})
		setPrice(totalPrice)
	}


	const [cartItems, setCartItems] = useState([items[0]])
	const [price, setPrice] = useState(items[0].price)
	const [discountedPrice, setDiscountedPrice] = useState(price)
	const [discountCode, setDiscountCode] = useState("")
  
	return (
		<div>
			<h1 className="text-center text-4xl m-10">Fake Store</h1>
				<div className="container m-auto grid grid-flow-col">
					{items.map((item) => (
						<div key={item.id}>
							<img src={item.image} alt={item.name} />
							<h2>{item.name}</h2>
							<p>{item.description}</p>
							<p>{item.price} kr</p>
							<button onClick={()=>addItemToCart(item)}>
								Add to cart
							</button>
						</div>
					))}
				</div>
				<div className="container mt-10 m-auto">
					<h2 className="text-3xl m-10">Cart</h2>
					<div className="grid grid-flow-col">
						{cartItems.map((item) => (
							<div key={item.id}>
								<img src={item.image} alt={item.name} />
								<h2>{item.name}</h2>
								<p>{item.description}</p>
								<p>{item.price} kr</p>
								<button>
									Remove
								</button>
							</div>
						))}
					</div>
					<div className="mt-5">
						<p>Price: {price}</p>
						{discountedPrice == price ? "" : (
						<p>Discount Price: {discountedPrice}</p>
						)}
						<input type="text" placeholder="Discount" onChange={(e)=>setDiscountCode(e.target.value)}/>
						<button onClick={checkDiscountCode} className="bg-blue-500 p-5 m-5">
							Check Discount
						</button>
						<button 
							onClick={buyItems}
							className="bg-blue-500 p-5 m-5"
						>
							Buy
						</button>
					</div>
				</div>
		</div>
	);
}

function checkCodeValidation(){}
