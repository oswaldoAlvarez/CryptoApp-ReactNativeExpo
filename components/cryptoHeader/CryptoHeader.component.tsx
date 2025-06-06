import { TextView } from "@/components";
import React from "react";
import { Image, View } from "react-native";
import { styles } from "./CryptoHeader.styles";

interface CryptoHeaderProps {
  imageUri: string;
  title: string;
}

export const CryptoHeader = React.memo(
  ({ imageUri, title }: CryptoHeaderProps) => (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.img} resizeMode="cover" />
      <TextView textStyles={styles.title}>{title}</TextView>
    </View>
  )
);

CryptoHeader.displayName = "CryptoHeader";
