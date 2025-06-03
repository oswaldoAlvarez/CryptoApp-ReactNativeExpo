import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./Card.styles";

export interface ICard extends PropsWithChildren<TouchableOpacityProps> {
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style, ...touchableProps }: ICard) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }, style]}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {children}
    </TouchableOpacity>
  );
};
