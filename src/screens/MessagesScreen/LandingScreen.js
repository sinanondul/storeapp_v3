import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import moment from 'moment';
import firebase from 'firebase';


import MessagingInterface from "./MessagingInterface";
import styles from "./styles";

const messageItems = [
  {
    id: "1",
    senderId: "qVBhL18fjISoYhxRBjXfa6iynXR2",
    lastMessage: "I'll record a triple double tonight",
    lastTimestamp: 1612443350116,
  },
  {
    id: "2",
    senderId: "n6QtMkM9M1geJGo7C3gXCFIv8Hs1",
    lastMessage: "I'll record a triple double tonight",
    lastTimestamp: 1612446858796,
  },
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

function getTime(timestamp){
    return moment.utc(timestamp).calendar(null,{
        lastDay : '[Yesterday]',
        sameDay : 'LT',
        nextDay : 'L',
        lastWeek : 'L',
        nextWeek : 'L',
        sameElse : 'L'
    })
}

class MessageItem extends React.Component{

    state= {
        senderInfo: {
            name: null,
            surename: null,
            avatar: null,
        },
        nameinit: false,
    }


    componentDidMount() {
        
        const usersRef = firebase.firestore().collection("users");
        usersRef
            .doc(this.props.message.senderId)
            .get()
            .then((firestoreDocument) => {
                var userData = firestoreDocument.data();
                this.setState({ senderInfo: {
                    name: userData.name,
                    surename: userData.surename,
                    avatar: userData.avatar,
                }})
                this.setState({nameinit: true})
            })
    }

    render(){
        return (
            <TouchableOpacity onPress={() => {return(this.props.navigation.navigate('Messaging', {senderInfo: this.state.senderInfo}));}} style={styles.messageItem}>
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
                    <Text style={styles.timeStampText} numberOfLines={1}>{getTime(this.props.message.timestamp)}</Text>
                  </View>
                </View>
                <View style={styles.messageSummary}>
                  <Text style={styles.summaryText} numberOfLines={1}>{this.props.message.lastMessage}</Text>
                </View>
              </View>
            </TouchableOpacity>
        );
    }
}

export default class LandingScreen extends React.Component{

  state={
    messages: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({item}) => {
    return (<MessageItem {...this.props} message={item}/>);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton tintColor={"#fff"} onPress = {() => {this.props.navigation.goBack()}}/>
        ),
      });
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={messageItems.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
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

