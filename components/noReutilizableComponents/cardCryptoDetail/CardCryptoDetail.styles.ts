import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    marginBottom: 10,
    color: "gray",
  },
  container: {
    marginTop: 60,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayChange: {
    marginBottom: 12,
  },
  changeStats: {
    fontSize: 14,
  },
  card: {
    padding: 20,
    borderRadius: 20,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  price: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "left",
  },
  label: {
    fontSize: 16,
  },
  volume: {
    fontSize: 20,
    fontWeight: "600",
  },
  justify: {
    justifyContent: "flex-end",
  },
});
