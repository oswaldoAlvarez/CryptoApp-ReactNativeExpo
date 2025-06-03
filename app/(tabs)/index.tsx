import { MainContainer, TextView } from "@/components";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextView
          textStyles={{
            marginTop: 32,
            fontSize: 48,
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          Today Cryptocurrency prices
        </TextView>
        <TextView textStyles={{ fontSize: 18 }}>
          The global crypto market cap is $1.999.999
        </TextView>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            source={require("../../assets/images/orderbook.png")}
            style={{ width: 250, height: 350 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
}
