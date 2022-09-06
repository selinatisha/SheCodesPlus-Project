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
let apiKey = "32841bf58a0117b2a6d2f3dbd1f1115f";

// 4. Function to update temperature
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let temperatureElement = document.querySelector("#current-temp");
  let description = document.querySelector("#temperature-description");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = `Humidity: ${humid}%`;
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;
}

// 3. function to update elements with new information
function updateInput(input, city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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
//selle
