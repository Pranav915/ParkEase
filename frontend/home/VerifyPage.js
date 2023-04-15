import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { getActions } from "../app/actions/bookingActions";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  otpBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
});

const VerifyPage = ({ updateBooking, navigation }) => {
  const [otp2, setOtp] = useState("");

  const handleVerify = async () => {
    const originalOTP = [
      8071, 4069, 3842, 8569, 4001, 1081, 5805, 6178, 2183, 3910,
    ];

    if (originalOTP.includes(otp2 - "0")) {
      console.log("okk");
      updateBooking(navigation.navigate);
    } else {
      ToastAndroid.show(
        "Incorrect Code. Please try again!",
        ToastAndroid.SHORT
      );
    }
  };

  // Function to handle OTP input
  const handleOtpInputChange = (index, value) => {
    if (value.length <= 1) {
      // Update OTP state for the corresponding input index
      const newOtp = otp2.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      // Move focus to the next input
      if (index < 3 && value.length === 1) {
        otpInputs[index + 1].focus();
      }
    }
  };

  // Refs for OTP input elements
  const otpInputs = [];

  return (
    <>
      <View style={{ margin: "auto", alignItems: "center" }}>
        <Text style={{ fontSize: 20, marginVertical: 50 }}>Input The Code</Text>
        <View style={styles.container}>
          <View style={styles.otpBox}>
            {Array.from({ length: 4 }, (_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputs[index] = ref)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpInputChange(index, value)}
                value={otp2[index] || ""}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 70, marginHorizontal: 50 }}>
        <Button title="Verify" onPress={handleVerify} />
      </View>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(VerifyPage);
