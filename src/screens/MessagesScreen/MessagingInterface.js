import React, {useCallback} from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";
import {HeaderBackButton} from "@react-navigation/stack";

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
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerAvatar}>
              { this.props.route.params.chat.groupChatInfo
                ? getGroupChatAvatar(this.props.route.params.groupChatInfo)
                : getAvatar(this.props.route.params.senderInfo)
              }
            </View>

            <Text style={styles.headerText}>
              { this.props.route.params.chat.groupChatInfo
                ? getGroupChatName(this.props.route.params.chat.groupChatInfo)
                : getFullName(this.props.route.params.senderInfo) 
              }
            </Text>
          </View>
        ),
      });

      //Getting participant info.
      let usersArray = [];

      const usersRef = firebase.firestore().collection("users");
      const participantIds = this.props.route.params.chat.participantIds;
      var getUsers = new Promise((resolve, reject) => {
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
    
      getUsers.then(() => {
        this.setState({userData: usersArray});
        //Getting messages.
        let messagesArray = [];
        const chatRef = firebase.firestore().collection("chats").doc(this.props.route.params.chat.id);
        const unsubscribe = chatRef
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();

            changes.forEach((change) => {
              if (change.type === 'added') {
                const newMessage = change.doc.data();
                const userItem = this.state.userData.find((user) => user.uid === newMessage.senderId);
                const newMessageData = {
                  _id: change.doc.id,
                  text: newMessage.text,
                  createdAt: newMessage.timestamp,
                  user: {
                    _id: newMessage.senderId,
                    name: getFullName(userItem),
                  },
                }
                messagesArray.unshift(newMessageData);
              }
            });
            this.setState({messages: messagesArray});
          });
      });
     
    }

    componentWillUnmount() {
    }
    
    onSend (messages) {
      Fire.shared
      .addMessage({
        senderId: this.props.userData.uid,
        text: messages[0].text,
        chatId: this.props.route.params.chat.id,
        participantIds: this.props.route.params.chat.participantIds,
      })
      .catch((error) => {
        alert(error);
      });
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
