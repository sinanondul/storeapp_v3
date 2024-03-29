import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";


import LandingScreen from "./LandingScreen";
import MessagingInterface from "./MessagingInterface";
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
        <MessagesStack.Screen name="Messaging" options={MessagingInterface.navigationOptions}>
          {(props) => <MessagingInterface {...props} userData={userData}/>}
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

