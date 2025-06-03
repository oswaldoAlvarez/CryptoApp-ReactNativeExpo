import { MainContainer } from "@/components";
import { CryptoRow } from "@/components/cryptoRow/CryptoRow.component";
import { useCoinGeckoToStore } from "@/hooks";
import { useCryptoStore } from "@/store/cryptoStore";
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";

export default function OrderbookScreen() {
  useCoinGeckoToStore();
  const tickers = useCryptoStore((s) => s.tickers);

  if (!tickers.length) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  console.log("orderbook rendered");

  return (
    <MainContainer>
      <FlatList
        data={tickers}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <CryptoRow item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={21}
      />
    </MainContainer>
  );
}
