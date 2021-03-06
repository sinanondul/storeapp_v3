import React from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import DrawerContent from "./DrawerContent";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";
import SuppliesScreen from "../screens/SuppliesScreen/SuppliesScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import Onboarding from "../screens/HelpScreen/Onboarding.js";


import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import AddScreen from "../screens/HomeScreen/AddScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";

import firebase from 'firebase';
import ChatItem from "../screens/MessagesScreen/ChatItem";

const PageDrawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
};

export default class AppPage extends React.Component {
  state = {
    chats: [],
    messageCount: 0,
  }

  componentDidMount() {
    //Adding chats

    let chatsArray = [];
    let messageCount = 0;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .collection("chats")
      .onSnapshot((snapshot) => {
        
        let changes = snapshot.docChanges();
        var getChats = new Promise((resolve, reject) => {
          changes.forEach((change, index, array) => {
            
            if (change.type === "added") {
              const newChatRef = change.doc.data();
              firebase
              .firestore()
              .collection("chats")
              .doc(newChatRef.id)
              .get()
              .then((firestoreDocument) => {
                  var newChatData = firestoreDocument.data();

                  const newChatItem = {
                    id: newChatRef.id,
                    timestamp: newChatRef.lastTimestamp,
                    new: newChatRef.new,
                    newCount: newChatRef.newCount,
                    participantIds: Array.from(Object.keys(newChatData.participantIds)),
                    lastMessage: newChatData.lastMessage,
                    chatInfo: newChatData.chatInfo
                  };

                  //Adding to array
                  chatsArray.unshift(newChatItem);
                  
                  if (index === array.length -1) resolve();
                })
            }
            else if (change.type === "modified") {
              const newChatRef = change.doc.data();
              firebase
              .firestore()
              .collection("chats")
              .doc(newChatRef.id)
              .get()
              .then((firestoreDocument) => {
                var newChatData = firestoreDocument.data();       

                const newChatItem = {
                  id: newChatRef.id,
                  timestamp: newChatRef.lastTimestamp,
                  new: newChatRef.new,
                  newCount: newChatRef.newCount,
                  participantIds: Array.from(Object.keys(newChatData.participantIds)),
                  lastMessage: newChatData.lastMessage,
                  chatInfo: newChatData.chatInfo
                };

                //Modifying previously added chat. 
                const index = chatsArray.findIndex((item) => item.id === newChatItem.id)
                chatsArray[index] = newChatItem;
                
                if (index === array.length -1) resolve();
              })
            }
          });
        });

        

        getChats.then(() => {
          var getChatCount = new Promise((resolve, reject) => {
            chatsArray.forEach((item, index, array) => {
              if (item.newCount > 0) {
                messageCount = messageCount + 1;
              }
              if (index === array.length -1) resolve();
            })
          });
          getChatCount.then(() => {
            this.setState({ chats: chatsArray, messageCount: messageCount })
            messageCount = 0;
          })
        });
    });
  }

  render() {
    const chats = this.state.chats;
    const messageCount = this.state.messageCount;
    return <PageNavigator {...this.props} chats={chats} messageCount = {messageCount}/>;
  }
}

const PageNavigator = (props) => {
  var userData = props.userData;
  var chats = props.chats;
  var messageCount = props.messageCount;
  return (
    <PageDrawer.Navigator
      // screenOptions={screenOptionStyle}
      drawerContent={(props) => (
        <DrawerContent {...props} userData={userData} />
      )}
      initialRouteName="Home"
      drawerOpenRoute="OpenDrawer"
      lazy={false}
    >
      <PageDrawer.Screen name="Home">
        {(props) => <HomeScreen {...props} userData={userData} chats={chats} messageCount={messageCount}/>}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Supplies" component={SuppliesScreen} />
      <PageDrawer.Screen name="Housemates" component={HousematesScreen} />
      <PageDrawer.Screen name="Profile">
        {(props) => <ProfileScreen {...props} userData={userData} />}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Settings" component={SettingsScreen} />
      <PageDrawer.Screen name="Onboarding" component={Onboarding} />
      {/* <PageDrawer.Screen name="Messages" options={MessagesScreen.navigationOptions}>
        {(props) => <MessagesScreen {...props} userData={userData} chats={chats} newChatCount={messageCount}/>}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="AddSocial" options={AddScreen.navigationOptions}>
        {(props) => <AddScreen {...props}/>}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Notifications" options={NotificationsScreen.navigationOptions}>
        {(props) => <NotificationsScreen {...props}/>}
      </PageDrawer.Screen> */}
    </PageDrawer.Navigator>
  );
};
