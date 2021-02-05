import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Feed from "../screens/HomeScreen/BottomTab/Feed";
import Profile from "../screens/HomeScreen/BottomTab/Profile";
import Notifications from "../screens/HomeScreen/BottomTab/Notifications";
import Inbox from "../screens/HomeScreen/BottomTab/Inbox";
import { BottomStackNavigator } from "./MainStackNavigator";

const Tab = createBottomTabNavigator();

const screenOptionStyle = {};

const HomeNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator screenOptions={screenOptionStyle} initialRouteName={"Feed"}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Inbox" component={Inbox} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
