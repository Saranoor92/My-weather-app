let now = new Date();
let currentDate = document.querySelector("#currentDay");
let date = now.getDate();
let year = now.getFullYear();

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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];

let hours = now.getHours();
hours = hours % 12;
hours = hours ? hours : 12;

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDate.innerHTML = `${hours}:${minutes} ${day}, ${currentMonth} ${date}, ${year}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let input = document.querySelector("#input");
  input.innerHTML = input.value;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}°C`;
  let h1 = document.querySelector("#current-city");
  h1.innerHTML = response.data.name;
}

function currentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}
function currentTempButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentTemp);
}

let click = document.querySelector("#currentTemp");
click.addEventListener("click", currentTempButton);
