import { MainContainer, Tag, TextView } from "@/components";
import { CryptoRow } from "@/components/cryptoRow/CryptoRow.component";
import { useCoinGeckoToStore, useFilteredOrderbook } from "@/hooks";
import { styles } from "@/styles/(tabs)/orderbook.styles";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, TextInput, View } from "react-native";

export default function OrderbookScreen() {
  useCoinGeckoToStore();
  // const tickers = useCryptoStore((s) => s.tickers);

  const {
    search,
    setSearch,
    order,
    direction,
    toggleOrder,
    filteredTickers,
    reset,
  } = useFilteredOrderbook();

  return (
    <MainContainer>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Buscar base o target..."
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
          <Tag label="All" onPress={reset} />
          <Tag
            label={
              <>
                Nombre
                {order === "name" ? (
                  <Feather
                    name={direction === "asc" ? "arrow-up" : "arrow-down"}
                    size={14}
                    style={{ marginLeft: 2 }}
                  />
                ) : null}
              </>
            }
            onPress={() => toggleOrder("name")}
          />
          <Tag
            label={
              <>
                Precio
                {order === "price" ? (
                  <Feather
                    name={direction === "asc" ? "arrow-up" : "arrow-down"}
                    size={14}
                    style={{ marginLeft: 2 }}
                  />
                ) : null}
              </>
            }
            onPress={() => toggleOrder("price")}
          />
        </View>
      </View>
      <FlatList
        data={filteredTickers}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <CryptoRow item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={21}
        ListEmptyComponent={
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <TextView>No hay monedas que coincidan con tu búsqueda.</TextView>
          </View>
        }
      />
    </MainContainer>
  );
}
