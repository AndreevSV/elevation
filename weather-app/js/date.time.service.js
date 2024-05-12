import { getDataFromLocalStorage } from "./localStorage.service.js";
import { REFRESH_RATE } from "../config/config.js";

// Receive either defaultCityConditions or currentCityConditions
// and checks if passed DEFAUL time period or not to fetch new data
// from ACCUWEATHER
export async function isExpired(localStorageKey) {
  const data = await getDataFromLocalStorage(localStorageKey);
  console.log(data);
  const localStorageEpochTime = await data[0].EpochTime;
  const currentTime = new Date();
  if (currentTime - localStorageEpochTime >= REFRESH_RATE) {
    return true; // More then 2 hours passed and need a new fetch
  }
  return false; // Less then 2 hours passed and new fetch not needed
}

// Receive Epoch time and transform it do Data object with readable string values
export function getDayAndDateFromEpochTime(epochDate) {
  const date = new Date(epochDate);

  return {
    dayOfWeek: date.toDateString().slice(0, 4),
    date: date.toDateString().slice(4),
  };
}

