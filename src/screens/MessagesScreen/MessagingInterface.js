import React from "react";
import {View, Platform, Header, Text, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";
import {Avatar} from "react-native-paper";
import {GiftedChat} from "react-native-gifted-chat";

const messageItems = [
    {
        id: "1",
        text: "My first message.",
        created_at: new Date(1612443350116),
        user: {
            _id: "qVBhL18fjISoYhxRBjXfa6iynXR2",
            name: 'Adam Bronze',
            avatar: null,
        }
    }
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

export default class MessagingInterface extends React.Component{
    
    
    state={
        messages: [],
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
      };


    componentDidMount() {
        this.props.navigation.setOptions({
            title: getFullName(this.props.route.params.senderInfo),
        });

    }

    render() {
        return(
            <GiftedChat
                messages={messageItems}
            />
        );
    }

    static navigationOptions = {
        title: "Test",
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

const styles = {
    container: {
      flex: 1
    },
  
    header_right: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around"
    },
    header_button_container: {
      marginRight: 10
    },
    header_button_text: {
      color: '#FFF'
    },
  
    modal: {
      flex: 1,
      backgroundColor: '#FFF'
    },
    close: {
      alignSelf: 'flex-end',
      marginBottom: 10
    },
    modal_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    modal_header_text: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    modal_body: {
      marginTop: 20,
      padding: 20
    },
  
    list_item_body: {
      flex: 1,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    list_item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    list_item_text: {
      marginLeft: 10,
      fontSize: 20,
    },
    inline_contents: {
      flex: 1,
      flexDirection: 'row'
    },
    status_indicator: {
      width: 10,
      height: 10,
      alignSelf: 'center',
      borderRadius: 10,
    },
    online: {
      backgroundColor: '#5bb90b'
    },
    offline: {
      backgroundColor: '#606060'
    },
  }