import {
  CHOICE_ACTIVE,
  DEFAULT,
  LOCAL_STORAGE_KEYS,
} from "../config/config.js";
import {
  getDataFromLocalStorage,
  setLocalStorage,
} from "./localStorage.service.js";

// Add/remove City to/from Favorites
export async function addRemoveFavorites() {
  try {
    const choice = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.active);
    if (choice === CHOICE_ACTIVE.default) {
      console.log("Default city cannot be removed from favorites.");
      return null;
    }

    const city = await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.currentCity);
    if (!city) {
      console.error("No current city found");
      return null;
    }

    let favorites =
      (await getDataFromLocalStorage(LOCAL_STORAGE_KEYS.favoriteCities)) || [];

    const isFavorite = favorites.some((favCity) => favCity.Key === city.Key);

    if (isFavorite) {
      favorites = favorites.filter((favCity) => favCity.Key !== city.Key);
      console.log(`City ${city.LocalizedName} removed from favorites`);
    } else {
      favorites.push(city);
      console.log(`City ${city.LocalizedName} added to favorites`);
    }
    await setLocalStorage(LOCAL_STORAGE_KEYS.favoriteCities, favorites);
    return city;
  } catch (error) {
    console.error(
      `Error adding/removing city ${city.LocalizedName} to/from favorites`,
      error
    );
  }
}

// isCityInFavorites
export async function isCityInFavorites(cityKey) {
  console.log(cityKey);
  const favorites = await getDataFromLocalStorage(
    LOCAL_STORAGE_KEYS.favoriteCities
  );
  const isFavorite = favorites.some(favCity => favCity.Key === cityKey);
  if (cityKey === DEFAULT.defaultKey || isFavorite) {
    return true;
  } else {
    return false;
  }
}
