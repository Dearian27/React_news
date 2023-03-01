import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const Languages = ["en", "ua", "de"];


i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  backend: {
    loadPath: "/React_news/locales/{{lng}}/{{ns}}.json",
    // loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  load: 'currentOnly',    // only load the currently selected language
  preload: ['en'],
  fallbackLng: Languages,
  debug: true,
})

export default i18n;
