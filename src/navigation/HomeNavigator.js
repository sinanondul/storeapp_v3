import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedScreen from "../screens/HomeScreen/BottomTab/Feed";
import Profile from "../screens/HomeScreen/BottomTab/Profile";
import Notifications from "../screens/HomeScreen/BottomTab/Notifications";
import Inbox from "../screens/HomeScreen/BottomTab/Inbox";
import { BottomStackNavigator } from "./MainStackNavigator";

const Tab = createBottomTabNavigator();

const screenOptionStyle = {};

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptionStyle} initialRouteName={"Feed"}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={FeedScreen.navigationOptions}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Inbox" component={Inbox} />
    </Tab.Navigator>
  );
};

//söfmlşdsmf

export default HomeNavigator;
