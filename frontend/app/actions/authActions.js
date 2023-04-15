import { ToastAndroid } from "react-native";
import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
  SET_SETTER_DETAILS: "AUTH.SET_SETTER_DETAILS",
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    getUserDetails: () => dispatch(getUserDetails()),
  };
};

export const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    if (response.error) {
      console.log("response.error", response);
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const { userDetails } = response?.data;
      await AsyncStorage.setItem("user", JSON.stringify(userDetails));
      ToastAndroid.show("Authentication Successful", ToastAndroid.SHORT);
      dispatch(setUserDetails(userDetails));
      navigate("Home");
    }
  };
};

export const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    if (response.error) {
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const { userDetails } = response?.data;
      await AsyncStorage.setItem("user", JSON.stringify(userDetails));
      ToastAndroid.show("Authentication Successful", ToastAndroid.SHORT);
      dispatch(setUserDetails(userDetails));
      navigate("Home");
    }
  };
};

export const getUserDetails = () => {
  return async () => {
    const response = await api.getUserDetails();
    if (response.error) {
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const data = response?.data;
      return data;
    }
  };
};
