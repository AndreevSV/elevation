import {
  MARKERS,
  LOCAL_STORAGE_KEYS,
  CHOICE_ACTIVE,
  DEFAULT,
} from "./config/config.js";
import { fetchData } from "./js/accuweather.api.fetch.service.js";
import {
  getDataFromLocalStorage,
  setLocalStorage,
} from "./js/localStorage.service.js";
import {
  isExpired,
  getDayAndDateFromEpochTime,
} from "./js/date.time.service.js";
import { getIconById } from "./js/icons.service.js";
import {
  addRemoveFavorites,
  isCityInFavorites,
} from "./js/favorites.service.js";
import { toggleMode } from "./js/color.theme.service.js";

document.addEventListener("DOMContentLoaded", init());
document
  .getElementById("toFavorites")
  .addEventListener("click", switchFavorites);
document
  .getElementById("colorModeButton")
  .addEventListener("click", toggleMode);
document
  .getElementById("defaultCity")
  .addEventListener("click", displayDefault);
document
  .getElementById("previousCity")
  .addEventListener("click", displayCurrent);

document
  .getElementById("favorites")
  .addEventListener("click", displayFavorites);

// init
async function init() {
  const choice = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.active);
  if (choice === null || choice === "") {
    await setLocalStorage(LOCAL_STORAGE_KEYS.active, CHOICE_ACTIVE.default);
    await storeCity();
    await storeConditions();
    await storeForecast();
  }
  if (choice === CHOICE_ACTIVE.default) {
    await displayDefault();
  }
  if (choice === CHOICE_ACTIVE.current) {
    await displayCurrent();
  }
}

// displayDefault
async function displayDefault() {
  try {
    setLocalStorage(LOCAL_STORAGE_KEYS.active, CHOICE_ACTIVE.default);
    if (isExpired(LOCAL_STORAGE_KEYS.defaultCityConditions)) {
      await storeConditions();
      await storeForecast();
    }
    await displayConditions();
    await displayForecast();
    await toggleFavorites();
  } catch (error) {
    console.error("Failed to display default city:", error);
  }
}

//displayCurrent
async function displayCurrent() {
  try {
    setLocalStorage(LOCAL_STORAGE_KEYS.active, CHOICE_ACTIVE.current);
    const city = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.currentCity);
    const cityKey = city.Key;
    if (isExpired(LOCAL_STORAGE_KEYS.currentCityConditions)) {
      await storeConditions(cityKey);
      await storeForecast(cityKey);
    }
    await displayConditions(cityKey);
    await displayForecast(cityKey);
    await toggleFavorites();
  } catch (error) {
    console.error("Failed to display default city:", error);
  }
}

// storeCity
async function storeCity(cityKey = DEFAULT.defaultKey) {
  try {
    const city = await fetchData(MARKERS.city, cityKey);
    if (cityKey === DEFAULT.defaultKey) {
      setLocalStorage(LOCAL_STORAGE_KEYS.defaultCity, city);
    } else {
      setLocalStorage(LOCAL_STORAGE_KEYS.currentCity, city);
    }
  } catch (error) {
    console.error("Failed to store city data:", error);
  }
}

// storeConditions
async function storeConditions(cityKey = DEFAULT.defaultKey) {
  try {
    const conditions = await fetchData(MARKERS.conditions, cityKey);
    if (cityKey === DEFAULT.defaultKey) {
      setLocalStorage(LOCAL_STORAGE_KEYS.defaultCityConditions, conditions);
    } else {
      setLocalStorage(LOCAL_STORAGE_KEYS.currentCityConditions, conditions);
    }
  } catch (error) {
    console.error("Failed to store conditions data:", error);
  }
}

//storeForecast
async function storeForecast(cityKey = DEFAULT.defaultKey) {
  try {
    const forecasts = await fetchData(MARKERS.forecasts, cityKey);
    if (cityKey === DEFAULT.defaultKey) {
      setLocalStorage(LOCAL_STORAGE_KEYS.defaultCityForecast, forecasts);
    } else {
      setLocalStorage(LOCAL_STORAGE_KEYS.currentCityForecast, forecasts);
    }
  } catch (error) {
    console.error("Failed to store forecast data:", error);
  }
}

// displayConditions
async function displayConditions() {
  try {
    let cityName = "";
    let conditions = {};
    const choice = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.active);

    if (choice === CHOICE_ACTIVE.default) {
      cityName = DEFAULT.defaultCity;
      conditions = await getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.defaultCityConditions
      );
    } else {
      const city = await getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.currentCity
      );
      cityName = city.LocalizedName;
      conditions = await getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.currentCityConditions
      );
    }

    document.getElementById("currentCity").innerHTML = cityName;

    const iconKey = conditions[0].WeatherIcon;
    const path = await getIconById(iconKey);
    document.getElementById("weatherIcon").src = `./${path}`;

    const temperature = conditions[0].Temperature.Metric.Value;
    document.getElementById("temperature").innerHTML = `${temperature} °C`;

    const weatherText = conditions[0].WeatherText;
    document.getElementById("weatherText").innerHTML = weatherText;
  } catch (error) {
    console.error("Failed to dispaly confitions:", error);
  }
}

