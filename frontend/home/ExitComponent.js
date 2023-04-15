import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
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

const ExitComponent = ({ userDetails, navigation, deleteBooking }) => {
  return (
    <>
      <View style={{ margin: "auto", alignItems: "center", marginTop: 40 }}>
        <Text style={{ fontSize: 20, marginTop: 20 }}>
          Your Car is parked on
        </Text>
        <View style={circularStyle.container}>
          <Text style={circularStyle.numberText}>
            {userDetails.bookings.cid}
          </Text>
        </View>
        <Text style={{ fontSize: 20 }}>Wanna Exit Parking Area?</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Exit Parking" onPress={() => deleteBooking()} />
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
export default connect(null, mapActionsToProps)(ExitComponent);
