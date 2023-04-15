import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { getActions } from "../app/actions/authActions";
import BookComponent from "./BookComponent";
import ExitComponent from "./ExitComponent";
import VerifyComponent from "./VerifyComponent";

const HomePage = ({ getUserDetails, navigation }) => {
  // const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState("");
  const getUser = async () => {
    let userDetails = await getUserDetails();
    // console.log("userDetails", userDetails);
    setUserDetails(userDetails);
  };
  useEffect(() => {
    getUser();
  });

  const handleToolbarButtonPress = async () => {
    try {
      await AsyncStorage.removeItem("user", () => {
        navigation.dispatch(StackActions.replace("Login"));
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleToolbarButtonPress} title="Logout" />
      ),
    });
  }, [navigation]);

  return (
    <>
      <View>
        {userDetails?.bookings ? (
          userDetails?.bookings?.state == "booked" ? (
            <VerifyComponent
              userDetails={userDetails}
              navigation={navigation}
            />
          ) : (
            <ExitComponent userDetails={userDetails} navigation={navigation} />
          )
        ) : (
          <BookComponent navigation={navigation} />
        )}
      </View>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(HomePage);
