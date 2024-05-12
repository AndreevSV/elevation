import { DEFAULT } from "../config/config.js";
import { ACCUWEATHER_KEY } from "../config/key.js";

const URL = {
  base: "http://dataservice.accuweather.com",
  autocomplete: "/locations/v1/cities/autocomplete",
  city: "/locations/v1/",
  conditions: "/currentconditions/v1/",
  forecasts: "/forecasts/v1/daily/5day/",
};

async function formUrlByMarkerAndKey(marker, key) {
  switch (marker) {
    case "autocomplete":
      return `${URL.base}${URL.autocomplete}?apikey=${ACCUWEATHER_KEY}&q=${key}`;
    case "city":
      return `${URL.base}${URL.city}${key}?apikey=${ACCUWEATHER_KEY}&details=false`;
    case "conditions":
      return `${URL.base}${URL.conditions}${key}?apikey=${ACCUWEATHER_KEY}`;
    case "forecasts":
      return `${URL.base}${URL.forecasts}${key}?apikey=${ACCUWEATHER_KEY}&language=en-us&details=false&metric=true`;
  }
}

// Fetch data from AccuWeather by marker (type of information requested) and city key (number)
// or, in case of autocomplete, part of the searched city name
export async function fetchData(marker, key = DEFAULT.defaultKey) {
  const url = await formUrlByMarkerAndKey(marker, key);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept-Encoding": "gzip",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error response from accuweather - please check an address"
      );
    }
    return response.json();
  } catch (error) {
    console.error("Error occured during getting data: ", error);
    throw error;
  }
}
