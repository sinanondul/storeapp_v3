import React from "react";
import { View, Text, Platform, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import LandingScreen from "../screens/HomeScreen/LandingScreen";
import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import AddScreen from "../screens/HomeScreen/AddScreen/AddScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import AddModal from "../screens/HomeScreen/AddScreen/AddModal";

const SocialStack = createStackNavigator();

export default function SocialNavigator(props) {
  const userData = props.userData;
  const chats = props.chats;
  const messageCount = props.messageCount;
  const notificationCount = props.notificationCount;
  return (
    <SocialStack.Navigator 
      options={{}} 
      mode="modal"
    >
      <SocialStack.Screen
        name="Default"
        options={LandingScreen.navigationOptions}
      >
        {(props) =><LandingScreen {...props} messageCount={messageCount} notificationCount={notificationCount}/>}
      </SocialStack.Screen>

      <SocialStack.Screen
        name="Messages"
        options={MessagesScreen.navigationOptions}
      >
        {(props) => <MessagesScreen {...props} userData={userData} chats={chats} />}
      </SocialStack.Screen>
      <SocialStack.Screen name="Add" options={{}}>
        {(props) => <AddScreen {...props} userData={userData}/>}
      </SocialStack.Screen>
      <SocialStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={NotificationsScreen.navigationOptions}
      />
    </SocialStack.Navigator>
  );
}
