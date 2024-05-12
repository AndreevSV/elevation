import { icons } from "../data/icons.js";

// Get Icon by number
export async function getIconById(id) {
  try {
    return (await icons[id]) || null;
  } catch (error) {
    console.error(
      `Error accured during extracting path to icon from icons.json`,
      error
    );
  }
}
