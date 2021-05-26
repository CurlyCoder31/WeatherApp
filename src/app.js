let currentDate = new Date();
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
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
let day = days[currentDate.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
        <span>${formatForecast(forecastDay.dt)}</span>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
              />
              <span class="Max"> ${Math.round(
                forecastDay.temp.max
              )}° </span> <span class="Min">${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "418734821e39e859c1f889f957790464";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let highElement = document.querySelector("#High");
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  let lowElement = document.querySelector("#Low");
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  let feelElement = document.querySelector("#Feel");
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  let windElement = document.querySelector("#Wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value;

  searchCity(cityName);
}
function searchCity(cityName) {
  let apiKey = "418734821e39e859c1f889f957790464";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round(celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

let celsiusTemperature = null;

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", search);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

searchCity("Kansas City");
