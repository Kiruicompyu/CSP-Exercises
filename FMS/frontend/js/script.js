const form = document.querySelector(".form-grid");

form.addEventListener("submit", async (e)=>{
e.preventDefault();

const from = document.querySelector("#from").value;
const to = document.querySelector("#to").value;

const response = await fetch(`/api/flights?from=${from}&to=${to}`);

const flights = await response.json();

displayFlights(flights);

});

function displayFlights(flights){

const results = document.createElement("div");
results.classList.add("results");

flights.forEach(flight=>{

const card = document.createElement("div");
card.classList.add("flight-card");

card.innerHTML = `
<h3>${flight.airline}</h3>
<p>${flight.from} → ${flight.to}</p>
<p>Price: $${flight.price}</p>
<button onclick="bookFlight('${flight.id}')">Book</button>
`;

results.appendChild(card);

});

document.body.appendChild(results);

}

function bookFlight(id){
alert("Flight booked! ID: "+id);
}