import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Feed from "./BottomTab/Feed";
import Profile from "./BottomTab/Profile";
import Notifications from "./BottomTab/Notifications";
import Inbox from "./BottomTab/Inbox";

export default class HomeScreen extends React.Component{

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render(){

    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator 
        initialRouteName={"Feed"}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Inbox" component={Inbox} />
      </Tab.Navigator>
    );
  }
}