import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GoogleLoginScreen from "./auth/LoginPage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./auth/LoginPage";
import HomePage from "./home/HomePage";
import RegisterPage from "./auth/RegisterPage";
import { Provider } from "react-redux";
import store from "./app/store";
import VerifyPage from "./home/VerifyPage";
import Paho from "paho-mqtt";
import { useEffect } from "react";

client = new Paho.Client("mqtt3.thingspeak.com", 80, "DwceEgQ2KSQrOhcSKTc0CzQ");

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    client.connect({
      userName: "DwceEgQ2KSQrOhcSKTc0CzQ", // Replace with your username
      password: "2OYxGbaVipO6Hbd7WftAZT2T",
      onSuccess: () => {
        console.log("Success");
        client.subscribe("channels/2106757/subscribe/fields/field1", {
          onSuccess: () => {
            console.log("Subscribed to field1 topic");
          },
          onFailure: (err) => {
            console.error("Failed to subscribe to /data topic", err);
          },
        });
      },
      onFailure: (err) => {
        console.error("Failed to connect to MQTT broker", err);
      },
    });
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerTitle: "ParkEase" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ headerTitle: "ParkEase" }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerTitle: "ParkEase" }}
          />
          <Stack.Screen
            name="Verify"
            component={VerifyPage}
            options={{ headerTitle: "ParkEase" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
