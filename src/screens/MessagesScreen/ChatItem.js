import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar, Badge, withBadge} from "react-native-paper";
import firebase from 'firebase';
import moment from 'moment';

import Fire from "../../firebase/Fire";
import styles from "./styles";

function getFullName(info){
    return info.name + " " + info.surename;
}

function getAvatarTag(info){
    return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}

function getAvatar(info){
    if (!(info.avatar == null)) {
        return(<Avatar.Image size={40} marginLeft = {0} source={info.avatar}/>);
    }
    else {
        return(<Avatar.Text size={40} label={getAvatarTag(info)} marginLeft={0} style={{backgroundColor: "#f4511e"}}/>);
    }
}

function getTime(timestamp) {
  var formattedTimestamp = new Date(Number(timestamp));
  var hourString = formattedTimestamp.getHours().toString();
  var minuteString = formattedTimestamp.getMinutes().toString();

  if (hourString.length == 1) hourString = "0" + hourString;
  if (minuteString.length == 1) minuteString = "0" + minuteString;
  return hourString + ":" + minuteString;
}

function getTimeSince(timestamp) {
  moment.updateLocale('en', {
    calendar : {
        lastDay : '[Yesterday]',
        sameDay : 'hh:mm',
        nextDay : '[Tomorrow]',
        lastWeek : 'ddd',
        nextWeek : 'ddd',
        sameElse : 'L'
    }
  });

  return moment(timestamp).calendar();
}


export default class ChatItem extends React.Component{

  constructor(props) {
    super(props)

  }

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
                id: senderId,
                name: userData.name,
                surename: userData.surename,
                avatar: userData.avatar,
            }})
            this.setState({nameinit: true})
        })
  }

  render(){
    const userId = this.props.userData.uid;
    const chatId = this.props.chat.id;
      return (
          <TouchableOpacity 
            onPress={() => {
              Fire.shared.resetNewCount({uid: userId, chatId: chatId});
              return(this.props.navigation.navigate('Messaging', {senderInfo: this.state.senderInfo, chat: this.props.chat}));}
            } 
            style={styles.messageItem}>
            <View style={styles.messageAvatar}>
              {this.state.nameinit ? getAvatar(this.state.senderInfo) : null}
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
                  <Text style={styles.lastMessageText} numberOfLines={1}>{this.props.chat.lastMessage}</Text>
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
      );
  }
}