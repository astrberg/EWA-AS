let { ipcRenderer, shell } = require("electron");

document.addEventListener("click", event => {
  if (event.target.href) {
    shell.openExternal(event.target.href);
    event.preventDefault();
  } else if (event.target.classList.contains("js-quit-action")) {
    window.close();
  }
});

let getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

let getWeather = position => {
  //  https://darksky.net/dev/
  let apiKey = "394f0c8aa1e4acd4973d6cbb24528d0c";
  let location = `${position.coords.latitude},${position.coords.longitude}`;
  let forecast = `https://api.darksky.net/forecast/${apiKey}/${location}?units=si`;

  return window.fetch(forecast).then(response => {
    return response.json();
  });
};

let updateView = weather => {
  let currently = weather.currently;
  let daily = weather.daily;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  console.log(currently);
  document.querySelector(".window-content").style.backgroundImage =
    "url(img/" + currently.icon.toLocaleString() + ".jpg)";

  document.querySelector(".js-summary").textContent = currently.summary;
  document.getElementById("js-weather-icon").src =
    "weatherIcons/" + currently.icon + ".png";

  document.querySelector(".js-update-time").textContent = `at ${new Date(
    currently.time
  ).toLocaleTimeString()}`;
  document.querySelector(".js-get-location").textContent = weather.timezone;

  document.querySelector(".js-temperature").textContent = `${Math.round(
    currently.temperature
  )}°C`;
  document.querySelector(".js-apparent").textContent = `${Math.round(
    currently.apparentTemperature
  )}° C`;

  document.querySelector(".js-wind").textContent = `${Math.round(
    currently.windSpeed
  )} km/h`;
  document.querySelector(".js-humidity").textContent = `${Math.round(
    currently.humidity * 100
  )}%`;

  document.querySelector(".js-cloud-cover").textContent = `${Math.round(
    currently.cloudCover * 100
  )}%`;
  document.querySelector(".js-ozone").textContent = `${Math.round(
    currently.ozone
  )} DU`;
  document.querySelector(".js-uvIndex").textContent = currently.uvIndex;

  for (let i = 1; i < 7; i++) {
    let date = new Date(daily.data[i].time * 1000),
      day = days[date.getDay()],
      temperatureHigh = daily.data[i].temperatureHigh;
    document.querySelector(".js-nextday" + i).textContent = `${Math.round(
      temperatureHigh
    )}° C`;
    document.getElementById("icon" + i).src =
      "weatherIcons/" + daily.data[i].icon + ".png";
    document.getElementById("desc" + i).innerHTML = day;
  }
};
let updateWeather = () => {
  getGeoLocation()
    .then(getWeather)
    .then(weather => {
      weather.currently.time = Date.now();
      ipcRenderer.send("weather-updated", weather);
      updateView(weather);
      setTimeout(updateWeather, 3600000);
    });
};

// Update initial weather when loaded
document.addEventListener("DOMContentLoaded", updateWeather);
