import { useTheme } from "@react-navigation/native";
import {
  GestureResponderEvent,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { TextView } from "../textView/TextView.component";
import { styles } from "./Tag.styles";

export type ITag = {
  label: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const Tag = ({
  label,
  onPress,
  containerStyle,
  textStyle = {},
}: ITag) => {
  const { dark } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: dark ? "white" : "black" },
        containerStyle,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <TextView textStyles={[styles.text, textStyle]}>{label}</TextView>
    </TouchableOpacity>
  );
};
