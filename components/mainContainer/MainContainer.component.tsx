import { useTheme } from "@react-navigation/native";
import { SafeAreaView, View, ViewStyle } from "react-native";
import { styles } from "./MainContainer.styles";

interface IMainContainer {
  children: React.ReactNode;
  viewStyles?: ViewStyle | ViewStyle[];
}

export const MainContainer = ({ children, viewStyles }: IMainContainer) => {
  const { dark } = useTheme();

  return (
    <View
      style={[styles.viewContainer, dark && styles.backgroundBlack, viewStyles]}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </View>
  );
};
