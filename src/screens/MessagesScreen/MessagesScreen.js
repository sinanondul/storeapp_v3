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
    const userData = this.props.userData
    return (
      <MessagesStack.Navigator
        initialRouteName="Landing"
      >
        <MessagesStack.Screen name="Landing" options={LandingScreen.navigationOptions}>
          {(props) => <LandingScreen {...props} userData={userData}/>}
        </MessagesStack.Screen>
        <MessagesStack.Screen name="Messaging" options={MessagingInterface.navigationOptions}>
          {(props) => <MessagingInterface {...props} userData={userData}/>}
        </MessagesStack.Screen>
      </MessagesStack.Navigator>
    );
  }

  static navigationOptions = {
   headerShown: false,
  };
}

