function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Variables
let apiKey = "528fa09953b7eb5b52fb10a3t4oae266";

// 4. Function to update forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-start">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="forecast-day">${formatDay(forecastDay.time)}</div>
      <div class="emoji">
        <img
          class="forecastEmoji"
          id="forecastWeatherIcon"
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
      </div>
      <div class="temp">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>/
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  console.log(coords);
  let apiKey = "528fa09953b7eb5b52fb10a3t4oae266";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// 4. Function to update temperature
function showTemperature(response) {
  console.log(response.data);
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let humid = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;

  let dateElement = document.querySelector("#current-date");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#WeatherIcon");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  dateElement.innerHTML = formatDate(response.data.time * 1000);
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = `${weatherDescription}`;
  humidElement.innerHTML = `Humidity: ${humid}%`;
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;
  iconElement.src = `${iconUrl}`;

  getForecast(response.data.coordinates);
}

// 3. function to update elements with new information
function updateInput(input, city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  input.innerHTML = Math.round(showTemperature);
}

// 2. function to get new information
function searchInput(event) {
  let input = document.querySelector("#inputCity");
  let city = input.value;
  updateInput(input, city);
}

//1.

let button = document.querySelector("#search-button");
button.addEventListener("click", searchInput);
//selle2
let infoButton = document.querySelector("#current-location-button");
infoButton.addEventListener("click", getLocation);

displayForecast();

// 2. function to get new information
function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showTemperature);
}

updateInput(input, "New York");
