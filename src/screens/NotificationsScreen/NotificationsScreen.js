import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LandingScreen from "./LandingScreen";
import PostSpecificScreen from "./PostSpecificScreen";
import styles from "./styles";

export default class NotificationsScreen extends React.Component {
  componentDidMount() {}

  render() {
    const NotificationsStack = createStackNavigator();
    const userData = this.props.userData;
    const notifications = this.props.notifications;
    return (
      <NotificationsStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <NotificationsStack.Screen
          name="Landing"
          options={LandingScreen.navigationOptions}
        >
          {(props) => (
            <LandingScreen
              {...props}
              userData={userData}
              notifications={notifications}
            />
          )}
        </NotificationsStack.Screen>
        <NotificationsStack.Screen
          name="Post"
          options={PostSpecificScreen.navigationOptions}
        >
          {(props) => (
            <PostSpecificScreen
              {...props}
              userData={userData}
              //notifications={notifications}
            />
          )}
        </NotificationsStack.Screen>
      </NotificationsStack.Navigator>
    );
  }

  static navigationOptions = {
    headerShown: false,
  };
}
