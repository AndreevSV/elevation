import {
  getCityApi,
  getCurrentConditionsApi,
  getFiveDaysForecastApi,
} from "./js/accuwether.api.js";
// import {
//   isCityInFavourites,
//   checkForExpiredTime,
// } from "./js/favourites.servise.js";
import { getIconByNumber } from "./js/icon.service.js";
import config from "./config/config.json" with { type: "json" };
// import moment from "moment/moment.js";
// import moment from "moment"; // Connect as CDN

document.addEventListener("DOMContentLoaded", displayCurrentConditions());
// document.addEventListener("DOMContentLoaded", displayFiveDaysForecast());
// document
//   .getElementById("toFavourites")
//   .addEventListener("click", addCityToFavourites );
// document.getElementById('favouritesStar').addEventListener("click", toggleFavourites);

// document.getElementById("searchField").addEventListener("input", function () {
//   const input = this.value;
//   if (input.length > 3) {
//     fetchCities(input);
//   }
// });

// function fetchCities(query) {
//   getCityApi(query)
//     .then((cities) => {
//       displayResult(cities);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

// function displayResult(cities) {
//   const resultsContainer = document.getElementById("autocomplete-results");
//   resultsContainer.innerHTML = "";
//   resultsContainer.style.display = "block";

//   cities.forEach((city) => {
//     const div = document.createElement("div");
//     div.textContent = city.LocalizedName;
//     div.onclick = () => selectCity(city);
//     resultsContainer.appendChild(dis);
//   });
// }

// function selectCity(city) {
//   document.getElementById("searchField").value = city.LocalizedName;
//   document.getElementById("autocomplete-results").style.display = "none";

//   displayCurrentConditions(city.Key);
//   displayFiveDaysForecast(city.Key);
// }

//   } else {
//   }

//   if (
//     localStorage.getItem("targetCity") === null ||
//     localStorage.getItem("targetCity") === ""
//   ) {
//     const cityKey = cityObj.Key;
//     await getCityApi(cityKey);
//   }
//   const cityStr = localStorage.getItem("targetCity");
//   const city = await JSON.parse(cityStr);
//   document.getElementById("targetCity").textContent = city.LocalizedName;
//   if (isCityInFavourites(cityKey)) {
//     document
//       .getElementById("toFavourites")
//       .classList.toggle("fa-solid", "fa-star");
//   }

//   return;
// }

async function displayCurrentConditions(cityKey = config.defaultLocationKey) {
  console.log('citykey', cityKey);
  await setCityInfo(cityKey);
  let currentConditionsStr = "";

  if (cityKey === config.defaultLocationKey) {
    currentConditionsStr = localStorage.getItem("defaultCityCurrentConditions");
  } else {
    currentConditionsStr = localStorage.getItem("currentCityCurrentConditions");
  }

  const currentConditions = JSON.parse(currentConditionsStr);
  const iconNumber = parseInt(currentConditions[0].weatherIcon);

  const path = await getIconByNumber(iconNumber);
  document.getElementById("weatherIcon").src = path;

  const temperature = currentConditions[0].Temperature.Metric.Value;
  document.getElementById("temperature").textContent = `${temperature} °C`;

  const weatherText = currentConditions[0].WeatherText;
  document.getElementById("weatherText").textContent = weatherText;
}

// async function displayFiveDaysForecast(cityKey = config.defaultLocationKey) {
//   await setCityInfo(cityKey);
//   let fiveDaysForecastStr = "";

//   if (cityKey === config.defaultLocationKey) {
//     fiveDaysForecastStr = localStorage.getItem("defaultCityfiveDaysForecast");
//   } else {
//     fiveDaysForecastStr = localStorage.getItem("currentCityFiveDaysForecast");
//   }

//   const fiveDaysForecastObj = await JSON.parse(fiveDaysForecastStr);
//   const forecastArr = fiveDaysForecastObj.DailyForecasts;

//   document.getElementById("fiveDaysContainer").innerHTML = "";

//   for (let index = 0; index < forecastArr.length; index++) {

//     const dateEpoch = forecastArr[index].EpochDate;
//     const date = moment(dateEpoch).format("Do MMMM YYYY");
//     const dayOfWeek = moment(dateEpoch).format("dddd");

//     const tempMin = forecastArr[index].Temperature.Minimum.Value;
//     const tempMax = forecastArr[index].Temperature.Maximum.Value;
//     const tempUnit = forecastArr[index].Temperature.Minimum.Unit;

//     const iconNumber = forecastArr[index].Day.Icon;
//     const iconPhraseDay = forecastArr[index].Day.IconPhrase;
//     const hasPrecipitationDay = forecastArr[index].Day.HasPrecipitation;
//     let precipitationTypeDay = "";
//     let precipitationIntensityDay = "";
//     if (hasPrecipitationDay) {
//       precipitationTypeDay = forecastArr[index].Day.PrecipitationType || "";
//       precipitationIntensityDay =
//         forecastArr[index].Day.PrecipitationIntensity || "";
//     }

//     const path = await getIconByNumber(iconNumber);

//     const oneDayForecat = /*html*/ `
//           <div id ='day${index}'>
//             <p><h3>${dayOfWeek}</h3></p>
//             <p>${date}</p>
//             <p><h2>${tempMax}</h2> <span>/ ${tempMin} ${tempUnit}</span></p>
//             <p>${iconPhraseDay}</p>
//             <img src="${path}" alt="Weather Icon #${index}">
//           </div>
//           `;
    
//     document.getElementById("fiveDaysContainer").innerHTML += oneDayForecat;
//   }
// }

