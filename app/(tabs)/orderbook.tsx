import { MainContainer, TextView } from "@/components";
import { CryptoRow } from "@/components/cryptoRow/CryptoRow.component";
import { HomeTags } from "@/components/noReutilizableComponents/homeTags/HomeTags.component";
import { useCoinGeckoInfo, useFilteredOrderbook } from "@/hooks";
import { useCryptoStore } from "@/store/cryptoStore";
import { styles } from "@/styles/(tabs)/orderbook.styles";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TextInput, View } from "react-native";

export default function OrderbookScreen() {
  const { t } = useTranslation();
  const { colors, dark } = useTheme();

  const { data, loading } = useCoinGeckoInfo();
  const setTickers = useCryptoStore((s) => s.setTickers);

  useEffect(() => {
    if (!loading && data.tickers.length) {
      setTickers(data.tickers);
    }
  }, [loading, data.tickers, setTickers]);

  const {
    search,
    setSearch,
    order,
    direction,
    toggleOrder,
    filteredTickers,
    reset,
  } = useFilteredOrderbook();

  const [showFavorites, setShowFavorites] = useState(false);
  const toggleFavorites = () => setShowFavorites((prev) => !prev);

  const favorites = useCryptoStore((s) => s.favorites);

  const displayedTickers = showFavorites
    ? filteredTickers.filter((t) => {
        const symbol = `${t.base}${t.target}`.toUpperCase();
        return favorites.includes(symbol);
      })
    : filteredTickers;

  return (
    <MainContainer>
      <View style={styles.header}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: dark ? "black" : "white",
            },
          ]}
          placeholder={t("orderbook.placeholder_title")}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          placeholderTextColor={colors.text}
        />
        <HomeTags
          reset={reset}
          toggleOrder={toggleOrder}
          order={order}
          direction={direction}
          showFavorites={showFavorites}
          toggleFavorites={toggleFavorites}
        />
      </View>
      <FlatList
        data={displayedTickers}
        keyExtractor={(item, i) => `${item.base}${item.target}-${i}`}
        renderItem={({ item, index }) => (
          <CryptoRow item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        ListEmptyComponent={
          <View style={styles.emptyTitle}>
            <TextView>
              {showFavorites
                ? t("orderbook.empty_favorites")
                : t("orderbook.empty_list")}
            </TextView>
          </View>
        }
      />
    </MainContainer>
  );
}
