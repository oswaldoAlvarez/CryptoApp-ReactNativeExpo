import { useNavigation } from "expo-router";
import { useEffect } from "react";

export function useNavigator(title: string) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);
}
