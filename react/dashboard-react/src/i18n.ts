import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../public/locales/en.json";
import de from "../public/locales/de.json";

const resources = {
  en: {translation: en},
  de: {translation: de},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
