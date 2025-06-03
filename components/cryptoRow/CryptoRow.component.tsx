import { usePriceFlashColor } from "@/hooks";
import { CoinGeckoTicker } from "@/hooks/useCoinGeckoInfo";
import { useLiveTicker } from "@/hooks/useLiveTicker";
import { formatLargeNumber, formattedAmount } from "@/utils";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { TextView } from "../textView/TextView.component";
import { styles } from "./CryptoRow.styles";

interface ICryptoRow {
  item: CoinGeckoTicker;
  index: number;
}

export const CryptoRow = React.memo(function CryptoRow({
  item,
  index,
}: ICryptoRow) {
  const { colors } = useTheme();
  //   const setSelectedCrypto = useCryptoStore((state) => state.setSelectedCrypto);
  const router = useRouter();

  const symbol = item.base.toUpperCase() + item.target.toUpperCase();
  const { price, volume } = useLiveTicker(symbol, {
    price: item.last,
    volume: item.volume,
  });

  const priceColor = usePriceFlashColor(price, colors.text);

  const handlePress = () => {
    router.push({
      pathname: "/cryptodetail",
      params: {
        symbol,
        title: `${item.base}/${item.target}`,
        volume24h: String(item.volume),
        lastPrice: String(item.last),
      },
    });
  };

  console.log("cryptorow rendered");

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.5}
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextView textStyles={styles.ticker}>{item.base}</TextView>
          <TextView textStyles={[styles.ticker, { fontWeight: "bold" }]}>
            /{item.target}
          </TextView>
        </View>
      </View>
      <View>
        <TextView
          textStyles={[styles.price, { color: priceColor }]}
          align="flex-end"
        >
          {formattedAmount(+price)}
        </TextView>
        <TextView textStyles={styles.info} align="flex-end">
          Vol 24h: {formatLargeNumber(volume)}
        </TextView>
      </View>
    </TouchableOpacity>
  );
});
