import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Platform} from "react-native";
import {Searchbar} from "react-native-paper";
import { createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import ChosenUsersDisplay from './components/ChosenUsersDisplay';
import UserItem from './components/UserItem';
import BottomRightButton from '../../components/BottomRightButton';
import styles from './styles';

import firebase from 'firebase';

const usersRef = firebase.firestore().collection('users');

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default class AddGroupChatScreen extends React.Component
{
    constructor(props) {
        super(props)
    
        this.removeParticipant = this.removeParticipant.bind(this)
    }

    state={
        participants: [],
        userInfos: [],
        searchQuery: '',
    }

    renderItem = ({item}) => {
        var participantsArray = this.state.participants;
        return (
            <TouchableOpacity 
                onPress={() => {
                    participantsArray.unshift(item);
                    this.setState({participants: participantsArray});
                }}
            >
                <UserItem {...this.props} userInfo={item}/>
            </TouchableOpacity>
        );
    }
    
    removeParticipant = (uid) => {
        var participantsArray = this.state.participants;
        const index = participantsArray.findIndex(participant => participant.uid === uid);
        if (index > -1) {
            participantsArray.splice(index, 1);
        }
        this.setState({participants: participantsArray});
    }

    onChangeSearch = (searchText => {
        if (searchText.length > 0) {
            let usersArray = [];
            const lowerText = searchText.toLowerCase();
            const limitString = lowerText.replace(/.$/, nextChar(lowerText.charAt(searchText.length - 1)));
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
        const difference = this.state.userInfos.filter(user => !this.state.participants.some(participant => user.uid === participant.uid));
        return(
            <View style={styles.container}>
                {   this.state.participants && this.state.participants.length > 0
                    ?   <ChosenUsersDisplay {...this.props} 
                            participants={this.state.participants}
                            participantsRemoveable={true} 
                            removeParticipant={this.removeParticipant}
                        />
                    : null
                }

                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                />
                <FlatList
                    data={difference.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0))}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                />
                {   this.state.participants && this.state.participants.length > 0
                    ?   <BottomRightButton {...this.props} 
                            name={Platform.OS === "ios" ? "ios-checkmark-circle" : "md-checkmark-circle"} 
                            onPress={() => {
                                this.props.navigation.navigate("CustomizeGroupChat", {participants: this.state.participants});
                            }}
                        />
                    : null
                }
            </View>
        );
    }

    static navigationOptions = {
        title: "Add participants...",
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