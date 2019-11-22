import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./resources/fr.json";
import en from "./resources/en.json";
import { ETLCodes } from "./ETLCodes";
import { ELanguages } from "./ELanguages";

const resources = {
  fr,
  en
};

(window as any).MISSING_TL_KEYS = {};
(window as any).GetMissingKeysEnum = () => {
  const s = Object.keys((window as any).MISSING_TL_KEYS).join(", ");
  console.log(s);
  return s;
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  parseMissingKeyHandler: key => {
    (window as any).MISSING_TL_KEYS[key] = true;
    return `${key}_MISSING_TL`;
  }
});

export default i18n;

export const tlCodesArray = Object.keys(ETLCodes)
  .filter(k => typeof ETLCodes[k as any] === "number")
  .sort();
export const languagesArray = Object.keys(ELanguages)
  .filter(k => typeof ELanguages[k as any] === "number")
  .sort();

export { ELanguages, ETLCodes };
