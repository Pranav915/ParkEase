import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getActions, googleLogin } from "../app/actions/authActions";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

const LoginPage = ({ navigation, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("user");
        if (userDetails) {
          navigation.dispatch(StackActions.replace("Home"));
        }
      } catch (error) {
        console.error("Error checking user token:", error);
      }
    };

    checkUserToken();
  }, []);

  const handleLogin = () => {
    const userDetails = {
      email,
      password,
    };
    console.log(userDetails);
    login(userDetails, navigation.navigate);
  };

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          margin: 12,
          marginTop: 170,
          alignSelf: "center",
        }}
      >
        Login
      </Text>
      <View style={{ margin: 12 }}>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 7,
          }}
          placeholder="Email Id"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 7,
          }}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button title="Login" onPress={handleLogin} />
        <View style={{ margin: 5, alignItems: "flex-end" }}>
          <Text>Not Yet Registered?</Text>
          <Text
            style={{
              color: "purple",
              textDecorationLine: "underline",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LoginPage);
