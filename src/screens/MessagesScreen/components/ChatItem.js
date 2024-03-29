import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import Swipeout from 'react-native-swipeout';
import firebase from 'firebase';
import moment from 'moment';

import {getName, getFullName, getAvatar} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../styles";

function getTimeSince(timestamp) {
  moment.updateLocale('en', {
    calendar : {
        lastDay : '[Yesterday]',
        sameDay : 'LT',
        nextDay : '[Tomorrow]',
        lastWeek : 'ddd',
        nextWeek : 'ddd',
        sameElse : 'L'
    }
  });

  return moment(timestamp).calendar();
}


export default class ChatItem extends React.Component{

  state= {
      senderInfo: null,
      lastTimestamp: null,
      lastMessage: null,
      nameinit: false,
  }

  componentDidMount() {

    //Getting sender info.

    const usersRef = firebase.firestore().collection("users");
    const participants = this.props.chat.participantIds;
    const index = participants.findIndex((item) => item !== this.props.userData.uid);
    const senderId = participants[index];
    usersRef
        .doc(senderId)
        .get()
        .then((firestoreDocument) => {
            var userData = firestoreDocument.data();
            this.setState({ senderInfo: {
                uid: senderId,
                fullName: userData.fullName,
                name: userData.name,
                surename: userData.surename,
                avatar: userData.avatar,
            }})
            this.setState({nameinit: true})
        })
  }

  swipeButtons = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {this.deleteChat()},
  }];

  deleteChat() {
    const userRef = firebase.firestore().collection('users').doc(this.props.userData.uid);
    const chatRef = userRef.collection('chats').doc(this.props.chat.id);
    Fire.shared.deleteCollection(chatRef, 'messages', 10);
    chatRef.delete();
    this.props.handleDelete(this.props.chat.id);
  }

  render(){
    const userId = this.props.userData.uid;
    const chatId = this.props.chat.id;
      return ( 
        <Swipeout right={this.swipeButtons} autoClose='true' backgroundColor= 'transparent'>
          <TouchableOpacity 
            onPress={() => {
              Fire.shared.resetNewCount({uid: userId, chatId: chatId});
              return(this.props.navigation.navigate('Messaging', {senderInfo: this.state.senderInfo, chat: this.props.chat}));}
            }
            style={styles.messageItem}>
            <View style={styles.messageAvatar}>
              {this.state.nameinit ? getAvatar(this.state.senderInfo, 47) : null}
            </View>
            <View style={styles.messageText}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTitle}>
                  {this.state.nameinit ? 
                  <Text style={styles.titleText} numberOfLines={1}>{getFullName(this.state.senderInfo)}</Text> 
                  : null}
                </View>
                <View style={styles.messageTimeStamp}>
                  <Text style={styles.timeStampText} numberOfLines={1}>{getTimeSince(this.props.chat.timestamp)}</Text>
                </View>
              </View>
              <View style={styles.messageSummary}>
                <View style={styles.summaryText}>
                  <Text style={styles.lastMessageText} numberOfLines={1}>{this.props.chat.lastMessage.text}</Text>
                </View>
                <View style={styles.newBadge}>
                  { this.props.chat.newCount > 0 ?
                    <Badge size= {24} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#25D366', color: '#fff'}}>
                      {this.props.chat.newCount.toString()} 
                    </Badge>
                    : null}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeout>
      );
  }
}