import React from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";


import LandingScreen from "./LandingScreen";
import NewMessagingInterface from "./NewMessagingInterface";
import AddChatScreen from "./AddChatScreen";
import AddToGroupChatScreen from './AddToGroupChatScreen';
import CustomizeGroupChatScreen from './CustomizeGroupChatScreen';
import GroupChatDescriptionScreen from './GroupChatDescriptionScreen'
import styles from "./styles";

export default class MessagesScreen extends React.Component{


  componentDidMount() {
  }

  render(){
    const MessagesStack = createStackNavigator();
    const userData = this.props.userData;
    const chats = this.props.chats;
    return (
      <MessagesStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <MessagesStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {(props) => <LandingScreen {...props} userData={userData} chats={chats}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="Messaging" options={NewMessagingInterface.navigationOptions}>
          {(props) => <NewMessagingInterface {...props} userData={userData}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="AddChat" options={AddChatScreen.navigationOptions}>
          {(props) => <AddChatScreen {...props} userData={userData}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="AddGroupChat" options={AddToGroupChatScreen.navigationOptions}>
          {(props) => <AddToGroupChatScreen {...props} userData={userData}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="CustomizeGroupChat" options={CustomizeGroupChatScreen.navigationOptions}>
          {(props) => <CustomizeGroupChatScreen {...props} userData={userData}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="GroupChatDescription" options={GroupChatDescriptionScreen.navigationOptions}>
          {(props) => <GroupChatDescriptionScreen {...props} userData={userData}/>}
        </MessagesStack.Screen>
      </MessagesStack.Navigator>
    );
  }

  static navigationOptions = {
   headerShown: false,
  };
}

