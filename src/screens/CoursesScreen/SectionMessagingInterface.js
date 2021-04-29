import React, {useCallback} from "react";
import {View, Platform, Text, TouchableOpacity, FlatList, Alert} from "react-native";
import Clipboard from 'expo-clipboard';
import {GiftedChat} from "react-native-gifted-chat";

import {getFullName, getAvatar, getGroupChatName, getGroupChatAvatar} from "../../functions/UserInfoFormatter";
import CourseTag from './components/CourseTag';
import styles, { CourseItemScreenStyles as pageStyles } from "./styles";
import Fire from "../../firebase/Fire";
import firebase from 'firebase';


export default class SectionMessagingInterface extends React.Component{
    
    constructor(props) {
      super(props);
    }
    
    state={
        messages: [],
        userData: []
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
      };


    componentDidMount() {
      this.props.navigation.setOptions({
        title: this.props.route.params.course.code,
        headerStyle: {
          backgroundColor: "#2890cf",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          flex: 0.6,
          paddingRight: Platform.OS === "ios" ? 0 : 60,
          alignSelf: "center",
          alignItems: "center",
          fontWeight: "bold",
        },
      });
      //Getting participant info.
      let usersArray = [];

      this.getParticipants(usersArray).then(() => {
        this.setState({userData: usersArray});
        //Getting messages.
        let messagesArray = [];
        const courseRef = firebase.firestore().collection('users').doc(this.props.userData.uid)
        .collection("courses").doc(this.props.route.params.course.id);

        //Getting messages
        this._unsubscribe = courseRef
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();

            changes.forEach((change) => {
              if (change.type === 'added') {
                const newMessage = change.doc.data();
                let userItem = this.state.userData.find((user) => user.uid === newMessage.senderId);
                if (!userItem) {
                  firebase.firestore().collection('users')
                  .doc(newMessage.senderId)
                  .get()
                  .then((firestoreDocument) => {
                    let userData = firestoreDocument.data();
                    const userInfo = {
                        uid: userData.id,
                        fullName: userData.fullName,
                        name: userData.name,
                        surename: userData.surename,
                        avatar: userData.avatar,
                    }
                    
                    usersArray.unshift(userInfo);

                    userItem = userInfo;
                    
                    let newMessageData;
                    if (newMessage.system) {
                      newMessageData = {
                        _id: change.doc.id,
                        text: newMessage.text,
                        createdAt: newMessage.timestamp,
                        system: true,
                      }
                    }
                    else {
                      newMessageData = {
                        _id: change.doc.id,
                        text: newMessage.text,
                        createdAt: newMessage.timestamp,
                        user: {
                          _id: newMessage.senderId,
                          name: getFullName(userItem),
                        },
                      }
                    }
                    messagesArray.unshift(newMessageData);
                  });
                }
                else {

                  let newMessageData;
                  if (newMessage.system) {
                    newMessageData = {
                      _id: change.doc.id,
                      text: newMessage.text,
                      createdAt: newMessage.timestamp,
                      system: true,
                    }
                  }
                  else {
                    newMessageData = {
                      _id: change.doc.id,
                      text: newMessage.text,
                      createdAt: newMessage.timestamp,
                      user: {
                        _id: newMessage.senderId,
                        name: getFullName(userItem),
                      },
                    }
                  }
                  messagesArray.unshift(newMessageData);
                }

              }
            });
            messagesArray.sort((a, b) => b.createdAt - a.createdAt)
            this.setState({messages: messagesArray});
          });
      });
     
    }

    componentWillUnmount() {
      if (this._unsubscribe) {
        this._unsubscribe();
      }
    }

    getParticipants(usersArray) {
        const usersRef = firebase.firestore().collection("users");
        const participantIds = this.props.route.params.course.participantIds;
        return new Promise((resolve, reject) => {
            participantIds.forEach((participantId, index, array) => {
              usersRef
              .doc(participantId)
              .get()
              .then((firestoreDocument) => {
                var userData = firestoreDocument.data();
                const userInfo = {
                    uid: userData.id,
                    fullName: userData.fullName,
                    name: userData.name,
                    surename: userData.surename,
                    avatar: userData.avatar
                }
                
                usersArray.unshift(userInfo);
                if (index === array.length -1) resolve();
              })
            });
        });
    }

    onSend (messages) {
      this.sendMessage(messages[0].text)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

    onLongPress(context, message) {
      const options = ['Delete Message', 'Copy', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      const messageText = message.text;
      context.actionSheet().showActionSheetWithOptions({
          options,
          cancelButtonIndex
      }, (buttonIndex) => {
          switch (buttonIndex) {
              case 0:
                this.deleteMessage(message._id);
                break;
              case 1:
                Clipboard.setString(messageText);
                break;
          }
      });
    }

    //Backend functions.

    sendMessage(text) {
      const courseId = this.props.route.params.course.id;
      const subscribedIds = this.props.route.params.course.subscribedIds;

      const timeCreated = Date.now();
      const messageItem = this.createMessageItem(text, timeCreated)
      subscribedIds.forEach(participantId => this.addToUserMessages(messageItem, courseId, participantId))
    }

    //sendMessage subfunctions.

    addToUserMessages(messageItem, courseId, uid) {
      const userCourseRef = firebase.firestore().collection('users').doc(uid).collection('courses').doc(courseId);
      const userMessagesRef = userCourseRef.collection('messages')
      const currentUser = uid === this.props.userData.uid;

      userMessagesRef.add(messageItem).then(messageRef => {
        const messageId = messageRef.id;
        this.updateCourseHeader(messageId, messageItem, userChatRef, currentUser);
      });
    }

    //Updating chat header.
    updateCourseHeader(messageId, messageItem, userCourseRef, currentUser) {
      
      const increment = firebase.firestore.FieldValue.increment(1);

      if (currentUser)
      {
        userCourseRef.set({
          lastMessage: {...messageItem, id: messageId},
        }, {merge: true})
      }
      else 
      {
        userChatRef.set({
          lastMessage: {...messageItem, id: messageId},
          new: true,
          newCount: increment,
          notified: false,
        }, {merge: true})
      }

      this.props.route.params.course.lastMessage = {...messageItem, id: messageId};
    }

    //Creating message item.
    createMessageItem(text, timeCreated) {
      return {text, timestamp: timeCreated, senderId: this.props.userData.uid, system: false}
    }
    

    render() {
      const courseInfo = this.props.route.params.course;
        return(
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={pageStyles.groupInfoContainer}>
              <CourseTag height={26} color={courseInfo.color} text={courseInfo.code}/>
              <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={2}>
                  {courseInfo.name}
                </Text>
              </View>
            </View>
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                  _id: this.props.userData.uid,
                }}
            />
          </View>
        );
    }

    static navigationOptions = {
        title: "Test",
        headerStyle: {
          backgroundColor: "#2890cf",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          flex: 0.6,
          alignSelf: 'center', 
          alignItems: 'center',
          fontWeight: 'bold',
        },
    };
}
