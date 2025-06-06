import { MainContainer, TextView } from "@/components";
import { styles } from "@/styles/(tabs)/index.styles";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextView textStyles={styles.title}>{t("home.first_title")}</TextView>
        <TextView textStyles={styles.subtitle}>
          {t("home.first_subtitle")}{" "}
        </TextView>
        <View style={styles.img}>
          <Image
            source={require("../../assets/images/home.png")}
            style={styles.firstImgSize}
            resizeMode="cover"
          />
        </View>
        <TextView textStyles={styles.title} align="center">
          {t("home.second_title")}
        </TextView>
        <TextView textStyles={styles.subtitle}>
          {t("home.second_subtitle")}
        </TextView>
        <View style={styles.img}>
          <Image
            source={require("../../assets/images/orderbook.png")}
            style={styles.secondImgSize}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
}
