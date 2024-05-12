import { LOCAL_STORAGE_KEYS } from "../config/config.js";

export async function setLocalStorage(localStorageKey, dataObj) {
  const dataStr = JSON.stringify(dataObj);
  switch (localStorageKey) {
    case LOCAL_STORAGE_KEYS.active:

    case LOCAL_STORAGE_KEYS.defaultCity:
    case LOCAL_STORAGE_KEYS.defaultCityConditions:
    case LOCAL_STORAGE_KEYS.defaultCityForecast:

    case LOCAL_STORAGE_KEYS.currentCity:
    case LOCAL_STORAGE_KEYS.currentCityConditions:
    case LOCAL_STORAGE_KEYS.currentCityForecast:

    case LOCAL_STORAGE_KEYS.favoriteCities:
      localStorage.setItem(localStorageKey, dataStr);
      break;
  }
}

export async function getDataFromLocalStorage(localStorageKey) {
  switch (localStorageKey) {
    case LOCAL_STORAGE_KEYS.active:

    case LOCAL_STORAGE_KEYS.defaultCity:
    case LOCAL_STORAGE_KEYS.defaultCityConditions:
    case LOCAL_STORAGE_KEYS.defaultCityForecast:

    case LOCAL_STORAGE_KEYS.currentCity:
    case LOCAL_STORAGE_KEYS.currentCityConditions:
    case LOCAL_STORAGE_KEYS.currentCityForecast:

    case LOCAL_STORAGE_KEYS.favoriteCities:
      const dataStr = localStorage.getItem(localStorageKey);
      return await JSON.parse(dataStr);
  }
}
