const apikey = "5d50cb77a4d850371ce5a430e31c9b24";
const weatherDataEL = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input');
const formEL = document.querySelector('form');

const getWeatherData = async (cityValue) => {
    console.log('cityValue', cityValue)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const descirption = data.weather[0].descirption;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]
        weatherDataEL.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
        weatherDataEL.querySelector(
            '.temperature'
        ).textContent = `${temperature}°C`;
        weatherDataEL.querySelector('.description').textContent = descirption;
        weatherDataEL.querySelector('.details').innerHTML = details.map(detail => `<div>${detail}</div>`).join("");
    } catch (error) {
        //handle errors
        weatherDataEL.querySelector(".icon").innerHTML = "";
        weatherDataEL.querySelector(".temperature").textContent = "";
        weatherDataEL.querySelector(".details").innerHTML = "";
        weatherDataEL.querySelector(".description").innerHTML = "An error occurred, please try again later";
    }
}

formEL.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue)
})

//fetch axios