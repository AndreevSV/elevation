
import * as icons from "../public/data/icons.json" assert {type: "json"}

// Get Icon by number
export async function getIconByNumber(iconNumber) {
  try {
    const iconKey = iconNumber.toString();
    return await icons[iconKey] || null;
  } catch (error) {
    console.error(
      `Error accured during extracting path to icon from icons.json`,
      error
    );
  }
}
