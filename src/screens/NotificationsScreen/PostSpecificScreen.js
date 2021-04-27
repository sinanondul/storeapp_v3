import React from "react";
import {
  View,
  Platform,
  Header,
  Text,
  StyleSheet,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import firebase from "firebase";
import InteractiveBar from "../../screens/HomeScreen/components/InteractiveBar";
import {
  getAvatar,
  getFullName,
  getHandle,
  //getTimeSince,
} from "../../functions/UserInfoFormatter";
import moment from "moment";
import AnotherFeedItem from "../HomeScreen/components/AnotherFeedItem";
//import YetAnotherFeedItem from "../HomeScreen/components/YetAnotherFeedItem";
function getTimeSince(timestamp) {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "now",
      ss: "%d",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      w: "1w",
      ww: "%dw",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%d",
    },
  });
  return moment(timestamp).fromNow();
}

export default class PostSpecificScreen extends React.Component {
  state = {
    // user
    senderInfo: {
      uid: "",
      email: "",
      fullName: "",
      name: "",
      surename: "",
      avatar: "",
      handle: "",
      department: "",
      about: "",
      phone: "",
      location: "",
      myPosts: "",
      favPosts: "",
      upedPosts: "",
      following: "",
      followers: "",
      token: "",
    },
    post: {
      // comments: {
      //   senderId: "",
      //   text: "",
      //   timestamp: "",
      //   upCount: "",
      // },
      // commentCount: 0,
      // image: "",
      // text: "",
      // timestamp: "",
      // uid: "",
      // upCount: 0,
    },

    nameinit: false,
  };

  componentDidMount() {
    const postId = this.props.route.params.notification.targetInfo.postId;
    const usersRef = firebase.firestore().collection("users");
    const postRef = firebase.firestore().collection("posts").doc(postId);

    postRef.get().then((doc) => {
      this.setState({
        post: {
          // comments: {
          //   senderId: doc.data().commentCount,
          //   text: doc.data().text,
          //   timestamp: doc.data().timestamp,
          //   upCount: doc.data().upCount,
          // },
          commentCount: doc.data().commentCount,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          uid: doc.data().uid,
          upcount: doc.data().uid,
        },

        nameinit: true,
      });

      // usersRef
      //   .doc(doc.data().uid)
      //   .get()
      //   .then((firestoreDocument) => {
      //     var userData = firestoreDocument.data();
      //     this.setState({
      //       senderInfo: {
      //         uid: userData.id,
      //         email: userData.email,
      //         fullName: userData.fullName,
      //         name: userData.name,
      //         surename: userData.surename,
      //         avatar: userData.avatar,
      //         handle: userData.handle,
      //         department: userData.department,
      //         about: userData.about,
      //         phone: userData.phone,
      //         location: userData.location,
      //         myPosts: userData.myPosts,
      //         favPosts: userData.favPosts,
      //         upedPosts: userData.upedPosts,
      //         following: userData.following,
      //         followers: userData.followers,
      //         token: userData.token,
      //       },
      //     });
      //     this.setState({ nameinit: true });
      //   });
    });

    //Alert.alert("dısj");
    //const usersRef = firebase.firestore().collection("users");
  }
  render() {
    //console.log(this.state.post);
    if (this.state.post) {
      console.log(this.state.post);
      return (
        <View style={{ flex: 1, borderWidth: 2 }}>
          {this.state.post ? (
            <AnotherFeedItem
              {...this.props}
              post={this.state.post}
              //user={this.state.senderInfo}
              profileRoute={"ProfileFromProfile"}
              //ownerId={this.props.ownerId}
              toggleCommentsModal={this.props.toggleCommentsModal}
            />
          ) : null}
        </View>
      );
    }
  }
}
