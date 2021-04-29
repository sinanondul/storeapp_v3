import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import Swipeout from 'react-native-swipeout';
import firebase from 'firebase';
import moment from 'moment';

import {getGroupChatName, getGroupChatAvatar} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../styles";
import {GroupChatItemStyles as pageStyles} from './styles';

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

const rightButtons = [
  <TouchableOpacity style={pageStyles.deleteButton}>
    <Text style={pageStyles.deleteText}>
      Delete
    </Text>
  </TouchableOpacity>
];


export default class GroupChatItem extends React.Component{

  constructor(props) {
    super(props)

  }

  state= {
    rightActivated: false,
  }

  componentDidMount() {

  }

  swipeButtons = [{
    text: 'Leave',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {this.deleteGroupChat()},
  }];

  deleteGroupChat() {
    const userRef = firebase.firestore().collection('users').doc(this.props.userData.uid);
    const chatRef = userRef.collection('chats').doc(this.props.chat.id);
    const chatHeaderRef = firebase.firestore().collection('chats').doc(this.props.chat.id);
    chatHeaderRef.get().then(chatHeaderDoc => {
      let chatHeader = chatHeaderDoc.data();
      chatHeader.participantIds[this.props.userData.uid] = false;

      //Checking if any participants left.
      let anyLeft = false;
      Object.keys(chatHeader.participantIds).forEach(participantId => {
        if (chatHeader.participantIds[participantId]) {
          anyLeft = true;
        }
      })

      if (!anyLeft) {
        chatHeaderRef.delete();
      }
      else {
        let admins = chatHeader.groupChatInfo.admins;
        const index = admins.findIndex(
          (item) => item === this.props.userData.uid
        );
        if (index >= 0) {
          admins.splice(index, 1);
        }
        if (admins.length <= 0) {
          Object.keys(chatHeader.participantIds).forEach(participantId => {
            if (chatHeader.participantIds[participantId] && admins.length <= 0) {
              admins.push(participantId);
            }
          })
        }
        chatHeaderRef.set({participantIds: chatHeader.participantIds, groupChatInfo: chatHeader.groupChatInfo}, {merge: true});
      }
    })
    Fire.shared.deleteCollection(chatRef, 'messages');
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
              return(this.props.navigation.navigate('Messaging', {chat: this.props.chat}));}
            } 
            style={styles.messageItem}
          >
            <View style={styles.messageAvatar}>
              {getGroupChatAvatar(this.props.chat.groupChatInfo, 47)}
            </View>
            <View style={styles.messageText}>
              <View style={styles.messageHeader}>
                <View style={styles.messageTitle}>
                  <Text style={styles.titleText} numberOfLines={1}>{getGroupChatName(this.props.chat.groupChatInfo)}</Text> 
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