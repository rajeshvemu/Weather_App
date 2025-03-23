async function getWeather() {
    const city = document.getElementById("textInput").value;
    const apiKey = "7ca9ca4349bfe66d1a787b209ab7ef13";

    if (!city) {
        document.getElementById("SearchResult").innerHTML = "<p>Please enter a city name</p>";
        return;
    }

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherURL);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("SearchResult").innerHTML = `<p>${data.message}</p>`;
            return;
        }

        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("SearchResult").innerHTML = `
            <div class="box1">
                <img src="${iconURL}" alt="${data.weather[0].description}" />
                <span>${data.name}</span>
            </div>
            <div class="box">
                <img src="/temp1.png" alt="Temperature" />
                <span>Temperature: ${data.main.temp}°C</span>
            </div>
            <div class="box">
                <img src="/wind1.png" alt="Wind Speed" />
                <span>Wind Speed: ${data.wind.speed} m/s</span>
            </div>
            <div class="box">
                <img src="/weather1.png" alt="Weather" />
                <span>Weather: ${data.weather[0].description}</span>
            </div>`;
    } catch (error) {
        document.getElementById("SearchResult").innerHTML = "<p>Error fetching data</p>";
    }
}
