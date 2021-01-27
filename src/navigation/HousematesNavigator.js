import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "../screens/HousematesScreen/Landing/";
import AddScreen from "../screens/HousematesScreen/AddScreen";
import { createStackNavigator } from "@react-navigation/stack";

const HousematesStack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
    },
  };

function HousematesNavigator({navigator}){
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
