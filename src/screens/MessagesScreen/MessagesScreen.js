import React from "react";
import {View, Platform, Header, Text, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from 'firebase';

import styles from "./styles";

const messageItems = [
  {
    id: "1",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "2",
    sender: "Jebron",
    lastMessage: "I'll record a quadruple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "3",
    sender: "Lebron",
    lastMessage: "Cloud Firestore lets you write a variety of data types inside a document, including strings, booleans, numbers, dates, null, and nested arrays and objects. Cloud Firestore always stores numbers as doubles, regardless of what type of number you use in your code.",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "4",
    sender: "Süleymanoğlusüleymanoğlusüleyman",
    lastMessage: "Bi tek ismim uzun zaten",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "5",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "6",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "7",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "8",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "9",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
  {
    id: "10",
    sender: "Lebron",
    lastMessage: "I'll record a triple double tonight",
    timestamp: "31/01/21",
    avatar: require("../../../assets/exavatar1.jpg"),
  },
]

export default class MessagesScreen extends React.Component{
  state ={
    messages: [],
  }


  renderMessage = (message) => {
    return (
      <View style={styles.messageItem}>
        <View style={styles.messageAvatar}>
          <Avatar.Image source={message.avatar} size={50}/>
        </View>
        <View style={styles.messageText}>
          <View style={styles.messageHeader}>
            <View style={styles.messageTitle}>
              <Text style={styles.titleText} numberOfLines={1}>{message.sender}</Text>
            </View>
            <View style={styles.messageTimeStamp}>
              <Text style={styles.timeStampText} numberOfLines={1}>{message.timestamp}</Text>
            </View>
          </View>
          <View style={styles.messageSummary}>
            <Text style={styles.summaryText} numberOfLines={1}>{message.lastMessage}</Text>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(this.props.userData.uid)
    //   .collection('messages')
    //   .orderBy("timestamp", "desc")
    //   .onSnapshot((snapshot) => {
    //     snapshot.docChanges().forEach(change =>{
    //       var doc = change.doc.data();
    //       if (change.type === 'added') {
    //         var messageArray = [...this.state.messages]
    //         const data = {
    //           name: doc.name,
    //           text: doc.text,
    //           timestamp: doc.timestamp,
    //           image: doc.image,
    //           senderId: doc.uid
    //         }
    //         postArray.push(data);
    //         this.setState({messages: messageArray});
    //       } else if (change.type == 'updated') {
            
    //       }
    //       else if (change.type == 'removed') {
    //         var postArray = [...this.state.posts]
    //         var index = postArray.findIndex(x => x.id === doc.id)
    //         if (index !== -1) {
    //           postArray.splice(index, 1);
    //           this.setState({posts: postArray});
    //         }
    //       }
    //     });
    //   });
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={messageItems}
          renderItem={({ item }) => this.renderMessage(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }

  static navigationOptions = {
    title: 'Messages',
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

