import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./LandingScreen";
import MessagingInterface from "../MessagesScreen/MessagingInterface";
import EditProfileScreen from "./EditProfile";
import { openDrawer } from "../../../App";
//import AddScreen from "./AddScreen";
import styles from "./styles";
import { Alert, Platform } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";

export default class ProfileScreen extends React.Component {
  render() {
    const ProfileStack = createStackNavigator();
    var userInfo = this.props.userData;
    if (this.props.route.params) {
      if (this.props.route.params.userInfo) {
        userInfo = this.props.route.params.userInfo;
      }
    }
    return (
      <ProfileStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: "fff",
            shadowColor: "fff",
            elevation: 0,
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <ProfileStack.Screen
          name="Landing"
          options={{
            title: "Profile",
            headerLeft: () => (
              <Icon
                name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
                style={{ marginLeft: 10 }}
                backgroundColor="#1f65ff"
                size={40}
                color="#fff"
                onPress={() => openDrawer()}
              />
            ),
            headerRight: () => (
              <Icon
                name="account-edit"
                style={{ marginRight: 10 }}
                size={30}
                color="#fff"
                onPress={() => this.props.navigation.navigate("EditProfile")}
              />
            ),
          }}
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
          component={EditProfileScreen}
        />
        <ProfileStack.Screen
          name="MessagingFromProfile"
          options={MessagingInterface.navigationOptions}
        >
          {(props) => <MessagingInterface {...this.props} {...props} />}
        </ProfileStack.Screen>
      </ProfileStack.Navigator>
    );
  }
}
