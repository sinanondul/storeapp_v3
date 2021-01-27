// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen/HomeScreen_old";
import Profile from "../screens/HomeScreen/BottomTab/Profile";
import Notifications from "../screens/HomeScreen/BottomTab/Notifications";
import Inbox from "../screens/HomeScreen/BottomTab/Inbox";
import Addpost from "../screens/Addpost";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const BottomStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Inbox" component={Inbox} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, BottomStackNavigator };
