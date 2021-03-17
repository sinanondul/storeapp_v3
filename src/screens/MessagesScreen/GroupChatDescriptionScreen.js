import React, {useCallback} from "react";
import {View, ScrollView, Platform, Header, Text, TouchableOpacity, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {HeaderBackButton} from "@react-navigation/stack";


import Fire from "../../firebase/Fire";
import firebase from 'firebase';

import {getFullName, getAvatar, getGroupChatName, getGroupChatAvatar} from "../../functions/UserInfoFormatter";
import ParticipantListItem from './components/ParticipantListItem';
import ParticipantItemDialog from './components/ParticipantItemDialog';
import GroupImage from './components/GroupImage';
import styles, {GroupChatDescriptionScreenStyles as pageStyles} from "./styles";


export default class GroupChatDescriptionScreen extends React.Component{
    
    constructor(props) {
        super(props)
    
        this.toggleDialog = this.toggleDialog.bind(this)
    }
    
    state={
        userInfos: [],
        showParticipantDialog: false,
        amAdmin: false,
        dialogTarget: null,
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
        const amAdmin = this.props.route.params.chat.groupChatInfo.admins.includes(this.props.userData.uid)
        this.setState({amAdmin: amAdmin});
        var youItem = {
            uid: this.props.userData.uid,
            name: this.props.userData.name,
            surename: this.props.userData.surename,
            fullName: 'you',
            avatar: this.props.userData.avatar,
            isAdmin: amAdmin,
        }
        youItem.fullName = 'you';
        let usersArray = [];
        const usersRef = firebase.firestore().collection('users');
        var getUsers = new Promise((resolve, reject) => {
            usersRef
            .where('id', 'in', this.props.route.params.chat.participantIds)
            .get()
            .then((snapshot) => {
                snapshot.forEach((firestoreDocument) =>{
                    
                    var userData = firestoreDocument.data();
                    var isAdmin = this.props.route.params.chat.groupChatInfo.admins.includes(userData.id);
                    const userInfo = {
                        uid: userData.id,
                        name: userData.name,
                        surename: userData.surename,
                        fullName: userData.fullName,
                        avatar: userData.avatar,
                        isAdmin: isAdmin,
                    }
                    if (userData.id !== this.props.userData.uid) {
                        usersArray.unshift(userInfo);
                    }
                })
                resolve();
            })
        });
        getUsers.then(() => {
            usersArray = usersArray.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
            usersArray.unshift(youItem);
            this.setState({userInfos: usersArray});
        });
     
    }

    componentWillUnmount() {
    }

    toggleDialog () {
        this.setState({showParticipantDialog: !this.state.showParticipantDialog});
    }

    renderItem = ({item}) => {
        const ownItem = item.uid === this.props.userData.uid;
        return (
            ownItem
            ?   <View>
                    <ParticipantListItem {...this.props} userInfo={item}/>
                </View>
            :   <TouchableOpacity 
                    onPress={() => {
                        this.setState({dialogTarget: item})
                        this.toggleDialog();
                    }}
                >
                    <ParticipantListItem {...this.props} userInfo={item}/>
                </TouchableOpacity>
            
            
        );
    }

    render() {
        const chat = this.props.route.params.chat;
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={pageStyles.headerContainer}>
                        <GroupImage groupChatInfo={chat.groupChatInfo}/>
                    </View>
                    <View style={pageStyles.participantListContainer}>
                        <Text style={pageStyles.participantsTitle}>
                            {this.props.route.params.chat.participantIds.length.toString() + " participants"}
                        </Text>
                        <FlatList
                            data={this.state.userInfos}
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
                {   this.state.showParticipantDialog
                    ?   <ParticipantItemDialog 
                            toggleDialog={this.toggleDialog} 
                            amAdmin={this.state.amAdmin} 
                            target={this.state.dialogTarget} 
                            chatId={this.props.route.params.chat.id}
                        /> 
                    :   null
                }

            </View>
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
