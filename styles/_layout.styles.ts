import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonBack: {
    paddingLeft: 12,
    paddingTop: Platform.OS === "android" ? 32 : 0,
    paddingBottom: Platform.OS === "ios" ? 12 : 10,
    width: 50,
  },
});
