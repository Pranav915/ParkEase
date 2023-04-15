import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const logout = async () => {
  const navigation = useNavigation();
  try {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
