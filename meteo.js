// Read the configuration file
fetch('conf.json')
    .then(response => response.json())
    .then(config => {
        const { city, lat, lon } = config;
        document.getElementById('city-name').textContent = `${city}`;

        // Function to fetch and display weather data
        const fetchWeatherData = () => {
            const apiKey = '15f4ea923cbe6e02568c690cd6c4529d';
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const weather = data.current.weather[0];
                    const temperature = data.current.temp;
                    const humidity = data.current.humidity;
                    const windSpeed = data.current.wind_speed;
                    const precipitation = data.current.rain ? data.current.rain['1h'] : 0;

                    document.getElementById('temperature').textContent = `${Math.round(temperature)} °C`;
                    document.getElementById('Humidité').textContent = `Humidité: ${humidity}%`;
                    document.getElementById('Vitesse du vent').textContent = `Vitesse du vent: ${windSpeed} m/s`;
                    document.getElementById('Précipitation').textContent = `Précipitation: ${precipitation} mm`;
                })
                .catch(error => console.error('Error fetching weather data:', error));
        };

        // Initial fetch
        fetchWeatherData();

        // Set interval to fetch weather data every hour (3600000 ms)
        setInterval(fetchWeatherData, 3600000);
    })
    .catch(error => console.error('Error reading config file:', error));