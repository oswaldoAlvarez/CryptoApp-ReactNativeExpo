import { TextView } from "@/components/textView/TextView.component";
import { OrderDirection, OrderType } from "@/hooks/useFilteredOrderbook";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
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
  const { colors } = useTheme();

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
    <ScrollView
      horizontal
      style={styles.tagContainer}
      showsHorizontalScrollIndicator={false}
    >
      {tagConfigs.map(({ key, title, onPress, active }) => (
        <Tag
          containerStyle={styles.tag}
          key={key}
          label={
            <View style={styles.labelTagContainer}>
              <TextView style={[styles.title, { color: colors.text }]}>
                {t(title)}
              </TextView>
              {["name", "price", "volume"].includes(key) && active ? (
                <Feather
                  name={direction === "asc" ? "arrow-up" : "arrow-down"}
                  size={14}
                  style={styles.icon}
                  color={colors.text}
                />
              ) : null}
              {key === "favorites" && active ? (
                <Feather
                  name="star"
                  size={14}
                  style={styles.icon}
                  color={colors.text}
                />
              ) : null}
            </View>
          }
          onPress={onPress}
        />
      ))}
    </ScrollView>
  );
};
