import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: Dimensions.get("screen").width * 0.02,
    borderRadius: 16,
  },
  background: {
    borderRadius: 16,
  },
  indicator: {
    backgroundColor: "#ccc",
  },
  content: {
    padding: 16,
  },
  sheetInner: {
    flex: 1,
  },
  scrollFlex: {
    flex: 1,
  },
});
