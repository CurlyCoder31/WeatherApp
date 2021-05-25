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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  
  let days = ["Sunday", "Monday", "Tuesday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-3">
              <span>Saturday</span>
              <img
                src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png"
                alt="cloudy-icon"
              />
              <span class="Day"> 66°F </span>
            </div>`;
    
  });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

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
}

function search(event) {
  event.preventDefault();
  let apiKey = "418734821e39e859c1f889f957790464";
  let cityName = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

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

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", search);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);

displayForecast();