import { useNavigation } from "expo-router";
import { useEffect } from "react";

export function useNavigator(headerTitle: string | (() => React.ReactNode)) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation, headerTitle]);
}
