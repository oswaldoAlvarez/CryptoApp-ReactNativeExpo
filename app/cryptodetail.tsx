import { Card, MainContainer, TextView } from "@/components";
import { useLiveTicker, useNavigator, usePriceFlashColor } from "@/hooks";
import { formatLargeNumber, formattedAmount } from "@/utils";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function CryptoDetailScreen() {
  // const selectedCrypto = useCryptoStore((s) => s.selectedCrypto);
  const { colors } = useTheme();

  const { symbol, title, volume24h, lastPrice } = useLocalSearchParams<{
    symbol: string;
    title: string;
    volume24h: string;
    lastPrice: string;
  }>();

  const lastPriceNumber = +lastPrice;
  const volume24hNumber = +volume24h;

  useNavigator(title);

  const { price, volume } = useLiveTicker(symbol, {
    price: lastPriceNumber,
    volume: volume24hNumber,
  });

  const priceColor = usePriceFlashColor(price, colors.text);

  return (
    <MainContainer viewStyles={{ marginTop: 60 }}>
      <Card style={styles.card}>
        <TextView
          textStyles={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Precio:
        </TextView>
        <TextView textStyles={[styles.price, { color: priceColor }]}>
          {formattedAmount(price)}
        </TextView>
        <TextView textStyles={styles.label}>Volumen 24h:</TextView>
        <TextView textStyles={styles.volume}>
          {formatLargeNumber(volume)}
        </TextView>
      </Card>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  price: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "left",
  },
  label: { fontSize: 16, marginTop: 10 },
  volume: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
});
