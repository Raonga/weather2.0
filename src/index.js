function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 0) {
    hours`0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 0) {
    minutes`0${minutes}`;
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

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDate(
                  forecastDay.dt * 1000
                )}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(response) {
  let apiKey = "0f9184c6bbbd99ef0f03atcoa48342a8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#newcity").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  getForecast(response.data.coords);
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

function currentPosition(coordinates) {
  let apikey = "0f9184c6bbbd99ef0f03atcoa48342a8";
  let apiurl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikey}&units=imperial`;
  axios.get(apiurl).then(showTemperature);
}

function locationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.locationTemperature(currentPosition);
}

function displayFaherenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  faherenheitLink.classList.add("active");
  celsiusTemperature.classList.remove("active");
  let faherenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(faherenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  faherenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentPosition);

let faherenheitLink = document.querySelector("#faherentheit");
faherenheitLink.addEventListener("click", displayFaherenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayCity("New York");
