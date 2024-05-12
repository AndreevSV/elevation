import {
  checkForExpiredTime,
  getCity,
  getCurrentConditions,
  getFiveDaysForecast,
  isCityInFavourites,
} from "./js/logic.js";
import moment from "moment"; // Connect as CDN

const SERVER = {
  url: "http://localhost:3000/",
};

document.addEventListener("DOMContentLoaded", showCurrentCity);
document.addEventListener("DOMContentLoaded", showCurrentForecast);
document.addEventListener("DOMContentLoaded", showFiveDaysForecast);
document
  .getElementById("toFavourites")
  .addEventListener("click", addToFavourites);
document.addEventListener("click", toggleFavourites);

async function showCurrentForecast() {
  if (localStorage.getItem("currentConditions") === null) {
    await getCurrentConditions();
  }
  if (checkForExpiredTime()) {
    localStorage.removeItem("currentConditions");
    await getCurrentConditions();
  }
  const currentConditionsStr = localStorage.getItem("currentConditions");
  const currentConditions = JSON.parse(currentConditionsStr);

  const iconNum = currentConditions[0].weatherIcon;
  const path = await getIcon(iconNum);
  document.getElementById("weatherIcon").src = path;

  const temperature = currentConditions[0].Temperature.Metric.Value;
  document.getElementById("temperature").textContent = `${temperature} °C`;

  const weatherText = currentConditions[0].WeatherText;
  document.getElementById("weatherText").textContent = weatherText;
}

async function showCurrentCity(cityObj) {
  const cityKey = cityObj.Key;
  if (localStorage.getItem("targetCity") === null) {
    await getCity(cityKey);
  }
  const cityStr = localStorage.getItem("targetCity");
  const city = await JSON.parse(cityStr);
  document.getElementById("targetCity").textContent = city[LocalizedName];
  if (isCityInFavourites(cityKey)) {
    document
      .getElementById("toFavourites")
      .classList.toggle("fa-solid fa-star");
  }
}

async function getIcon(num) {
  try {
    const response = await fetch(`${SERVER.url}api/icons/${num}`);
    if (!response.ok) {
      throw new Error("Faild to fetch icon");
    }
    const data = await response.json();
    return data.path;
  } catch (error) {
    console.error(error);
  }
}

async function showFiveDaysForecast() {
  if (localStorage.getItem("fiveDaysForecast") === null) {
    await getFiveDaysForecast();
  }
  if (!isFiveDaysForecastActual()) {
    getFiveDaysForecast();
  }

  document.getElementById("fiveDaysContainer").innerHTML = "";

  const fiveDaysForecastStr = localStorage.getItem("fiveDaysForecast");
  const fiveDaysForecastObj = await JSON.parse(fiveDaysForecastStr);
  const forecastArr = fiveDaysForecastObj.DailyForecasts;

  for (let index = 0; index < forecastArr.length; index++) {
    const dayEpoch = forecastArr[index].EpochDate;
    const date = moment(dayEpoch).format("Do MMMM YYYY");
    const dayOfWeek = moment(dayEpoch).format("dddd");

    const tempMin = forecastArr[index].Temperature.Minimum.Value;
    const tempMax = forecastArr[index].Temperature.Maximum.Value;
    const tempUnit = forecastArr[index].Temperature.Minimum.Unit;

    const iconDay = forecastArr[index].Day.Icon;
    const iconPhraseDay = forecastArr[index].Day.IconPhrase;
    const hasPrecipitationDay = forecastArr[index].Day.HasPrecipitation;
    let precipitationTypeDay = "";
    let precipitationIntensityDay = "";
    if (hasPrecipitationDay) {
      precipitationTypeDay = forecastArr[index].Day.PrecipitationType || "";
      precipitationIntensityDay =
        forecastArr[index].Day.PrecipitationIntensity || "";
    }

    /*  possibly add to code after main task - night forecast
    
    const iconNight = forecastArr[index].Night.Icon;
    const iconPhraseNight = forecastArr[index].Night.IconPhrase;
    const hasPrecipitationNight = forecastArr[index].Night.HasPrecipitation;
    const precipitationTypeNight = "";
    const precipitationIntensityNight = "";
    if (hasPrecipitationNight) {
      precipitationTypeNight = forecastArr[index].Night.PrecipitationType || "";
      precipitationIntensityNight =
        forecastArr[index].Night.PrecipitationIntensity || "";
    } */

    const path = getIcon(iconDay);

    const oneDayForecat = /*html*/ `
          <div id ='day${index}'>
            <p><h3>${dayOfWeek}</h3></p>
            <p>${date}</p>
            <p><h2>${tempMax}</h2> / ${tempMin} ${tempUnit}</p>
            <p>${iconPhraseDay}</p>
            <img src="${path}" alt="Weather Icon #${index}">
          </div>
          `;

    document.getElementById("fiveDaysContainer").innerHTML += oneDayForecat;
  }
}

async function isFiveDaysForecastActual() {
  const fiveDaysForecastStr = localStorage.getItem("fiveDaysForecast");
  const fiveDaysForecastObj = await JSON.parse(fiveDaysForecastStr);
  const dateOfFirstDate = fiveDaysForecastObj.DailyForecasts[0].Date;
  const date = new Date();
  moment(date).isSame(dateOfFirstDate, "day");
}

async function toggleFavourites() {
  let element = document.getElementById("toFavourites");
  const targetCity = localStorage.getItem("targetCity");
  const targetCityObj = JSON.parse(targetCity);
  if (element.classList.contains("fa-regular fa-star")) {
    await fetch(`${SERVER.url}api/favourites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(targetCityObj),
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("City added to favourites successfully", responseData);
        element.classList.toggle("fa-solid fa-star");
      })
      .catch((error) =>
        console.error("Error occured during adding to favourites", error)
      );
  } else {
    await fetch(`${SERVER.url}api/favourites/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(targetCityObj),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("City removed from Favourites successfully", responseData);
        element.classList.toggle("fa-regular fa-star");
      })
      .catch((error) => {
        console.error(
          "Error occured while removing city from favourites",
          error
        );
      });
  }
}
