document.addEventListener("DOMContentLoaded", () => {
    const cardRow = document.getElementById("card-row");

    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            let cardBody = "";
            data.forEach(country => {
                cardBody += `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
                            <div class="card-body">
                                <h5 class="card-title">${country.name.common}</h5>
                                <p class="card-text">
                                    <strong>Official Name:</strong> ${country.name.official}<br>
                                    <strong>Region:</strong> ${country.region}<br>
                                    <strong>Population:</strong> ${country.population}
                                </p>
                                <a href="${country.maps.googleMaps}" class="btn btn-primary" target="_blank">Go to Map</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            cardRow.innerHTML = cardBody;
        });

    document.getElementById("searchBtn").addEventListener("click", searchCountry);
});

function searchCountry() {
    const userInput = document.getElementById("txtInput").value;
    const resultContainer = document.getElementById("resultContainer");
    const flagImg = document.getElementById("flagImg");
    const name = document.getElementById("name");
    const officialName = document.getElementById("officialName");
    const region = document.getElementById("region");
    const population = document.getElementById("population");

    fetch(`https://restcountries.com/v3.1/name/${userInput}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(country => {
                flagImg.src = country.flags.png;
                name.innerText = country.name.common;
                officialName.innerText = country.name.official;
                region.innerText = country.region;
                population.innerText = country.population;
            });
            resultContainer.style.display = "block";
        })
        .catch(error => {
            alert("Country not found. Please try again.");
            resultContainer.style.display = "none";
        });
}