// displayForecast
async function displayForecast() {
  try {
    let forecast = {};
    const choice = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.active);

    if (choice === CHOICE_ACTIVE.default) {
      forecast = await getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.defaultCityForecast
      );
    } else {
      forecast = await getDataFromLocalStorage(
        LOCAL_STORAGE_KEYS.currentCityForecast
      );
    }
    const forecastArr = forecast.DailyForecasts;

    document.getElementById("fiveDaysContainer").innerHTML = "";

    for (let index = 0; index < forecastArr.length; index++) {
      const epochDate = forecastArr[index].EpochDate * 1000;
      const dateObj = getDayAndDateFromEpochTime(epochDate);
      const date = dateObj.date;
      const dayOfWeek = dateObj.dayOfWeek;

      const tempMin = forecastArr[index].Temperature.Minimum.Value;
      const tempMax = forecastArr[index].Temperature.Maximum.Value;
      const tempUnit = forecastArr[index].Temperature.Minimum.Unit;

      const iconId = forecastArr[index].Day.Icon;
      const iconPhraseDay = forecastArr[index].Day.IconPhrase;

      const hasPrecipitationDay = forecastArr[index].Day.HasPrecipitation;
      let precipitationTypeDay = "";
      let precipitationIntensityDay = "";
      if (hasPrecipitationDay) {
        precipitationTypeDay = forecastArr[index].Day.PrecipitationType || "";
        precipitationIntensityDay =
          forecastArr[index].Day.PrecipitationIntensity || "";
      }

      const path = await getIconById(iconId);

      const oneDayForecat = /*html*/ `
          <div id ='day${index}'>
            <p><h3>${dayOfWeek}</h3></p>
            <p>${date}</p>
            <p>${tempMin} /<span> ${tempMax} °C</span></p>
            <p>${iconPhraseDay}</p>
            <img src="./${path}" alt="Weather Icon #${index}">
          </div>
          `;

      document.getElementById("fiveDaysContainer").innerHTML += oneDayForecat;
    }
  } catch (error) {
    console.error("Failed to display forecast:", error);
  }
}

// toggleFavorites
async function toggleFavorites() {
  const favoritesIcon = document.getElementById("toFavorites");
  const choice = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.active);
  if (choice === CHOICE_ACTIVE.default) {
    favoritesIcon.classList.remove("fa-regular");
    favoritesIcon.classList.add("fa-solid");
  } else {
    const city = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.currentCity);
    const cityKey = city.Key;
    const isFavorite = await isCityInFavorites(cityKey);
    const favoritesIcon = document.getElementById("toFavorites");
    // const favoritText = document.getElementById('favorite');
    if (isFavorite) {
      favoritesIcon.classList.remove("fa-regular");
      favoritesIcon.classList.add("fa-solid");
      // favoritText.textContent = 'Remove';
    } else {
      favoritesIcon.classList.remove("fa-solid");
      favoritesIcon.classList.add("fa-regular");
      // favoritText.textContent = 'Add';
    }
  }
}

// switchFavorites
async function switchFavorites() {
  try {
    await addRemoveFavorites();
    await toggleFavorites();
  } catch (error) {
    console.error("Failed switch favorites", error);
  }
}

const cityInput = document.getElementById("cityInput");
const cityList = document.getElementById("cityList");

cityInput.addEventListener("input", function () {
  const input = this.value;
  if (input.length >= 3) {
    getCities(input);
  } else {
    hideCityList();
  }
});

document.addEventListener("click", (event) => {
  if (!cityList.contains(event.target) && event.target !== cityInput) {
    hideCityList();
  }
});

async function getCities(input) {
  try {
    const cities = await fetchData(MARKERS.autocomplete, input);
    displayCities(cities);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCities(cities) {
  cityList.innerHTML = "";
  cities.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = `${city.LocalizedName}, ${city.AdministrativeArea.LocalizedName}, ${city.Country.LocalizedName}`;
    li.addEventListener("click", () => selectCity(city));
    cityList.appendChild(li);
  });
  cityList.style.display = "block";
}

function hideCityList() {
  cityList.style.display = "none";
}

async function selectCity(city) {
  const cityKey = city.Key;
  document.getElementById("cityList").innerHTML = "";
  hideCityList();
  if (cityKey !== DEFAULT.defaultKey) {
    await setLocalStorage(LOCAL_STORAGE_KEYS.active, CHOICE_ACTIVE.current);
    await storeCity(cityKey);
    await storeConditions(cityKey);
    await storeForecast(cityKey);
    await displayConditions();
    await displayForecast();
    await toggleFavorites();
  }
  document.getElementById("cityInput").value = city.LocalizedName;
}

// displayFavorites
async function displayFavorites() {
  let favoritesList = document.getElementById("favoritesList");
  favoritesList.style.display =
    favoritesList.style.display === "block" ? "none" : "block";
  if (favoritesList.style.display === "block") {
    favoritesList.textContent = "";
    const favorites = await getDataFromLocalStorage(
      LOCAL_STORAGE_KEYS.favoriteCities
    );
    if (favorites === null || favorites.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No favorites";
      favoritesList.appendChild(li);
    } else {
      favorites.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city.LocalizedName;
        li.addEventListener("click", () => selectCity(city));
        favoritesList.appendChild(li);
      });
    }
  }
}

// Close favorites menu
document.addEventListener('click', function(event) {
  const favoritesList = document.getElementById("favoritesList");
  const favoritesButton = document.getElementById("favorites");
  if (!favoritesList.contains(event.target) && !favoritesButton.contains(event.target)) {
    favoritesList.style.display = 'none';
  }
});
