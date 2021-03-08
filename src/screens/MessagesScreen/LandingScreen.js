import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Avatar} from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';

import ChatItem from './components/ChatItem';
import GroupChatItem from './components/GroupChatItem';
import BottomRightButton from './components/BottomRightButton';


import MessagingInterface from "./MessagingInterface";
import styles from "./styles";

export default class LandingScreen extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({item}) => {
    return (
      item.groupChatInfo
      ? <GroupChatItem {...this.props} chat={item}/>
      : <ChatItem {...this.props} chat={item}/>
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton tintColor={"#fff"} onPress = {() => {this.props.navigation.goBack()}}/>
        ),
      });
  }

  componentWillUnmount() {
  }

  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.chats.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
        />
        <BottomRightButton {...this.props} 
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"} 
          onPress={() => {this.props.navigation.navigate("AddChat");}}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: 'Messages',
    headerStyle: {
      backgroundColor: "#2890cf",
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

