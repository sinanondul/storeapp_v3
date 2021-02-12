import React from "react";
import { View, Text, Platform, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import LandingScreen from "../screens/HomeScreen/LandingScreen";
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import AddScreen from "../screens/HomeScreen/AddScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import AddModal from "../screens/HomeScreen/AddModal";

const SocialStack = createStackNavigator();

const SocialBottomTab = createBottomTabNavigator();

function SocialTabNavigator() {
  const navigation = useNavigation();
  return (
    <SocialBottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { height: 60 },
      }}
    >
      <SocialBottomTab.Screen
        name="MessagesFiller"
        component={LandingScreen}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name={
                Platform.OS === "ios"
                  ? "ios-chatbubbles-outline"
                  : "md-chatbubbles-outline"
              }
              size={24}
              color={tintColor}
            />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate("Messages");
          },
        })}
      />
      <SocialBottomTab.Screen
        name="AddFiller"
        component={LandingScreen}
        initialParams={{ i: false }}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
              size={48}
              color="#f4511e"
              style={{
                shadowColor: "#f4511e",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            />
          ),
        }}
        listeners={(props /*{ navigation, route }*/) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate("Add");
          },
        })}
      />
      <SocialBottomTab.Screen
        name="NotificationsFiller"
        component={LandingScreen}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name={
                Platform.OS === "ios"
                  ? "ios-notifications-outline"
                  : "md-notifications-outline"
              }
              size={24}
              color={tintColor}
            />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate("Notifications");
          },
        })}
      />
    </SocialBottomTab.Navigator>
  );
}

export default function SocialNavigator(props) {
  var userData = props.userData;
  return (
    <SocialStack.Navigator options={{}} mode="modal">
      <SocialStack.Screen
        name="Default"
        component={SocialTabNavigator}
        options={LandingScreen.navigationOptions}
      />
      <SocialStack.Screen
        name="Messages"
        options={MessagesScreen.navigationOptions}
      >
        {(props) => <MessagesScreen {...props} userData={userData} />}
      </SocialStack.Screen>
      <SocialStack.Screen name="Add" options={{}}>
        {(props) => <AddModal {...props} />}
      </SocialStack.Screen>
      <SocialStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={NotificationsScreen.navigationOptions}
      />
    </SocialStack.Navigator>
  );
}
