import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../firebase/Fire";
import {Avatar} from "react-native-paper";
import moment from 'moment';

import { openDrawer } from "../../../App";
import styles, {feedItemStyles} from "./styles";

const usersRef = firebase.firestore().collection("users");

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

function getDate(timestamp){
  var formattedTimestamp = new Date(Number(timestamp));
  return ((formattedTimestamp.getDate()).toString() + "/" + (formattedTimestamp.getMonth()).toString() + "/" + (formattedTimestamp.getFullYear()).toString());
}

function getTime(timestamp){
  var formattedTimestamp = new Date(Number(timestamp));
  return ((formattedTimestamp.getHours()).toString() + ":" + (formattedTimestamp.getMinutes()).toString());
}

function getTimeSince(timestamp){
  return moment(timestamp).fromNow();
}


class FeedItem extends React.Component {
  constructor(props) {
    super(props)
  }

  state= {
    senderInfo: {
      name: null,
      surename: null,
      avatar: null,
    },
    nameinit: false,
  }


  componentDidMount() {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(this.props.post.senderId)
      .get()
      .then((firestoreDocument) => {
        var userData = firestoreDocument.data();
        this.setState({ senderInfo: {
          name: userData.name,
          surename: userData.surename,
          avatar: userData.avatar,
        }})
        this.setState({nameinit: true})
      })
  }


  render(){
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View style={styles.feedHeader}>
            <View style = {styles.userAvatar}>
              {this.state.nameinit ? getAvatar(this.state.senderInfo) : null}
            </View>
            <View style = {styles.userText}>
              {this.state.nameinit ? <Text style={styles.name}>{getFullName(this.state.senderInfo)}</Text> : null}
              <Text style={styles.timestamp}>{getTimeSince(this.props.post.timestamp)}</Text>
            </View>
            <View style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#73788"/>
            </View>
          </View>

          <View style = {styles.mainText}>
            <Text style={styles.post}>{this.props.post.text}</Text>
          </View>
          <View>
            {this.props.post.image != null ? <Image
              source={{uri: this.props.post.image}}
              style={styles.postImage}
              resizeMode="cover"
            /> : null}
          </View>
        </View>
      </View>
    );
  };
}

export default class LandingScreen extends React.Component {
  state = {
    posts: [],
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({item}) => {
    return (<FeedItem post={item}/>);
  }

  componentDidMount() {
    let postsArray = [];
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          if (change.type === 'added') {
            const newPost = change.doc.data();
            const newPostData = {
              id: change.doc.id,
              name: newPost.name,
              text: newPost.text,
              timestamp: newPost.timestamp,
              image: newPost.image,
              senderId: newPost.uid
            }
            postsArray.unshift(newPostData);
          }
        });
        this.setState({posts: postsArray});
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }

  static navigationOptions = {
    title: <Text>Home</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#ffff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    headerLeft: () => (
      <Icon
        name={Platform.OS === "ios" ? "ios-menu-outline" : "md-menu"}
        style={{ marginLeft: 10 }}
        size={40}
        color="#ffff"
        onPress={() => openDrawer()}
      />
    ),
  };
}
