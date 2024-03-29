import React from "react";
import { Alert, TouchableHighlightBase } from "react-native";
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

import { getName, getFullName, getAvatar } from "../functions/UserInfoFormatter";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import firebase from "firebase";

const PageDrawer = createDrawerNavigator();



function getNotificationBody(notificationItem) {
  
}

          // id: change.doc.id,
          // lastSender: newNotificationData.lastSender,
          // targetInfo: newNotificationData.targetInfo,
          // new: newNotificationData.new,
          // senderCount: newNotificationData.senderCount,
          // timestamp: newNotificationData.timestamp,
          // text: newNotificationData.text,

export default class AppPage extends React.Component {
  state = {
    chats: [],
    messageCount: 0,
    notifications: [],
    notificationCount: 0,
    courses: [],
    courseNotificationCount: 0,
    usertoken: "",
  };

  componentDidMount() {
    registerForPushNotificationsAsync().then((token) =>
      this.setState({ usertoken: token })
    );
    //Adding chats

    let chatsArray = [];
    let messageCount = 0;
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid);

    //Listening to user chats.
    this._unsubscribeChats = userRef
      .collection("chats")
      .onSnapshot((chatSnapshot) => {
        let chatChanges = chatSnapshot.docChanges();

        this.getChats(chatChanges, chatsArray).then(() => {
          var getChatCount = new Promise((resolve, reject) => {
            chatsArray.forEach((item, index, array) => {
              if (item.new) {
                messageCount = messageCount + 1;

                //Push notification
                if(!item.notified) {
                  if (item.groupChatInfo) {
                    this.pushNewGroupMessage(item);
                  } else {
                    this.pushNewMessage(item);
                  }
                  userRef.collection("chats").doc(item.id).set({notified: true}, {merge: true});
                }


              }
              if (index === array.length - 1) resolve();
            });
          });
          getChatCount.then(() => {
            this.setState({ chats: chatsArray, messageCount: messageCount });
            messageCount = 0;
          });
        });
      });

    let notificationsArray = [];
    let notificationCount = 0;
    //Listening to user notifications.
    this._unsubscribeNotifications = userRef
      .collection("notifications")
      .onSnapshot((notificationSnapshot) => {
        let notificationChanges = notificationSnapshot.docChanges();
        this.getNotifications(notificationChanges, notificationsArray).then( () => {
            var getNotificationCount = new Promise((resolve, reject) => {
              notificationsArray.forEach((item, index, array) => {
                if (item.new) {
                  notificationCount = notificationCount + 1;

                  if (!item.notified) {
                    this.pushNewNotification(item);
                    userRef.collection("notifications").doc(item.id).set({notified: true}, {merge: true});
                  }
                }
                if (index === array.length - 1) resolve();
              });
            });

            getNotificationCount.then(() => {
              this.setState({
                notifications: notificationsArray,
                notificationCount: notificationCount,
              });
              notificationCount = 0;
            });
          }
        );
      });

