//Current city and infos

function updateInfo(response) {
  function displayFarenheit(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temperature");
    let farenheitTemperature = Math.round(
      (response.data.main.temp * 9) / 5 + 32
    );
    currentTemperature.innerHTML = `${farenheitTemperature}`;
  }

  function displayCelcius(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temperature");
    let celciusTemperature = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = `${celciusTemperature}`;
  }
  document.querySelector("h1").innerHTML = `${response.data.name}`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-feels-like").innerHTML = Math.round(
    response.data.main.feels_like);
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#current-min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-overall-description").innerHTML =
  response.data.weather[0].main;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#current-icon").setAttribute("alt", `${response.data.weather[0].description}`);

  let linkFarenheit = document.querySelector("#unit-farenheit");
  linkFarenheit.addEventListener("click", displayFarenheit);
  let linkCelcius = document.querySelector("#unit-celcius");
  linkCelcius.addEventListener("click", displayCelcius);
  let sunriseTime= response.data.sys.sunrise*1000;
 sunriseTime = new Date (sunriseTime);
 let sunsetTime= response.data.sys.sunset*1000;
 sunsetTime = new Date (sunsetTime);
 document.querySelector("#sunrise-time").innerHTML = sunriseTime.toLocaleTimeString();
  document.querySelector("#sunset-time").innerHTML = sunsetTime.toLocaleTimeString();

}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `7f10d25441a1a7ff7317938abc53019d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateInfo);
}

// Current location
function askLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Search city
function searchCity(city) {
  if (city) {
    let apiKey = `7f10d25441a1a7ff7317938abc53019d`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(updateInfo);
  } else {
    alert(`Please enter a city`);
  }
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}

//Parameters

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

//Generic degrees conversion C to F

function displayFarenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `68`;
}

let linkFarenheit = document.querySelector("#unit-farenheit");
linkFarenheit.addEventListener("click", displayFarenheit);

function displayCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `20`;
}

let linkCelcius = document.querySelector("#unit-celcius");
linkCelcius.addEventListener("click", displayCelcius);

//Update city - action

let citySubmit = document.querySelector("#button-search-submit");
citySubmit.addEventListener("click", submit);

//Current city - trigger

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hour}:${minute}`;

//current location - button

let currentLocation = document.querySelector("#button-current-location-submit");
currentLocation.addEventListener("click", askLocation);

searchCity("Brussels");
