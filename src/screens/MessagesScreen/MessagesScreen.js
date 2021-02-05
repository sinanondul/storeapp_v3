import React from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator} from "@react-navigation/stack";


import LandingScreen from "./LandingScreen";
import MessagingInterface from "./MessagingInterface";
import styles from "./styles";

const messageItems = [
  {
    id: "1",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "2",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
]

export default class MessagesScreen extends React.Component{


  componentDidMount() {
  }

  render(){
    const MessagesStack = createStackNavigator();
    return (
      <MessagesStack.Navigator
        initialRouteName="Landing"
      >
        <MessagesStack.Screen name="Landing" component={LandingScreen} options={LandingScreen.navigationOptions}/>
        <MessagesStack.Screen name="Messaging" component={MessagingInterface} options={MessagingInterface.navigationOptions}/>
      </MessagesStack.Navigator>
    );
  }

  static navigationOptions = {
   headerShown: false,
  };
}

