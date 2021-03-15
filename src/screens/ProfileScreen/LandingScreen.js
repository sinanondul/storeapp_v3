import React from "react";
import {View, Platform, Text, SafeAreaView, ScrollView, Image, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import {getFullName, getAvatarTag} from "../../functions/UserInfoFormatter";
import { openDrawer } from "../../../App";
import Fire from '../../firebase/Fire';
import styles from "./styles";

function getAvatar(info){
    if (!(info.avatar == null)) {
        return(<Avatar.Image size={140} marginLeft = {0} rounded={false} source={info.avatar}/>);
    }
    else {
        return(<Avatar.Text size={140} label={getAvatarTag(info)} marginLeft={0} rounded={false} style={{backgroundColor: "#f4511e"}}/>);
    }
}

export default class LandingScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return params;
    }

    componentDidMount() {
        
        //Navigation update.
        this.props.navigation.setOptions({
            headerLeft: () => (
                this.props.userData.uid !== this.props.userInfo.uid
                ?   <HeaderBackButton tintColor={"#fff"} onPress = {() => {this.props.navigation.goBack()}}/>
                :   <Icon 
                        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
                        style={{marginLeft:10}}
                        size={40}
                        color='#fff'
                        onPress={() => openDrawer()}
                    />
            )
        });

        //Checking if own profile.
        
    }
    
    render(){
        const otherProfile = this.props.userData.uid !== this.props.userInfo.uid;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}>
                            {getAvatar(this.props.userInfo)}
                        </View>
                        {otherProfile
                            ?   <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                                    <TouchableOpacity style={styles.dm} 
                                        onPress={() => {
                                            Fire.shared.addChat({participantIds: [this.props.userData.uid, this.props.userInfo.uid]})
                                            .then((chatInfo) => {
                                                return(this.props.navigation.navigate('MessagingFromProfile', {senderInfo: this.props.userInfo, chat: chatInfo}));
                                            })
                                        }}
                                    >
                                        <MaterialIcons name="chat" size={18} color="#DFD8C8"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.add}>
                                        <Ionicons name="ios-add" size={36} color="#DFD8C8" style={{ marginTop: 3 }}></Ionicons>
                                    </TouchableOpacity>
                                </View>
                            : null
                        }
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{getFullName(this.props.userInfo)}</Text>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Computer Science</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                            <Text style={[styles.text, styles.subText]}>Posts</Text>
                        </View>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                            <Text style={[styles.text, styles.subText]}>Followers</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                            <Text style={[styles.text, styles.subText]}>Following</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("./assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("./assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("./assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                        </ScrollView>
                        <View style={styles.mediaCount}>
                            <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                            <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                        </View>
                    </View>
                    <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                    Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                    Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
  
    static navigationOptions = {
      title: <Text>Profile</Text>,
      headerStyle: {
        backgroundColor: '#2890cf',
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