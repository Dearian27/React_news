// import i18n from "i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const Ls = ["en", "ua", "de"];

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  fallbackLng: Ls,
  debug: true,
  // whitelist: Ls,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  }
})

export default i18n;
