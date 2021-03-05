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

export default function SocialNavigator(props) {
  var userData = props.userData;
  var chats = props.chats;
  var newChatCount = props.newChatCount;
  return (
    <SocialStack.Navigator 
      options={{}} 
      mode="modal"
    >
      <SocialStack.Screen
        name="Default"
        options={LandingScreen.navigationOptions}
      >
        {(props) =><LandingScreen {...props}/>}
      </SocialStack.Screen>

      <SocialStack.Screen
        name="Messages"
        options={MessagesScreen.navigationOptions}
      >
        {(props) => <MessagesScreen {...props} userData={userData} chats={chats} />}
      </SocialStack.Screen>
      <SocialStack.Screen name="Add" options={{}}>
        {(props) => <AddScreen {...props} />}
      </SocialStack.Screen>
      <SocialStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={NotificationsScreen.navigationOptions}
      />
    </SocialStack.Navigator>
  );
}
