// Checks if city in favourites by cityKey
export async function isCityInFavourites(cityKey) {
  try {
    const favouritesStr = localStorage.getItem("favourites");
    if (favouritesStr === null || favouritesStr === "") {
      localStorage.setItem("favourites", JSON.stringify([]));
      console.log(
        `Favourites is not exist, because of that can't find city with key ${cityKey}`
      );
      return false;
    } else {
      const favouritesArr = JSON.parse(favouritesStr);
      const city = favouritesArr.find((city) => city.Key === cityKey);
      if (city !== null) {
        console.log(`City with key ${cityKey} is ${city}`);
        return city;
      } else {
        console.log(`City with key ${cityKey} not found`);
        return false;
      }
    }
  } catch (error) {
    console.error(`Fail during finding city with a key ${cityKey}`, error);
    return error;
  }
}

// Add City to favourites and write it localStorage
export async function addCityToFavourites(cityObj) {
  try {
    const cityKey = cityObj[Key];
    const city = await isCityInFavourites(cityKey);
    if (!city) {
      const favouritesStr = localStorage.getItem("favourites");
      const favouritesArr = JSON.parse(favouritesStr);
      favouritesArr.push(cityObj);
      favouritesStr = JSON.stringify(favouritesArr);
      localStorage.setItem("favourites", favouritesStr);
      console.log(
        `City with a key ${cityKey} successfully added to favourites`
      );
      return cityObj;
    } else {
      console.log(`City with a key ${cityKey} already exist in favourites`);
    }
  } catch (error) {
    console.error("Error occured during adding city to localStorage", error);
  }
}

// Removes city from favourites
export async function removeCityFromFavourites(cityKey) {
  try {
    const city = isCityInFavourites(cityKey);
    if (!city) {
      console.log(`City with key ${cityKey} not found, nothing to delete`);
      return null;
    } else {
      const favouritesStr = localStorage.getItem("favourites");
      const favouritesArr = JSON.parse(favouritesStr);
      const index = favouritesArr.findIndex((city) => city.Key === cityKey);
      favouritesArr.splice(index, 1);
      favouritesStr = JSON.stringify(favouritesArr);
      localStorage.setItem("favourites", favouritesStr);
      console.log(`City with key ${cityKey} is ${city} and was deleted`);
      return city;
    }
  } catch (error) {
    console.error(`Fail during removing city with a key ${cityKey}`, error);
    return null;
  }
}

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
