import React, {useCallback} from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";
import {HeaderBackButton} from "@react-navigation/stack";
import {AsyncStorage} from '@react-native-async-storage/async-storage';

import {getFullName, getAvatar, getGroupChatName, getGroupChatAvatar} from "../../functions/UserInfoFormatter";
import styles from "./styles";
import Fire from "../../firebase/Fire";
import firebase from 'firebase';


export default class MessagingInterface extends React.Component{
    
    
    state={
        messages: [],
        userData: []
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
      };


    componentDidMount() {
      //Setting navigation options.
      this.props.navigation.setOptions({
        headerTitle: () => (
          <TouchableOpacity 
            style={styles.headerTitleContainer}
            onPress={() => {
              if (this.props.route.params.chat.groupChatInfo) {
                this.props.navigation.navigate("GroupChatDescription", {chat: this.props.route.params.chat});
              }
            }}
          >
            <View style={styles.headerAvatar}>
              { this.props.route.params.chat.groupChatInfo
                ? getGroupChatAvatar(this.props.route.params.chat.groupChatInfo)
                : getAvatar(this.props.route.params.senderInfo)
              }
            </View>

            <Text style={styles.headerText}>
              { this.props.route.params.chat.groupChatInfo
                ? getGroupChatName(this.props.route.params.chat.groupChatInfo)
                : getFullName(this.props.route.params.senderInfo) 
              }
            </Text>
          </TouchableOpacity>
        ),
      });

      //Getting participant info.
      let usersArray = [];

      this.getParticipants(usersArray).then(() => {
        this.setState({userData: usersArray});
        //Getting messages.
        let messagesArray = [];
        const chatRef = firebase.firestore().collection('users').doc(this.props.userData.uid)
        .collection("chats").doc(this.props.route.params.chat.id);

        //Getting messages
        this._unsubscribe = chatRef
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();

            changes.forEach((change) => {
              if (change.type === 'added') {
                const newMessage = change.doc.data();
                const userItem = this.state.userData.find((user) => user.uid === newMessage.senderId);
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
            });
            this.setState({messages: messagesArray});
          });
      });
     
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    getParticipants(usersArray) {
        const usersRef = firebase.firestore().collection("users");
        const participantIds = this.props.route.params.chat.participantIds;
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

    sendMessage(text) {
      const chatId = this.props.route.params.chat.id;
      const participantIds = this.props.route.params.chat.participantIds;

      const timeCreated = Date.now();
      const messageItem = this.createMessageItem(text, timeCreated)
      participantIds.forEach(participantId => this.addToUserMessages(messageItem, chatId, participantId))
    }

    addToUserMessages(messageItem, chatId, uid) {
      const userChatRef = firebase.firestore().collection('users').doc(uid).collection('chats').doc(chatId);
      const userMessagesRef = userChatRef.collection('messages')
      const currentUser = uid === this.props.userData.uid;

      this.addToUserChats(messageItem, chatId, userChatRef, currentUser).then(() => {
        userMessagesRef.add(messageItem);
      })
    }

    addToUserChats = async(messageItem, chatId, userChatRef, currentUser) => {
      const increment = firebase.firestore.FieldValue.increment(1);
      const chatInfo = this.props.route.params.chat;

      //Checking if chat exists.
      return new Promise((resolve, reject) => {
        userChatRef.get().then((userChatDoc) => {

          //If chat doesn't exist for user.
          if (!userChatDoc.exists) {

            //Creating chat header.
            userChatRef.set({
              id: chatId,
              groupChatInfo: chatInfo.groupChatInfo,
              lastMessage: messageItem,
              new: currentUser ? false : true,
              newCount: currentUser ? 0 : 1,
            })
          }
          
          else {

            //Updating chat header.
            if (currentUser)
            {
              userChatRef.set({
                lastMessage: messageItem,
              }, {merge: true})
            }
            else 
            {
              userChatRef.set({
                lastMessage: messageItem,
                new: true,
                newCount: increment,
              }, {merge: true})
            }

          }
          resolve();
        });


      })
    }

    createMessageItem(text, timeCreated) {
      return {text, timestamp: timeCreated, senderId: this.props.userData.uid}
    }
    
    onSend (messages) {
      this.sendMessage(messages[0].text)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

    render() {
        return(
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <GiftedChat
                messages={this.state.messages.sort((a, b) => b.createdAt - a.createdAt)}
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
