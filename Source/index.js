let currentTime = new Date();

console.log(currentTime);
console.log(currentTime.getDay());
console.log(currentTime.getHours());
console.log(currentTime.getMinutes());

function current(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}
let weekday = current(currentTime);
let currentdate = document.querySelector("#current-date");
currentdate.innerHTML = `${weekday} ${currentTime.getHours()}:${currentTime.getMinutes()}`;

// Variables
let apiKey = "528fa09953b7eb5b52fb10a3t4oae266";

// 4. Function to update temperature
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let humid = Math.round(response.data.temperature.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#WeatherIcon");
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = `${weatherDescription}`;
  humidElement.innerHTML = `Humidity: ${humid}%`;
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;
  iconElement.src = `${iconUrl}`;
}

// 3. function to update elements with new information
function updateInput(input, city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  input.innerHTML = Math.round(showTemperature);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
}

// 2. function to get new information
function searchInput(event) {
  let input = document.querySelector("#inputCity");
  console.log(input);
  let city = input.value;
  updateInput(input, city);
}

//1.
let button = document.querySelector("#search-button");
button.addEventListener("click", searchInput);
//selle2
