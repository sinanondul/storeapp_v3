import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Avatar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import UserItem from './UserItem';
import styles from './styles';

import firebase from 'firebase';

const searchText = "a"
const usersRef = firebase.firestore().collection('users');

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default class AddChatScreen extends React.Component
{
    state={
        userInfos: []
    }

    renderItem = ({item}) => {
        return (<UserItem {...this.props} userInfo={item}/>);
    }

    componentDidMount() {
        let usersArray = [];
        const limitString = searchText.replace(/.$/, nextChar(searchText.charAt(searchText.length - 1)));
        Alert.alert(limitString);
        var getUsers = new Promise((resolve, reject) => {
            usersRef
              .where('name', '>=', searchText)
              .where('name', '<', limitString)
              .get()
              .then((snapshot) => {
                snapshot.forEach((firestoreDocument) =>{
                    
                    var userData = firestoreDocument.data();
                    const userInfo = {
                        uid: userData.id,
                        name: userData.name,
                        surename: userData.surename,
                        fullName: userData.fullName,
                        avatar: userData.avatar
                    }
                    if (userData.id !== this.props.userData.uid) {
                        usersArray.unshift(userInfo);
                    }
                })
                resolve();
              })
        });
        getUsers.then(() => {
            this.setState({userInfos: usersArray});
        });
    }
  
    render(){

        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.userInfos.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0))}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                ></FlatList>
            </View>
        );
    }

    static navigationOptions = {
        title: "New Chat",
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