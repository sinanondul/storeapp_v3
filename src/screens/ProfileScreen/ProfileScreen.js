import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import LandingScreen from "./LandingScreen";
import MessagingInterface from "../MessagesScreen/MessagingInterface";
import EditProfileScreen from "./EditProfile";
import { openDrawer } from "../../../App";
//import AddScreen from "./AddScreen";
import styles from "./styles";
import { Alert, Platform } from "react-native";
import MyHeader from "../../components/MyHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

export default class ProfileScreen extends React.Component {
  render() {
    const ProfileStack = createStackNavigator();
    const userData = this.props.userData;
    var userInfo = this.props.userData;
    var ownerId = this.props.userData.uid;
    if (this.props.route.params) {
      if (this.props.route.params.userInfo) {
        userInfo = this.props.route.params.userInfo;
      }
      if (this.props.route) {
        if (this.props.route.params.ownerId) {
          ownerId = this.props.route.params.ownerId;
        }
      }
    }
    return (
      <ProfileStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <ProfileStack.Screen
          name="Landing"
          options={LandingScreen.navigationOptions}
        >
          {(props) => (
            <LandingScreen
              {...this.props}
              {...props}
              userData={this.props.userData}
              userInfo={userInfo}
            />
          )}
        </ProfileStack.Screen>
        <ProfileStack.Screen
          name="EditProfile"
          options={{
            title: "Edit Profile",
          }}
        >
          {(props) => (
            <EditProfileScreen
              {...this.props}
              {...props}
              userData={this.props.userData}
              userInfo={userInfo}
              textColor={"#000000"}
            />
          )}
        </ProfileStack.Screen>
        <ProfileStack.Screen
          name="MessagingFromProfile"
          options={MessagingInterface.navigationOptions}
        >
          {(props) => (
            <MessagingInterface
              {...this.props}
              {...props}
              userData={this.props.userData}
              userInfo={userInfo}
            />
          )}
        </ProfileStack.Screen>
        <ProfileStack.Screen name="ProfileFromProfile" options={{headerShown: false}}>
          {(props) => (<ProfileScreen {...props} userData={userData} fromFeed={true} ownerId={ownerId}/>)}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}
