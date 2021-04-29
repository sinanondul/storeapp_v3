import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Searchbar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import Fire from '../../firebase/Fire';
import firebase from 'firebase';

import AddGroupChatButton from './components/AddGroupChatButton';
import UserItem from './components/UserItem';
import styles from './styles';


const usersRef = firebase.firestore().collection('users');

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default class AddChatScreen extends React.Component
{
    state={
        userInfos: [],
        searchQuery: '',
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onPress={() => {
                    Fire.shared.addChat({participantIds: [this.props.userData.uid, item.uid], creatorInfo: this.props.userData})
                    .then((chatInfo) => {
                    this.props.navigation.goBack();
                    this.props.navigation.navigate('Messaging', {senderInfo: item, chat: chatInfo});
                })
              }}
            >
                <UserItem {...this.props} userInfo={item}/>
            </TouchableOpacity>
        );
    }

    onChangeSearch = (searchText => {
        if (searchText.length > 0) {
            let usersArray = [];
            const lowerText = searchText.toLowerCase()
            const limitString = lowerText.replace(/.$/, nextChar(lowerText.charAt(lowerText.length - 1)));
            var getUsers = new Promise((resolve, reject) => {
                usersRef
                .where('fullName', '>=', lowerText.toLowerCase())
                .where('fullName', '<', limitString)
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
        else {
            this.setState({userInfos: []})
        }
        this.setState({searchQuery: searchText});
    })

    componentDidMount() {
       
    }
  
    render(){

        return(
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                />
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('AddGroupChat')}}>
                    <AddGroupChatButton />
                </TouchableOpacity>
                <FlatList
                    data={this.state.userInfos.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0))}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
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
          paddingRight: Platform.OS === "ios" ? 0 : 60,
          alignSelf: 'center', 
          alignItems: 'center',
          fontWeight: 'bold',
        },
    };
}