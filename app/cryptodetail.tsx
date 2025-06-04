import { Card, MainContainer, TextView } from "@/components";
import {
  useCoinBaseInfo,
  useLiveTicker,
  useNavigator,
  usePriceFlashColor,
} from "@/hooks";
import { formatLargeNumber, formattedAmount } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function CryptoDetailScreen() {
  // const selectedCrypto = useCryptoStore((s) => s.selectedCrypto);
  const { colors } = useTheme();

  const { symbol, title, volume24h, lastPrice, coinId, target } =
    useLocalSearchParams<{
      symbol: string;
      title: string;
      volume24h: string;
      lastPrice: string;
      coinId: string;
      target: string;
    }>();

  const { data } = useCoinBaseInfo(coinId);

  const lastPriceNumber = +lastPrice;
  const volume24hNumber = +volume24h;

  useNavigator(() => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: data.image.small }}
        style={{ width: 30, height: 30, marginRight: 8 }}
        resizeMode="cover"
      />
      <TextView textStyles={{ fontSize: 20, fontWeight: "bold" }}>
        {title}
      </TextView>
    </View>
  ));

  const { price, volume } = useLiveTicker(symbol, {
    price: lastPriceNumber,
    volume: volume24hNumber,
  });

  const priceColor = usePriceFlashColor(price, colors.text);
  const change = data ? data?.market_data?.price_change_24h : "-";
  const changePercent = data
    ? data?.market_data?.price_change_percentage_24h
    : "-";
  const low = data ? data?.market_data?.low_24h?.usd : "-";
  const high = data ? data?.market_data?.high_24h?.usd : "-";
  const totalVolume = data ? data?.market_data?.total_volume?.usd : "-";

  // console.log(JSON.stringify(data, 0, 4));

  return (
    <MainContainer viewStyles={{ marginTop: 60 }}>
      <Card style={styles.card}>
        {/* <Image
          source={{ uri: data?.image?.small }}
          style={{ width: 40, height: 40, marginRight: 12 }}
          resizeMode="contain"
        /> */}
        <TextView
          textStyles={{
            fontSize: 18,
            marginBottom: 10,
            color: "gray",
          }}
        >
          {data.name}
        </TextView>
        <TextView textStyles={[styles.price, { color: priceColor }]}>
          {formattedAmount(price)} {target}
        </TextView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <View>
            <View style={styles.stat}>
              <Feather
                name="bar-chart-2"
                size={18}
                color="#a0aec0"
                style={styles.icon}
              />
              <TextView textStyles={styles.label}>Volumen 24h:</TextView>
            </View>
            <TextView textStyles={styles.volume}>
              {formatLargeNumber(volume)}
            </TextView>
          </View>
          {/* 24h change */}
          <View style={{ marginBottom: 12 }}>
            <View style={styles.stat}>
              <Feather
                name="clock"
                size={18}
                color={colors.text}
                style={styles.icon}
              />
              <TextView textStyles={styles.label}>24h change</TextView>
            </View>
            <TextView
              textStyles={[
                { fontSize: 14 },
                { color: change >= 0 ? "#16C784" : "#EA3943" },
              ]}
              align="flex-end"
            >
              {change?.toLocaleString()} {target} {changePercent > 0 ? "+" : ""}
              {/* {changePercent}% */}
            </TextView>
            <TextView
              textStyles={[
                { fontSize: 14 },
                { color: change >= 0 ? "#16C784" : "#EA3943" },
              ]}
              align="flex-end"
            >
              {/* {change?.toLocaleString()} USD {changePercent > 0 ? "+" : ""} */}
              {changePercent}%
            </TextView>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            // backgroundColor: "blue",
          }}
        >
          {/* 24h low */}
          <View>
            <View style={styles.stat}>
              <Feather
                name="arrow-down"
                size={18}
                color="#a0aec0"
                style={styles.icon}
              />
              <TextView textStyles={styles.label}>24h low</TextView>
            </View>
            <TextView textStyles={styles.volume}>
              {low?.toLocaleString()} {target}
            </TextView>
          </View>

          {/* 24h high */}
          <View>
            <View style={[styles.stat, { justifyContent: "flex-end" }]}>
              <Feather
                name="arrow-up"
                size={18}
                color="#a0aec0"
                style={styles.icon}
              />
              <TextView textStyles={styles.label} align="flex-end">
                24h high
              </TextView>
            </View>
            <TextView textStyles={styles.volume} align="flex-end">
              {high?.toLocaleString()} {target}
            </TextView>
          </View>
        </View>
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
  label: { fontSize: 16 },
  volume: { fontSize: 20, fontWeight: "600" },
  stat: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 18,
    // marginBottom: 2,
    // justifyContent: "center",
    // backgroundColor: "red",
  },
  icon: {
    marginRight: 6,
  },
});
