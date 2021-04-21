import React from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import DrawerContent from "./DrawerContent";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CoursesScreen from "../screens/CoursesScreen/CoursesScreen";
import HousematesScreen from "../screens/HousematesScreen/HousematesScreen";
import SuppliesScreen from "../screens/SuppliesScreen/SuppliesScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import Onboarding from "../screens/HelpScreen/Onboarding.js";
import Sponsored from "../screens/SponsoredScreen/Sponsored";

import MessagesScreen from "../screens/MessagesScreen/MessagesScreen";
import AddScreen from "../screens/HomeScreen/AddScreen/AddScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";

import firebase from "firebase";

const PageDrawer = createDrawerNavigator();

export default class AppPage extends React.Component {
  state = {
    chats: [],
    messageCount: 0,
    courses: [],
    courseNotificationCount: 0,
  };

  componentDidMount() {
    //Adding chats

    let chatsArray = [];
    let messageCount = 0;
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid);
    this._unsubscribeChats = userRef
      .collection("chats")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        this.getChats.then(() => {
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

    let coursesArray = [];
    let courseNotificationCount = 0;
    this._unsubscribeCourses = userRef
      .collection('courses')
      .onSnapshot((courseSnapshot) => {
        let courseChanges = courseSnapshot.docChanges();
        var getCourses = new Promise((resolve, reject) => {
          courseChanges.forEach((change, index, array) => {

            const newCourseRef = change.doc.data();
            firebase
              .firestore()
              .collection('courses')
              .doc(change.doc.id)
              .get()
              .then((firestoreDocument) => {
                let newCourseData = firestoreDocument.data();
                let sections = {};

                const newCourseItem = {
                  id: change.doc.id,
                  lastTimestamp: newCourseRef.lastTimestamp,
                  new: newCourseRef.new,
                  newCount: newCourseRef.newCount,
                  code: newCourseData.code,
                  name: newCourseData.name,
                  color: newCourseData.color,
                  sections: newCourseData.sections,
                };
                if (change.type === "added") {
                  //Adding to array
                  coursesArray.unshift(newCourseItem);
                }
                else if (change.type === "modified") 
                {
                  //Modifying previously added chat. 
                  const index = coursesArray.findIndex((item) => item.id === newChatItem.id)
                  coursesArray[index] = newCourseItem;
                }
                else if (change.type === "removed") 
                {
                  //Modifying previously added chat. 
                  const index = coursesArray.findIndex((item) => item.id === newCourseItem.id)
                  coursesArray.splice(index, 1);

                }

                if (index === array.length - 1) resolve();
              });
          });
        })

        getCourses.then(() => {
          var getCourseCount = new Promise((resolve, reject) => {
            coursesArray.forEach((item, index, array) => {
              if (item.newCount > 0) {
                courseNotificationCount = courseNotificationCount + 1;
              }
              if (index === array.length - 1) resolve();
            });
          });
          getCourseCount.then(() => {
            this.setState({ courses: coursesArray, courseNotificationCount: courseNotificationCount })
            courseNotificationCount = 0;
          })
        });
      });
  }

  getChats = async(changes, chatsArray) => {

    return new Promise((resolve, reject) => {
      changes.forEach((change, index, array) => {

        const newChatData = change.doc.data();
        this.getChatParticipantIds(change.id).then(participantIds => {
          const newChatItem = {
            id: newChatData.id,
            timestamp: newChatData.lastTimestamp,
            new: newChatData.new,
            newCount: newChatData.newCount,
            participantIds: participantIds,
            lastMessage: newChatData.lastMessage,
            groupChatInfo: newChatData.groupChatInfo
          };
  
          if (change.type === "added") 
          {
            //Adding to array
            if (newChatItem.lastMessage)  {
              chatsArray.unshift(newChatItem);
            }
          }
          else if (change.type === "modified") 
          {
            //Modifying previously added chat. 
            if (newChatItem.lastMessage)  {
              const index = chatsArray.findIndex((item) => item.id === newChatItem.id)
              if (index >= 0) {
                chatsArray[index] = newChatItem;
              }
              else {
                chatsArray.unshift(newChatItem);
              }
            }
          }
          else if (change.type === "removed") 
          {
            //Modifying previously added chat. 
            const index = chatsArray.findIndex((item) => item.id === newChatRef.id)
            chatsArray.splice(index, 1);
          }
          
        
          if (index === array.length -1) resolve();
        });
      });
    });
  }

  getChatParticipantIds(chatId) {
    const chatRef = firebase.firestore().collection('chats').doc(chatId);
    return new Promise((resolve, reject) => {
      chatRef.get.then(chatDoc => {
        const chatData = chatDoc.data();
        resolve(Object.keys(chatData.participantIds));
      })
    });
  }

  render() {
    const chats = this.state.chats;
    const messageCount = this.state.messageCount;
    const courses = this.state.courses;
    return (
      <PageNavigator
        {...this.props}
        chats={chats}
        messageCount={messageCount}
        courses={courses}
      />
    );
  }
}

const PageNavigator = (props) => {
  const userData = props.userData;
  const chats = props.chats;
  const messageCount = props.messageCount;
  const courses = props.courses;
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
        {(props) => (
          <HomeScreen
            {...props}
            userData={userData}
            chats={chats}
            messageCount={messageCount}
          />
        )}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Courses">
        {(props) => (
          <CoursesScreen
            {...props}
            userData={userData}
            chats={chats}
            messageCount={messageCount}
            courses={courses}
          />
        )}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Supplies" component={SuppliesScreen} />
      <PageDrawer.Screen name="Housemates" component={HousematesScreen} />
      <PageDrawer.Screen name="Profile">
        {(props) => (
          <ProfileScreen
            {...props}
            userData={userData}
            ownerId={userData.uid}
          />
        )}
      </PageDrawer.Screen>
      <PageDrawer.Screen name="Settings" component={SettingsScreen} />
      <PageDrawer.Screen name="Onboarding" component={Onboarding} />
      <PageDrawer.Screen name="Sponsored" component={Sponsored} />
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
