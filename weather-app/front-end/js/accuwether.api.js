import config from "../config/config.json" with { type: "json" };

// Get array of cities from AccuWeather by part phrase
// export async function getCityApi(cityKey) {
//   const urlCitiesAutoComplete = `${config.urlAutocomplete}?apikey=${config.key}&q=${cityKey}`;
//   await fetch(urlCitiesAutoComplete, {
//     method: "GET",
//     headers: {
//       "Accept-Encoding": "gzip",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error response");
//       }
//       return response.json();
//     })
//     // .then((jsonObj) => {
//     //   localStorage.setItem("targetCity", JSON.stringify(jsonObj));
//     //   return jsonObj;
//     // })
//     .catch((error) =>
//       console.error("Error occured gettin current conditions: ", error)
//     );
// }

export async function getCityApi(cityKey) {
  const urlCity = `${config.urlSearchByLocationKey}${cityKey}?apikey=${config.key}&details=false`;
  console.log(urlCity);
  await fetch(urlCity, {
    method: "GET",
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error response");
      }
      console.log(response.json());
      return response.json();
    })
    // .then((jsonObj) => {
    //   localStorage.setItem("targetCity", JSON.stringify(jsonObj));
    //   return jsonObj;
    // })
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}

getCityApi(215854);

// Get current conditions from the AccuWeather by city code
export async function getCurrentConditionsApi(cityKey) {
  const urlCurrentConditions = `${config.urlCurrentConditions}${cityKey}?apikey=${config.key}`;
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
    // .then((jsonObj) =>
    //   localStorage.setItem("currentConditions", JSON.stringify(jsonObj))
    // )
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}

// Get forecast for 5 days from AccuWeather by city code
export async function getFiveDaysForecastApi(cityKey) {
  const urlFiveDaysForecast = `${config.urlFiveDaysForecast}${cityKey}?apikey=${config.key}`;
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
    // .then((jsonObj) => {
    //   const fiveDaysForecastArr = jsonObj[DailyForecasts];
    //   const fiveDaysForecastStr = JSON.stringify(fiveDaysForecastArr);
    //   localStorage.setItem(
    //     "fiveDaysForecast",
    //     JSON.stringify(fiveDaysForecastStr)
    //   );
    // })
    .catch((error) =>
      console.error("Error occured gettin current conditions: ", error)
    );
}


