import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";
import AddScreen from "../screens/HousematesScreen/AddScreen";
import { createStackNavigator } from "@react-navigation/stack";

const HousematesStack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
    },
  };

const HousematesNavigator = () => {
  return (
    <HousematesStack.Navigator 
      screenOptions={screenOptionStyle}
      initialRouteName='Landing'
    >
      <HousematesStack.Screen name="Landing" component={HousematesScreen} options={HousematesScreen.navigationOptions}/>
      <HousematesStack.Screen name="Add" component={AddScreen}/>
    </HousematesStack.Navigator>
  );
};

export default HousematesNavigator;
