import {
  LanguageSwitcher,
  MainContainer,
  TextView,
  ThemeToggleSwitch,
} from "@/components";
import { styles } from "@/styles/(tabs)/settings.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();

  const bgColor = { backgroundColor: dark ? "black" : "white" };

  return (
    <MainContainer viewStyles={bgColor}>
      <ScrollView style={[styles.container, bgColor]}>
        <View style={[styles.toggleRow, bgColor]}>
          <ThemeToggleSwitch />
        </View>
      </ScrollView>
      <View style={[styles.lang, bgColor]}>
        <Ionicons name="globe-outline" size={24} color={colors.text} />
        <TextView
          contentStyles={styles.langTitleContainer}
          textStyles={[styles.langTitleText, { color: colors.text }]}
        >
          {t("settings.language_title")}
        </TextView>
        <LanguageSwitcher />
      </View>
    </MainContainer>
  );
}
