import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActions, googleRegister } from "../app/actions/authActions";
import { ToastAndroid } from "react-native";
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

const RegisterPage = ({ navigation, register }) => {
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

  const handleRegister = () => {
    const userDetails = {
      email: email,
      password: password,
    };
    // console.log(userDetails);
    register(userDetails, navigation.navigate);
  };

  // const handleGoogleRegister = useGoogleLogin({
  //   onSuccess: handleGoogleLoginSuccess,
  // });

  // function handleGoogleLoginSuccess(tokenResponse) {
  //   const accessToken = tokenResponse.access_token;

  //   dispatch(googleRegister(accessToken, navigate));
  // }

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
        Register
      </Text>
      <View style={{ margin: 12 }}>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 7,
          }}
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email Id"
          keyboardType="email-address"
        />
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 7,
          }}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Register" onPress={handleRegister} />
        <View style={{ margin: 10, alignItems: "flex-end" }}>
          <Text>Already have an account?</Text>
          <Text
            style={{
              color: "purple",
              textDecorationLine: "underline",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
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
export default connect(null, mapActionsToProps)(RegisterPage);
