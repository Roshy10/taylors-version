import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./locales/en.json";

const resources = {en};

i18n
    // pass the locales instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        defaultNS: "taylorsVersion",
        fallbackLng: "en",
        resources,
        detection: {
            order: ["navigator"], // we don't do anything special at the moment, so the browser language is what should be used
        },
    });

export default i18n;