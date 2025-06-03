import AsyncStorage from "@react-native-async-storage/async-storage";
import * as i18next from "i18next";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Tag } from "../tag/Tag.component";
import { styles } from "./LanguageSwitcher.styles";

type TLanguage = "en" | "es";

export const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const onChange = async (lang: TLanguage) => {
    await i18next.changeLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  return (
    <View style={styles.container}>
      <Tag label={t("spanish")} onPress={() => onChange("es")} />
      <Tag label={t("english")} onPress={() => onChange("en")} />
    </View>
  );
};
