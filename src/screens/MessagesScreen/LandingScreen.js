import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Avatar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import moment from 'moment';

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
                  {this.props.navigation.navigate("AddChat");}
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

