import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import moment from 'moment';
import Fire from '../../firebase/Fire';
import firebase from 'firebase';
import ChatItem from './ChatItem';


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
    firebase
      .firestore()
      .doc()
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={chats.sort((a, b) => b.timestamp - a.timestamp)}
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

