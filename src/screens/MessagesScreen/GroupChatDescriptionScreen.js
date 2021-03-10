import React, {useCallback} from "react";
import {View, ScrollView, Platform, Header, Text, TouchableOpacity, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {HeaderBackButton} from "@react-navigation/stack";


import Fire from "../../firebase/Fire";
import firebase from 'firebase';

import {getFullName, getAvatar, getGroupChatName, getGroupChatAvatar} from "../../functions/UserInfoFormatter";
import ParticipantListItem from './components/ParticipantListItem';
import styles, {GroupChatDescriptionScreenStyles as pageStyles} from "./styles";


export default class GroupChatDescriptionScreen extends React.Component{
    
    
    state={
        userInfos: []
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
      };

    componentDidMount() {
        //Setting navigation options.
        this.props.navigation.setOptions({
            headerTitle: () => (
            <View style={styles.headerTitleContainer}>
                <View style={styles.headerAvatar}>
                { this.props.route.params.chat.groupChatInfo
                    ? getGroupChatAvatar(this.props.route.params.chat.groupChatInfo)
                    : getAvatar(this.props.route.params.senderInfo)
                }
                </View>

                <Text style={styles.headerText}>
                { this.props.route.params.chat.groupChatInfo
                    ? getGroupChatName(this.props.route.params.chat.groupChatInfo)
                    : getFullName(this.props.route.params.senderInfo) 
                }
                </Text>
            </View>
            ),
        });
        //Getting user infos.
        var youItem = this.props.userData;
        youItem.fullName = 'you';
        let usersArray = [youItem];
        const usersRef = firebase.firestore().collection('users');
        var getUsers = new Promise((resolve, reject) => {
            usersRef
            .where('id', 'in', this.props.route.params.chat.participantIds)
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

    componentWillUnmount() {
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                onPress={() => {
              }}
            >
                <ParticipantListItem {...this.props} userInfo={item}/>
            </TouchableOpacity>
        );
    }

    render() {
        return(
            <ScrollView style={{flex: 1}}>
                <View style={pageStyles.headerContainer}>

                </View>
                <View style={pageStyles.participantListContainer}>
                    <Text style={pageStyles.participantsTitle}>
                        {this.props.route.params.chat.participantIds.length.toString() + " participants"}
                    </Text>
                    <FlatList
                        data={this.state.userInfos.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0))}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                </View>
                <TouchableOpacity style={pageStyles.leaveGroupContainer} onPress={() => {}}>
                    <View style={pageStyles.leaveGroupIcon}>
                        <Icon
                            name={Platform.OS === "ios" ? "ios-exit-outline" : "md-exit-outline"}
                            size={30}
                            color="#D00000"
                            style={{
                            }}
                        />
                    </View>
                    <Text style={pageStyles.leaveGroupText}>
                        Leave group
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    static navigationOptions = {
        title: "Test",
        headerStyle: {
          backgroundColor: "#2890cf",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          flex: 0.6,
          alignSelf: 'center', 
          alignItems: 'center',
          fontWeight: 'bold',
        },
    };
}
