document.addEventListener("DOMContentLoaded", () => {
    const cardRow = document.getElementById("card-row");

    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            let cardBody = "";
            data.forEach(country => {
                const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
                const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

                cardBody += `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
                            <div class="card-body">
                                <h5 class="card-title">${country.name.common}</h5>
                                <p class="card-text">
                                    <strong>Official Name:</strong> ${country.name.official}<br>
                                    <strong>Region:</strong> ${country.region}<br>
                                    <strong>Population:</strong> ${country.population}<br>
                                    <strong>Currencies:</strong> ${currencies}<br>
                                    <strong>Languages:</strong> ${languages}<br>
                                    <strong>Timezones:</strong> ${country.timezones.join(', ')}
                                </p>
                                <a href="${country.maps.googleMaps}" class="btn btn-primary" target="_blank">Location</a>
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
    const currencies = document.getElementById("currencies");
    const languages = document.getElementById("languages");
    const timezones = document.getElementById("timezones");

    fetch(`https://restcountries.com/v3.1/name/${userInput}`)
        .then(res => res.json())
        .then(data => {
            const country = data[0];
            const countryCurrencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
            const countryLanguages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

            flagImg.src = country.flags.png;
            name.innerText = country.name.common;
            officialName.innerText = country.name.official;
            region.innerText = country.region;
            population.innerText = country.population;
            currencies.innerText = countryCurrencies;
            languages.innerText = countryLanguages;
            timezones.innerText = country.timezones.join(', ');

            resultContainer.style.display = "block";
        })
        .catch(error => {
            alert("Country not found. Please try again.");
            resultContainer.style.display = "none";
        });
}
