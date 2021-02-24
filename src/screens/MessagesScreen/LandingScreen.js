import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Avatar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';


import Fire from '../../firebase/Fire';
import firebase from 'firebase';
import ChatItem from './ChatItem';


import MessagingInterface from "./MessagingInterface";
import styles from "./styles";

export default class LandingScreen extends React.Component{

  state={
    chats: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({item}) => {
    return (<ChatItem {...this.props} chat={item}/>);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton tintColor={"#fff"} onPress = {() => {this.props.navigation.goBack()}}/>
        ),
      });
      
      
    let chatsArray = [];
    
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .collection("chats")
      .onSnapshot((snapshot) => {
        
        let changes = snapshot.docChanges();
        var getChats = new Promise((resolve, reject) => {
          changes.forEach((change, index, array) => {
            
            if (change.type === "added") {
              const newChatRef = change.doc.data();
              firebase
              .firestore()
              .collection("chats")
              .doc(newChatRef.id)
              .get()
              .then((firestoreDocument) => {
                  var newChatData = firestoreDocument.data();
                  const newChatItem = {
                    id: newChatRef.id,
                    timestamp: newChatRef.lastTimestamp,
                    new: newChatRef.new,
                    newCount: newChatRef.newCount,
                    participantIds: newChatData.participantIds,
                    lastMessage: newChatData.lastMessage,
                    chatInfo: newChatData.chatInfo
                  };

                  //Adding to array
                  chatsArray.unshift(newChatItem);
                  
                  if (index === array.length -1) resolve();
                })
            }
            else if (change.type === "modified") {
              const newChatRef = change.doc.data();
              firebase
              .firestore()
              .collection("chats")
              .doc(newChatRef.id)
              .get()
              .then((firestoreDocument) => {
                var newChatData = firestoreDocument.data();
                const newChatItem = {
                  id: newChatRef.id,
                  timestamp: newChatRef.lastTimestamp,
                  new: newChatRef.new,
                  newCount: newChatRef.newCount,
                  participantIds: newChatData.participantIds,
                  lastMessage: newChatData.lastMessage,
                  chatInfo: newChatData.chatInfo
                };

                //Modifying previously added chat. 
                const index = chatsArray.findIndex((item) => item.id === newChatItem.id)
                chatsArray[index] = newChatItem;
                
                if (index === array.length -1) resolve();
              })
            }
          });
        });

        getChats.then(() => {
          this.setState({ chats: chatsArray })
        });
    });

    
  }

  componentWillUnmout() {
    Alert.alert("unmounting");
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.chats.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
        ></FlatList>
        <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:48,
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,
                    height:48,
                    backgroundColor:'#fff',
                    borderRadius:100,
                }}
                onPress={() =>
                  {}
                }
                >
                <Icon 
                  name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
                  size={48} color="#f4511e" />
            </TouchableOpacity>
            
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

