import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, View } from "react-native";
import { getActions } from "../app/actions/bookingActions";
import { connect } from "react-redux";

const circularStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "grey",
    marginVertical: 10,
  },
  numberText: {
    fontSize: 40,
    color: "black",
  },
});

const VerifyComponent = ({ navigation, userDetails, deleteBooking }) => {
  const handleVerify = async () => {
    // Generate a random number between 0 and 9999
    // await AsyncStorage.removeItem("otp");
    // const randomNumber = Math.floor(Math.random() * 10000);
    // // Pad the random number with leading zeros if necessary
    // let otp1;

    // Add code to send the otp to Arduino
    // await fetch("https://api.thingspeak.com/channels/2106757/fields/1.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response data
    //     console.log(data.feeds[data.feeds.length - 1]?.field1);
    //     otp1 = data.feeds[data.feeds.length - 1]?.field1;
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur
    //     console.error(error);
    //   });
    // await AsyncStorage.setItem("otp", otp1);
    navigation.navigate("Verify");
  };

  return (
    <>
      <View style={{ margin: "auto", alignItems: "center", marginTop: 40 }}>
        <Text style={{ fontSize: 20, marginTop: 20 }}>
          Your Parking Spot is
        </Text>
        <View style={circularStyle.container}>
          <Text style={circularStyle.numberText}>
            {userDetails.bookings.cid}
          </Text>
        </View>
        <Text style={{ fontSize: 20 }}>
          Please Verify Yourself while entering!
        </Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Verify Booking" onPress={handleVerify} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Cancel Booking" onPress={() => deleteBooking()} />
        </View>
      </View>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(VerifyComponent);
