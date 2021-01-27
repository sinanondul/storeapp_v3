import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import { Alert } from "react-native";

import LandingScreen from "./LandingScreen";
import AddScreen from "./AddScreen";

import Feed from "./BottomTab/Feed";
import Profile from "./BottomTab/Profile";
import Notifications from "./BottomTab/Notifications";
import Inbox from "./BottomTab/Inbox";

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    //const Tab = createBottomTabNavigator();

    const HousematesStack = createStackNavigator();

    return (
      <HousematesStack.Navigator initialRouteName="Landing">
        <HousematesStack.Screen
          name="Landing"
          component={LandingScreen}
          options={LandingScreen.navigationOptions}
        />
        <HousematesStack.Screen name="Add" component={AddScreen} />
      </HousematesStack.Navigator>

      // <Tab.Navigator
      //   initialRouteName={"Feed"}
      // >
      //   <Tab.Screen name="Feed" component={Feed} />
      //   <Tab.Screen name="Profile" component={Profile} />
      //   <Tab.Screen name="Notifications" component={Notifications} />
      //   <Tab.Screen name="Inbox" component={Inbox} />
      // </Tab.Navigator>
    );
  }
}
