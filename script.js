const apiKey = 'dc3f2021a8cd953c214f01eb2ef29818'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        alert('Please enter a location');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data');
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const { name, main, weather, wind, sys, visibility, clouds, rain, snow } = data;

    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    weatherDisplay.innerHTML += `
        <h2>${name},IN</h2>
        <i class="wi wi-owm-${weather[0].id}"></i> <!-- Weather Icon -->
        <p id="temperature" data-unit="celsius">${Math.round(main.temp)}°C</p>
        <button onclick="toggleUnits()">Toggle Units</button>
        <p>Humidity: ${main.humidity}%</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Visibility: ${visibility / 1000} km</p>
        <p>Pressure: ${main.pressure} hPa</p>
        <p>Cloudiness: ${clouds.all}%</p>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime}</p>
    `;

    if (rain) {
        weatherDisplay.innerHTML += `<p>Rain Volume: ${rain['1h']} mm/h</p>`;
    }
    if (snow) {
        weatherDisplay.innerHTML += `<p>Snow Volume: ${snow['1h']} mm/h</p>`;
    }
    // Show the weather display with fade-in animation
    weatherDisplay.style.display = 'block';
    weatherDisplay.classList.add('animate-fade-in');
}
function toggleUnits() {
    const tempElement = document.getElementById('temperature');
    const currentUnit = tempElement.dataset.unit;

    if (currentUnit === 'celsius') {
        // Convert Celsius to Fahrenheit
        const fahrenheitTemp = Math.round((parseFloat(tempElement.textContent) * 9) / 5 + 32);
        tempElement.textContent = `${fahrenheitTemp}°F`;
        tempElement.dataset.unit = 'fahrenheit'; // Update data-unit attribute
    } else {
        // Convert Fahrenheit to Celsius
        const celsiusTemp = Math.round(((parseFloat(tempElement.textContent) - 32) * 5) / 9);
        tempElement.textContent = `${celsiusTemp}°C`;
        tempElement.dataset.unit = 'celsius'; // Update data-unit attribute
    }
}