async function setCityInfo(cityKey = config.defaultLocationKey) {
  if (cityKey === config.defaultLocationKey) {
    if (
      localStorage.getItem("defaultCity") === null ||
      localStorage.getItem("defaultCity") === ""
    ) {
      const defaultCity = await getCityApi(cityKey);
      localStorage.setItem("defaultCity", JSON.stringify(defaultCity));
    }
    if (
      localStorage.getItem("defaultCityCurrentConditions") === null ||
      localStorage.getItem("defaultCityCurrentConditions") === ""
    ) {
      const defaultCityCurrentConditions = await getCurrentConditionsApi(cityKey);
      localStorage.setItem(
        "defaultCityCurrentConditions",
        JSON.stringify(defaultCityCurrentConditions)
      );
    } else {
      const defaultCityCurrentConditions = localStorage.getItem(
        "defaultCityCurrentConditions"
      );
      const conditions = JSON.parse(defaultCityCurrentConditions);
      const epochTime = conditions[0].EpochTime;
      if (!isSameDay(epochTime)) {
        const defaultCityCurrentConditions = await getCurrentConditionsApi(cityKey);
        localStorage.setItem(
          "defaultCityCurrentConditions",
          JSON.stringify(defaultCityCurrentConditions)
        );
      }
    }
    if (
      localStorage.getItem("defaultCityfiveDaysForecast") === null ||
      localStorage.getItem("defaultCityfiveDaysForecast") === ""
    ) {
      const defaultCityfiveDaysForecast = await getFiveDaysForecastApi(cityKey);
      localStorage.setItem(
        "defaultCityfiveDaysForecast",
        JSON.stringify(defaultCityfiveDaysForecast)
      );
    } else {
      const defaultCityfiveDaysForecast = localStorage.getItem(
        "defaultCityfiveDaysForecast"
      );
      const fiveDaysForecast = JSON.parse(defaultCityfiveDaysForecast);
      const epochTime = fiveDaysForecast.DailyForecasts[0].EpochTime;
      if (!isSameDay(epochTime)) {
        const defaultCityfiveDaysForecast = await getFiveDaysForecastApi(cityKey);
        localStorage.setItem(
          "defaultCityfiveDaysForecast",
          JSON.stringify(defaultCityfiveDaysForecast)
        );
      }
    }
  } else {
    const currentCity = await getCityApi(cityKey);
    if (
      localStorage.getItem("currentCity") === null ||
      localStorage.getItem("currentCity") === ""
    ) {
      localStorage.setItem("currentCity", JSON.stringify(currentCity));
    }
    if (
      localStorage.getItem("currentCityCurrentConditions") === null ||
      localStorage.getItem("currentCityCurrentConditions") === ""
    ) {
      const currentCityCurrentConditions = await getCurrentConditionsApi(cityKey);
      localStorage.setItem(
        "currentCityCurrentConditions",
        JSON.stringify(currentCityCurrentConditions)
      );
    } else {
      const currentCityCurrentConditions = localStorage.getItem(
        "currentCityCurrentConditions"
      );
      const conditions = JSON.parse(currentCityCurrentConditions);
      const epochTime = conditions[0].EpochTime;
      if (!isSameDay(epochTime)) {
        const currentCityCurrentConditions = await getCurrentConditionsApi(cityKey);
        localStorage.setItem(
          "currentCityCurrentConditions",
          JSON.stringify(currentCityCurrentConditions)
        );
      }
    }
    if (
      localStorage.getItem("currentCityFiveDaysForecast") === null ||
      localStorage.getItem("currentCityFiveDaysForecast") === ""
    ) {
      const currentCityFiveDaysForecast = await getFiveDaysForecastApi(cityKey);
      localStorage.setItem(
        "currentCityFiveDaysForecast",
        JSON.stringify(currentCityFiveDaysForecast)
      );
    } else {
      const currentCityFiveDaysForecast = localStorage.getItem(
        "currentCityFiveDaysForecast"
      );
      const fiveDaysForecast = JSON.parse(currentCityFiveDaysForecast);
      const epochTime = fiveDaysForecast.DailyForecasts[0].EpochDate;
      if (!isSameDay(epochTime)) {
        const currentCityFiveDaysForecast = await getFiveDaysForecastApi(cityKey);
        localStorage.setItem(
          "currentCityFiveDaysForecast",
          JSON.stringify(currentCityFiveDaysForecast)
        );
      }
    }
  }
}

async function isSameDay(epochTime) {
  const dateFromEpochTime = moment.unix(epochTime);
  const currentDate = moment();
  return dateFromEpochTime.isSame(currentDate, "day");
}

// async function toggleFavourites() {
//   let element = document.getElementById("toFavourites");
//   const targetCity = localStorage.getItem("targetCity");
//   const targetCityObj = JSON.parse(targetCity);
//   const SERVER = {url: ""};
//   if (element.classList.contains("fa-regular fa-star")) {

//     await fetch(`${SERVER.url}api/favourites`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         body: JSON.stringify(targetCityObj),
//       },
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         console.log("City added to favourites successfully", responseData);
//         element.classList.toggle("fa-solid fa-star");
//       })
//       .catch((error) =>
//         console.error("Error occured during adding to favourites", error)
//       );
//   } else {
//     await fetch(`${SERVER.url}api/favourites/`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(targetCityObj),
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         console.log("City removed from Favourites successfully", responseData);
//         element.classList.toggle("fa-regular fa-star");
//       })
//       .catch((error) => {
//         console.error(
//           "Error occured while removing city from favourites",
//           error
//         );
//       });
//   }
// }

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