    let coursesArray = [];
    let courseNotificationCount = 0;
    this._unsubscribeCourses = userRef
      .collection("courses")
      .onSnapshot((courseSnapshot) => {
        let courseChanges = courseSnapshot.docChanges();

        this.getCourses(courseChanges, coursesArray).then(() => {
          var getCourseCount = new Promise((resolve, reject) => {
            coursesArray.forEach((item, index, array) => {
              if (item.newCount > 0) {
                courseNotificationCount = courseNotificationCount + 1;
              }
              if (index === array.length - 1) resolve();
            });
          });
          getCourseCount.then(() => {
            this.setState({
              courses: coursesArray,
              courseNotificationCount: courseNotificationCount,
            });
            courseNotificationCount = 0;
          });
        })
      });
  }

  componentWillUnmount() {
    this._unsubscribeChats();
    this._unsubscribeNotifications();
    this._unsubscribeCourses();
  }


  pushNewMessage = (chat) => {
    let token = this.props.userData.token;
    if (token) {
      const senderId = chat.lastMessage.senderId;
      const senderRef = firebase.firestore().collection("users").doc(senderId);
      const currentUser = senderId === this.props.userData.uid;

      if (!currentUser) {
        senderRef
          .get()
          .then((senderDoc) => {
            const senderInfo = senderDoc.data();
            const title = getFullName(senderInfo);
            const body = chat.lastMessage.text;
            let response = fetch("https://exp.host/--/api/v2/push/send", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: token,
                sound: "default",
                title: title,
                body: body,
              }),
              data: {
                type: "message",
                chat: chat,
                senderInfo: senderInfo,
              }
            });
          })
          .catch((error) => console.log(error));
      }
    }
  };

  pushNewGroupMessage = (chat) => {
    let token = this.props.userData.token;
    if (token) {
      const senderId = chat.lastMessage.senderId;
      const currentUser = senderId === this.props.userData.uid;
      if (!currentUser) {
        const title = chat.groupChatInfo.name;
        const body = chat.lastMessage.text;
        let response = fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: token,
            sound: "default",
            title: title,
            body: body,
            //icon: require("../../assets/splash.jpg"),
          }),
          data: {
            type: "groupMessage",
            chat: chat,
            senderInfo: null,
          }
        });
      }
    }
  };

  pushNewNotification = (notification) => {
    let token = this.props.userData.token;
    if (token) {
      const senderId = notification.lastSender.uid;
      const senderInfo = notification.lastSender;
      const senderCount = notification.senderCount;
      let body;
      if (notification.targetInfo.action === "up") {
        if (senderCount === 1) {
          body = getName(senderInfo) + " upped your post."
        }
        else {
          body = getName(senderInfo) + " and " + (senderCount - 1).toString() + " others upped your post."
        }
      }
      else if (notification.targetInfo.action === "comment") {
        if (senderCount === 1) {
          body = getName(senderInfo) + " commented on your post: " + notification.text;
        }
        else {
          body = getName(senderInfo) + " and " + (senderCount - 1).toString() + " others commented on your post."
        }
      }

      let response = fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: token,
          sound: "default",
          body: body,
        }),
      });
    }
  }

  handleNotificationResponse = response => {
    if (response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
      const notification = response.notification.request;
      const notificationContent = notification.content;
      const notificationData = notificationContent.data; //{type: ["message, groupMessage"], chat, senderInfo}
      if (notificationData.type === "message") {
        this.props.redirectData = {
          route: "Home",
          subroute: {
            route: "Messages",
            subroute: {
              route: "Messaging",
              params: {chat: notificationData.chat, senderInfo: notificationData.senderInfo},
            }
          }
        }
      }


    }
  }

  getChats = async (chatChanges, chatsArray) => {
    return new Promise((resolve, reject) => {
      chatChanges.forEach((change, index, array) => {
        const newChatData = change.doc.data();
        this.getChatParticipants(change.doc.id).then((participants) => {
          const newChatItem = {
            id: newChatData.id,
            timestamp: newChatData.lastTimestamp,
            new: newChatData.new,
            newCount: newChatData.newCount,
            participantIds: participants.participantIds,
            subscribedIds: participants.subscribedIds,
            lastMessage: newChatData.lastMessage,
            groupChatInfo: newChatData.groupChatInfo,
            notified: newChatData.notified,
          };

          if (change.type === "added") {
            //Adding to array
            if (newChatItem.lastMessage) {
              chatsArray.unshift(newChatItem);
            }
          } else if (change.type === "modified") {
            //Modifying previously added chat.
            if (newChatItem.lastMessage) {
              const index = chatsArray.findIndex(
                (item) => item.id === newChatItem.id
              );
              if (index >= 0) {
                chatsArray[index] = newChatItem;
              } else {
                chatsArray.unshift(newChatItem);
              }
            }
          } else if (change.type === "removed") {
            //Modifying previously added chat.
            const index = chatsArray.findIndex(
              (item) => item.id === newChatItem.id
            );
            chatsArray.splice(index, 1);
          }

          if (index === array.length - 1) resolve();
        });
      });
    });
  };

  getNotifications = async (notificationChanges, notificationsArray) => {
    return new Promise((resolve, reject) => {
      notificationChanges.forEach((change, index, array) => {
        const newNotificationData = change.doc.data();
        const newNotificationItem = {
          id: change.doc.id,
          lastSender: newNotificationData.lastSender,
          targetInfo: newNotificationData.targetInfo,
          new: newNotificationData.new,
          senderCount: newNotificationData.senderCount,
          timestamp: newNotificationData.timestamp,
          text: newNotificationData.text,
        };

        if (change.type === "added") {
          //Adding to array
          notificationsArray.unshift(newNotificationItem);
        } else if (change.type === "modified") {
          //Modifying previously added chat.
          if (newNotificationItem.lastMessage) {
            const index = notificationsArray.findIndex(
              (item) => item.id === newNotificationItem.id
            );
            if (index >= 0) {
              chatsArray[index] = newNotificationItem;
            } else {
              chatsArray.unshift(newNotificationItem);
            }
          }
        } else if (change.type === "removed") {
          //Modifying previously added chat.
          const index = notificationsArray.findIndex(
            (item) => item.id === newNotificationItem.id
          );
          notificationsArray.splice(index, 1);
        }

        if (index === array.length - 1) resolve();
      });
    });
  };

  
  getCourses = async (courseChanges, coursesArray) => {
    return new Promise((resolve, reject) => {
      courseChanges.forEach((change, index, array) => {
        const newCourseData = change.doc.data();
        const generalId = Object.keys(newCourseData.sections)[0];
        this.getSectionParticipants(generalId).then((participants) => {
          const newCourseItem = {
            id: change.doc.id,
            timestamp: newCourseData.lastTimestamp,
            new: newCourseData.new,
            newCount: newCourseData.newCount,
            participantIds: participants.participantIds,
            subscribedIds: participants.subscribedIds,
            code: newCourseData.code,
            name: newCourseData.name,
            color: newCourseData.color,
            sections: newCourseData.sections,
            // groupChatInfo: newCourseData.groupChatInfo,
            // notified: newCourseData.notified,
          };

          if (change.type === "added") {
            //Adding to array
            coursesArray.unshift(newCourseItem);
          } else if (change.type === "modified") {
            //Modifying previously added chat.
            const index = coursesArray.findIndex(
              (item) => item.id === newCourseItem.id
            );
            if (index >= 0) {
              coursesArray[index] = newCourseItem;
            } else {
              coursesArray.unshift(newCourseItem);
            }
          } else if (change.type === "removed") {
            //Modifying previously added chat.
            const index = coursesArray.findIndex(
              (item) => item.id === newCourseItem.id
            );
            coursesArray.splice(index, 1);
          }

          if (index === array.length - 1) resolve();
        });
      });
    });
  };

  getChatParticipants(chatId) {
    const chatRef = firebase.firestore().collection("chats").doc(chatId);
    return new Promise((resolve, reject) => {
      chatRef.get().then((chatDoc) => {
        const chatData = chatDoc.data();
        const participantIds = Object.keys(chatData.participantIds);
        let subscribedIds = []
        participantIds.forEach(participantId => {
          if (chatData.participantIds[participantId]) {
            subscribedIds.push(participantId)
          }
        })
        resolve({participantIds, subscribedIds});
      });
    });
  }

  getSectionParticipants(sectionId) {
    const sectionRef = firebase.firestore().collection("sections").doc(sectionId);
    return new Promise((resolve, reject) => {
      sectionRef.get().then((sectionDoc) => {
        const sectionData = sectionDoc.data();
        if (sectionData.studentIds && Object.keys(sectionData.studentIds).length !== 0 )
        {
          const participantIds = Object.keys(sectionData.studentIds);
          let subscribedIds = [];
          participantIds.forEach(participantId => {
            if (sectionData.studentIds[participantId]) {
              subscribedIds.push(participantId)
            }
          })
          resolve({participantIds, subscribedIds});
        }
        else {
          resolve([], []);
        }
      });
    });
  }

  render() {
    const chats = this.state.chats;
    const messageCount = this.state.messageCount;
    const notifications = this.state.notifications;
    const notificationCount = this.state.notificationCount;
    const courses = this.state.courses;
    return (
      <PageNavigator
        {...this.props}
        chats={chats}
        messageCount={messageCount}
        notifications={notifications}
        notificationCount={notificationCount}
        courses={courses}
      />
    );
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  const currentUser = firebase.auth().currentUser.uid;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log("Inside Func:" + token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (token) {
    const res = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set({ token }, { merge: true });
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  //Alert.alert(token);
  return token;
}

const PageNavigator = (props) => {
  const userData = props.userData;
  const chats = props.chats;
  const messageCount = props.messageCount;
  const notifications = props.notifications;
  const notificationCount = props.notificationCount;
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
            notifications={notifications}
            notificationCount={notificationCount}
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
