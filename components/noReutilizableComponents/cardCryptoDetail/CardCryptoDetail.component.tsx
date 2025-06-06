import { TextView } from "@/components/textView/TextView.component";
import { usePriceFlashColor } from "@/hooks";
import { formatLargeNumber, formattedAmount } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Card } from "../../card/Card.component";
import { styles } from "./CardCryptoDetail.styles";

const ICON_SIZE = 18;
const GREEN = "#16C784";
const RED = "#EA3943";

interface ICardCryptoDetail {
  data: any;
  price: number;
  target: string;
  volume: number;
}

export const CardCryptoDetail = ({
  data,
  price,
  target,
  volume,
}: ICardCryptoDetail) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const priceColor = usePriceFlashColor(price, colors.text);

  const change = data.market_data.price_change_24h;
  const changePercent = data.market_data.price_change_percentage_24h;
  const low = data ? data?.market_data?.low_24h?.usd : "-";
  const high = data ? data?.market_data?.high_24h?.usd : "-";

  return (
    <Card style={styles.card} activeOpacity={1}>
      <TextView textStyles={styles.name}>{data.name}</TextView>
      <TextView textStyles={[styles.price, { color: priceColor }]}>
        {formattedAmount(price)} {target}
      </TextView>
      <View style={styles.infoRow}>
        <View>
          <View style={styles.stat}>
            <Feather
              name="bar-chart-2"
              size={ICON_SIZE}
              color={colors.text}
              style={styles.icon}
            />
            <TextView textStyles={styles.label}>
              {t("cryptodetail.vol_24h")}
            </TextView>
          </View>
          <TextView textStyles={styles.volume}>
            {formatLargeNumber(volume)}
          </TextView>
        </View>
        <View style={styles.dayChange}>
          <View style={styles.stat}>
            <Feather
              name="clock"
              size={ICON_SIZE}
              color={colors.text}
              style={styles.icon}
            />
            <TextView textStyles={styles.label}>
              {t("cryptodetail.24h_change")}
            </TextView>
          </View>
          <TextView
            textStyles={[
              styles.changeStats,
              { color: change >= 0 ? GREEN : RED },
            ]}
            align="flex-end"
          >
            {change?.toLocaleString()} {target}
            {changePercent > 0 ? "+" : ""}
          </TextView>
          <TextView
            textStyles={[
              styles.changeStats,
              { color: change >= 0 ? GREEN : RED },
            ]}
            align="flex-end"
          >
            {changePercent}%
          </TextView>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View>
          <View style={styles.stat}>
            <Feather
              name="arrow-down"
              size={ICON_SIZE}
              color={colors.text}
              style={styles.icon}
            />
            <TextView textStyles={styles.label}>
              {t("cryptodetail.24h_low")}
            </TextView>
          </View>
          <TextView textStyles={styles.volume}>
            {low?.toLocaleString()} {target}
          </TextView>
        </View>
        <View>
          <View style={[styles.stat, styles.justify]}>
            <Feather
              name="arrow-up"
              size={ICON_SIZE}
              color={colors.text}
              style={styles.icon}
            />
            <TextView textStyles={styles.label} align="flex-end">
              {t("cryptodetail.24h_high")}
            </TextView>
          </View>
          <TextView textStyles={styles.volume} align="flex-end">
            {high?.toLocaleString()} {target}
          </TextView>
        </View>
      </View>
    </Card>
  );
};
