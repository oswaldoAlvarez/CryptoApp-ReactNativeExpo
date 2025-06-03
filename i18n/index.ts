import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import * as i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/translations/en/translation.json";
import es from "@/translations/es/translation.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

(async () => {
  let lang = await AsyncStorage.getItem("language");
  if (!lang) {
    lang = Localization.getLocales()[0]?.languageCode || "en";
  }

  i18next.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    cleanCode: true,
  });
})();
