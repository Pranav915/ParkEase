import React, { useEffect } from "react";
import { Button } from "react-native";
import { getActions } from "../app/actions/bookingActions";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

const BookComponent = ({ navigation, addBooking }) => {
  const AddNewBooking = async () => {
    addBooking(navigation.navigate);
    // useEffect(() => {}, []);

    //
  };
  return (
    <>
      <Button title="New Booking" onPress={AddNewBooking} />
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(BookComponent);
