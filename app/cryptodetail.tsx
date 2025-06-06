import { CryptoHeader, MainContainer, RealTimeCandleChart } from "@/components";
import { CardCryptoDetail } from "@/components/noReutilizableComponents/cardCryptoDetail/CardCryptoDetail.component";
import { useCoinBaseInfo, useLiveTicker, useNavigator } from "@/hooks";
import { useCryptoStore } from "@/store/cryptoStore";
import { styles } from "@/styles/cryptodetail.styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const ICON_SIZE = 24;

export default function CryptoDetailScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  const { symbol, title, volume24h, lastPrice, coinId, target } =
    useLocalSearchParams<{
      symbol: string;
      title: string;
      volume24h: string;
      lastPrice: string;
      coinId: string;
      target: string;
    }>();

  const { data, refetch } = useCoinBaseInfo(coinId);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const toggleFavorite = useCryptoStore((s) => s.toggleFavorite);
  const favorites = useCryptoStore((s) => s.favorites);
  const isFav = favorites.includes(symbol);

  const handleBack = () => router.back();

  useNavigator(() => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
        <Feather name="arrow-left" size={ICON_SIZE} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <CryptoHeader imageUri={data?.image?.small ?? ""} title={title} />
      </View>
      <TouchableOpacity
        onPress={() => toggleFavorite(symbol)}
        style={styles.iconContainer}
      >
        <Feather
          name="star"
          size={ICON_SIZE}
          color={isFav ? "#FFD700" : "#888888"}
        />
      </TouchableOpacity>
    </View>
  ));

  const lastPriceNumber = +lastPrice;
  const volume24hNumber = +volume24h;

  const { price, volume } = useLiveTicker(symbol, {
    price: lastPriceNumber,
    volume: volume24hNumber,
  });

  return (
    <MainContainer viewStyles={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardCryptoDetail
          data={data}
          price={price}
          target={target}
          volume={volume}
        />
        <RealTimeCandleChart symbol={symbol} />
      </ScrollView>
    </MainContainer>
  );
}
