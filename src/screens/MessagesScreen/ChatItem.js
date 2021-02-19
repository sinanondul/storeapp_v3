import React from 'react';
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import firebase from 'firebase';

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
  return (
    formattedTimestamp.getHours().toString() +
    ":" +
    formattedTimestamp.getMinutes().toString()
  );
}


export default class ChatItem extends React.Component{

    state= {
        senderInfo: null,
        nameinit: false,
    }


    componentDidMount() {
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
        return (
            <TouchableOpacity onPress={() => {return(this.props.navigation.navigate('Messaging', {senderInfo: this.state.senderInfo, chat: this.props.chat}));}} style={styles.messageItem}>
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
                    <Text style={styles.timeStampText} numberOfLines={1}>{getTime(this.props.chat.timestamp)}</Text>
                  </View>
                </View>
                <View style={styles.messageSummary}>
                  <Text style={styles.summaryText} numberOfLines={1}>{this.props.chat.lastMessage}</Text>
                </View>
              </View>
            </TouchableOpacity>
        );
    }
}