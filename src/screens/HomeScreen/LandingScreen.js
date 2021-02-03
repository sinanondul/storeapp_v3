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
import { openDrawer } from "../../../App";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../firebase/Fire";
import {Avatar} from "react-native-paper";
import moment from 'moment';

const usersRef = firebase.firestore().collection("users");

function getFullName(info){
  return info.name + " " + info.surename;
}

function getAvatarTag(info){
    return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}

function getAvatar(info){
  if (!(info.avatar == null)) {
    return(<Avatar.Image size={40} source={info.avatar}/>);
  }
  else {
    return(<Avatar.Text size={40} label={getAvatarTag(info)} marginLeft={0} style={{backgroundColor: "#f4511e"}}/>);
  }
}

function getTimeSince(timestamp){
  return moment().utc(timestamp).local().startOf('days').fromNow();
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
          
          <Image
            source={{uri: this.props.post.image}}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };
}

export default class LandingScreen extends React.Component {
  state = {
    posts: [],
    postsInited: false,
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change =>{
          var doc = change.doc.data()
          if (change.type === 'added') {
            var postArray = [...this.state.posts]
            const data = {
              name: doc.name,
              text: doc.text,
              timestamp: doc.timestamp,
              image: doc.image,
              senderId: doc.uid
            }
            postArray.push(data);
            this.setState({posts: postArray});
          } else if (change.type == 'removed') {
            var postArray = [...this.state.posts]
            var index = postArray.findIndex(x => x.id === doc.id)
            if (index !== -1) {
              postArray.splice(index, 1);
              this.setState({posts: postArray});
            }
          }
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.feed}
          data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={({item}) => <FeedItem post = {item}/>}
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
