import apiConfig from "../data/api.json" assert { type: "json" };
import fetch from "node-fetch";
import fs from "fs/promises";

const CONFIG = {
  defaultLocation: 215854, //LocalizedName: "Tel Aviv", Key: 215854 
  pathToIcons: "./weather-app/data/icons.json",
  pathToFavourites: "./weather-app/data/favourites.json",
};

const urlCitiesAutoComplete = `${apiConfig.urlAutocomplete}?apikey=${apiConfig.key}`;
const urlCurrentConditions = `${apiConfig.urlCurrentConditions}${CONFIG.defaultLocation}?apikey=${apiConfig.key}`;
const urlFiveDaysForecast = `${apiConfig.urlFiveDaysForecast}${CONFIG.defaultLocation}?apikey=${apiConfig.key}`;

// Get current conditions from the AccuWeather by city code
export async function getCurrentConditions() {
  await fetch(urlCurrentConditions, {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error response");
      }
      return response.json();
    })
    .then((jsonObj) =>
      localStorage.setItem("currentConditions", JSON.stringify(jsonObj))
    )
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}

// Get forecast for 5 days from AccuWeather by city code
export async function getFiveDaysForecast() {
  await fetch(urlFiveDaysForecast, {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error response");
      }
      return response.json();
    })
    .then((jsonObj) =>
      localStorage.setItem("fiveDaysForecast", JSON.stringify(jsonObj))
    )
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}

// Get array of cities from AccuWeather by part phrase
export async function getCity(cityKey = CONFIG.defaultLocation) {
  fetch(`${urlCitiesAutoComplete}&q=${cityKey}`, {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error response");
      }
      return response.json();
    })
    .then((jsonObj) => localStorage.setItem("targetCity", JSON.stringify(jsonObj)))
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}

//Check for expire of the forecast
export async function checkForExpiredTime() {
  const period = 7200; // 2 hours (7200 secods) to change weather forecast data
  const data = localStorage.getItem("currentConditions");
  const savedTime = await JSON.parse(data)[0].EpochTime;
  const currentTime = new Date();
  if (currentTime - savedTime >= period) {
    return true; // More then 2 hours passed
  }
  return false; // Less then 2 hours passed
}

export async function getIconByNumber(num) {
  try {
    const icons = await fs.readFile(CONFIG.pathToIcons);
    const iconsObj = JSON.parse(icons);
    return iconsObj[num] || null;
  } catch (error) {
    console.error(`Failed to read icons.json`, error);
  }
}

export async function isCityInFavourites(cityKey) {
  try {
    const favourites = await fs.readFile(CONFIG.pathToFavourites);
    const favouritesObj = JSON.parse(favourites);
    return Object.hasOwn(favouritesObj, cityKey);
  } catch (error) {
    console.error("Fail to read or parse the favourites.json file", error);
    return false;
  }
}

export async function addCityToFavourites(cityObj) {
  try {
    if (!(await isCityInFavourites(cityObj.Key))) {
      const favourites = await fs.readFile(CONFIG.pathToFavourites);
      const favouritesObj = JSON.parse(favourites);
      favouritesObj[cityObj.Key] = cityObj;
      const newFavouritesObj = JSON.stringify(favouritesObj);
      await fs.writeFile(CONFIG.pathToFavourites, newFavouritesObj, "utf8");
      console.log(
        `This location ${cityObj.LocalizedName} added to favoutites successfully`
      );
    } else {
      console.log(
        `This location ${cityObj.LocalizedName} already in favoutites `
      );
    }
  } catch (error) {
    console.error(
      "Error occured during execution addCityToFavourites function",
      error
    );
  }
}

export async function removeCityFromFavourites(cityObj) {
  try {
    if (await isCityInFavourites(cityObj.Key)) {
      const favourites = await fs.readFile(CONFIG.pathToFavourites);
      const favouritesObj = JSON.parse(favourites);
      const localizedName = favouritesObj[cityObj.Key].LocalizedName;
      delete favouritesObj[cityObj.Key];
      const newFavouritesObj = JSON.stringify(favouritesObj);
      await fs.writeFile(CONFIG.pathToFavourites, newFavouritesObj, "utf8");
      console.log(
        `This location ${localizedName} removed from favoutites successfully`
      );
    } else {
      console.log(
        `Location with city key ${cityObj.Key} didn't find in Favourites `
      );
    }
  } catch (error) {
    console.error(
      "Error occured during execution removeCityFromFavourites function",
      error
    );
  }
}

// Get array of cities from AccuWeather by part phrase
// async function getCities () {
// fetch(urlCitiesAutoComplete, {
//   method: "GET",
//   headers: {
//     "Accept-Encoding": "gzip",
//   },
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Error response");
//     }
//     return response.json();
//   })
//   .then((jsonObj) => {
//     fs.writeFile(
//       "./data/data.json",
//       JSON.stringify(jsonObj),
//       "utf8",
//       (error) => {
//         if (error) {
//           console.error("Error ocured: ", error);
//         } else {
//           console.log(JSON.stringify(jsonObj));
//           console.log("File saved");
//         }
//       }
//     );
//   })
//   .catch((error) => console.error("Error occured: ", error));
// }
