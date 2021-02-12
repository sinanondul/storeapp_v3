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
        messages: [...messageItems],
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
      };


    componentDidMount() {
        this.props.navigation.setOptions({
            title: getFullName(this.props.route.params.senderInfo),
        });
        
    let messagesArray = [];
    const usersRef = firebase.firestore().collection("users").where('id', 'in', [this.props.route.params.senderInfo.id.toString()]);
    const messagesRef = usersRef.collectionGroup('messages').where('id', 'in', [this.props.route.params.senderInfo.id]);
    const unsubscribe = messagesRef
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        let senderId= snapshot.getRef().getParent().getParent().data().id;
        let senderInfo = null;
        if (senderId == this.props.userData.uid) {
          senderInfo = this.props.userData;
        } else {
          senderInfo = this.props.route.params.senderInfo;
        }

        changes.forEach((change) => {
          if (change.type === 'added') {
            const newMessage = change.doc.data();
            const newMessageData = {
              _id: change.doc.id,
              text: newMessage.text,
              createdAt: newMessage.timestamp,
              user: {
                _id: senderInfo.uid,
                name: senderInfo.name,
              },
            }
            messagesArray.push(newPostData);
          }
        });
        this.setState({posts: postsArray});
      });
    }
    
    onSend (messages) {
      Fire.shared
      .addMessage({
        senderId: this.props.userData.uid,
        text: messages[0].text,
        targetId: this.props.route.params.senderInfo.id,
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
