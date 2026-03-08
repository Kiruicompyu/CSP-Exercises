
// javascript code for handling form submission and displaying flight results

const form = document.querySelector(".form-grid");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const from = document.querySelector("#from").value; 
    const to = document.querySelector("#to").value;


    const response = await fetch(`/api/flights?from=${from}&to=${to}`);

    const flights = await response.json();

    displayFlights(flights);

});

function displayFlights(flights) {

    const results = document.createElement("div");
    results.classList.add("results");

    flights.forEach(flight => {

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
    // default if no flights are found as searched
    if (flights.length === 0) {
        results.innerHTML = "<p>No flights found.</p>";
        console.log("no flights found for:", from, "to:", to);
    } else {
        console.log("matching flights found:", flights.length);
    }

}

function bookFlight(id) {
    alert("Flight booked! ID: " + id);
}