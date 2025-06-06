import { OrderDirection, OrderType } from "@/hooks/useFilteredOrderbook";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { Tag } from "../../tag/Tag.component";
import { styles } from "./HomeTags.styles";

interface IHomeTags {
  reset: () => void;
  toggleOrder: (key: OrderType) => void;
  order: OrderType;
  direction: OrderDirection;
  showFavorites: boolean;
  toggleFavorites: () => void;
}

export const HomeTags = ({
  reset,
  toggleOrder,
  order,
  direction,
  showFavorites,
  toggleFavorites,
}: IHomeTags) => {
  const { t } = useTranslation();

  const tagConfigs: {
    key: "favorites" | "all" | "name" | "price" | "volume";
    title: string;
    onPress: () => void;
    active: boolean;
  }[] = [
    {
      key: "all",
      title: "orderbook.all_tag_title",
      onPress: () => {
        if (showFavorites) toggleFavorites();
        reset();
      },
      active: order === "all" && !showFavorites,
    },
    {
      key: "name",
      title: "orderbook.name_tag_title",
      onPress: () => {
        if (showFavorites) toggleFavorites();
        toggleOrder("name");
      },
      active: order === "name" && !showFavorites,
    },
    {
      key: "price",
      title: "orderbook.price_tag_title",
      onPress: () => {
        if (showFavorites) toggleFavorites();
        toggleOrder("price");
      },
      active: order === "price" && !showFavorites,
    },
    {
      key: "volume",
      title: "Vol24h",
      onPress: () => {
        if (showFavorites) toggleFavorites();
        toggleOrder("volume");
      },
      active: order === "volume" && !showFavorites,
    },
    {
      key: "favorites",
      title: "orderbook.favorites_tag_title",
      onPress: toggleFavorites,
      active: showFavorites,
    },
  ];

  return (
    <ScrollView horizontal style={styles.tagContainer}>
      {tagConfigs.map(({ key, title, onPress, active }) => (
        <Tag
          containerStyle={styles.tag}
          key={key}
          label={
            <>
              {t(title)}
              {["name", "price", "volume"].includes(key) && active ? (
                <Feather
                  name={direction === "asc" ? "arrow-up" : "arrow-down"}
                  size={14}
                />
              ) : null}
            </>
          }
          onPress={onPress}
        />
      ))}
    </ScrollView>
  );
};
