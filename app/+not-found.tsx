import { TextView } from "@/components";
import { styles } from "@/styles/+not-found";
import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => router.back();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <TextView textStyles={styles.oops}>Oops!</TextView>
      <TextView textStyles={styles.title}>{t("page_not_found")}</TextView>
      <TextView textStyles={styles.message}>
        {t("page_not_found_description")}
      </TextView>

      <Pressable onPress={handleBack} style={styles.button}>
        <TextView textStyles={styles.buttonText}>
          {t("page_not_found_text_button")}
        </TextView>
      </Pressable>
    </View>
  );
}
