import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import en from "./locales/en.json";
import th from "./locales/th.json";

const resources = {en, th};

i18n
    .use(detector)
    // pass the locales instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        defaultNS: "taylorsVersion",
        supportedLngs: ["en", "th"],
        fallbackLng: "en",
        resources,
        detection: {
            order: ["navigator"], // we don't do anything special at the moment, so the browser language is what should be used
        },
    });

export default i18n;