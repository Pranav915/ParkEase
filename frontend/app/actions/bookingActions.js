import { ToastAndroid } from "react-native";
import * as api from "../../api";

export const getActions = (dispatch) => {
  return {
    addBooking: (navigate) => dispatch(addBooking(navigate)),
    updateBooking: (navigate) => dispatch(updateBooking(navigate)),
    deleteBooking: () => dispatch(deleteBooking()),
  };
};

export const addBooking = (navigate) => {
  return async (dispatch) => {
    const response = await api.addBooking();
    if (response.error) {
      console.log("response", response);
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const data = response?.data;
      console.log("data", data);
      navigate("Home");
    }
  };
};

export const updateBooking = (navigate) => {
  return async () => {
    const response = await api.updateBooking();
    if (response.error) {
      console.log("response", response);
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const data = response?.data;
      console.log("data", data);
      navigate("Home");
    }
  };
};

export const deleteBooking = () => {
  console.log("okk");
  return async () => {
    const response = await api.deleteBooking();
    if (response.error) {
      console.log("response", response);
      ToastAndroid.show(
        response?.exception?.response?.data,
        ToastAndroid.SHORT
      );
    } else {
      const data = response?.data;
      console.log("data", data);
    }
  };
};
