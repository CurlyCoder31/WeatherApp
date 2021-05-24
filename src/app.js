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
  "Sat",
];
let day = days[currentDate.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#High").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#Low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#Feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function search(event) {
  event.preventDefault();
  let apiKey = "418734821e39e859c1f889f957790464";
  let cityName = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", search);
