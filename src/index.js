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
  let temperature = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].main);
  let wind = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let icon = (document.querySelector("#icon").innerHTML = setAttribute(
    "src",
    response.data.condition.icon_url
  ));
}

function displayCity(newcity) {
  let apikey = "0f9184c6bbbd99ef0f03atcoa48342a8";
  let query = "";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apikey}&units=imperial`;
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

function convertToFaherenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsuis(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentPosition);

displayCity("New York");
