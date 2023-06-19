function formatDate(date) {
  let now = new Date(date);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentYear = now.getFullYear();
  let currentDate = now.getDate();

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}, ${currentHour}; ${currentMinutes}`;
  return `${currentDay}, ${currentDate}, ${currentMonth}, ${currentYear}, ${currentHour}; ${currentMinutes}`;
}

formatDate(new Date());

function showTemperature(response) {
  let newcity = (document.querySelector("#newcity").innerHTML =
    response.data.name);
  let celsiusTemperature = response.data.main.temp;
  let temperature = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let wind = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let icon = (document.querySelector("#icon").innerHTML = setAttribute(
    "src",
    response.data.condition.icon_url
  ));
  let humidity = (document.querySelector("#humdity").innerHTML =
    response.data.main.humidity);
}

function displayCity(city) {
  let apikey = "0f9184c6bbbd99ef0f03atcoa48342a8";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=imperial`;
  axios.get(apiurl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let newcity = document.querySelector("#city-input").value;
  displayCity(newcity);
}

function currentPosition(response) {
  let apikey = "0f9184c6bbbd99ef0f03atcoa48342a8";
  let apiurl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikey}&units=imperial`;
  axios.get(apiurl).then(showTemperature);
}

function locationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.locationTemperature(currentPosition);
}

function faherenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  faherenheitTemperature.classList.add("active");
  celsiusTemperature.classList.remove("active");
  let faherenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(faherenheitTemperature);
}

function celsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusTemperature.classList.add("active");
  faherenheitTemperature.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentPosition);

let faherenheitTemperature = document.querySelector("#faherentheit");
faherenheitTemperature.addEventListener("click", faherenheitTemperature);

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", celsiusTemperature);

displayCity("New York");
