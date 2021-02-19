import React, {useCallback} from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";

import Fire from "../../firebase/Fire";
import firebase from 'firebase';


const messageItems = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: 1612443350116,
      user: {
        _id: "qVBhL18fjISoYhxRBjXfa6iynXR2",
        name: 'Adam Bronze',
      },
    },
    {
      _id: 2,
      text: 'Hello again developer',
      createdAt: 1612635490376,
      user: {
        _id: "qVBhL18fjISoYhxRBjXfa6iynXR2",
        name: 'Adam Bronze',
      },
    }
]

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
        title: getFullName(this.props.route.params.senderInfo),
      });

      //Getting participant info.
      let usersArray = [];

      const usersRef = firebase.firestore().collection("users");
      const participantIds = this.props.route.params.chat.participantIds;
      var foo = new Promise((resolve, reject) => {
        participantIds.forEach((participantId, index, array) => {
          usersRef
          .doc(participantId)
          .get()
          .then((firestoreDocument) => {
            var userData = firestoreDocument.data();
            const userInfo = {
                uid: userData.id,
                name: userData.name,
                surename: userData.surename,
                avatar: userData.avatar
            }
            
            usersArray.unshift(userInfo);
            if (index === array.length -1) resolve();
          })
        });
      });
    
      foo.then(() => {
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
    
    onSend (messages) {
      Fire.shared
      .addMessage({
        senderId: this.props.userData.uid,
        text: messages[0].text,
        chatId: this.props.route.params.chat.id,
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
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          flex: 0.6,
          paddingRight: 60,
          alignSelf: 'center', 
          alignItems: 'center',
          fontWeight: 'bold',
        },
    };
}
