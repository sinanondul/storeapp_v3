import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";

const Tab = createBottomTabNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };

const HousematesNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptionStyle}>
      <Tab.Screen name="Here" component = {HousematesScreen}/>
    </Tab.Navigator>
  );
};

export default HousematesNavigator;