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
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import firebase from "firebase";
import {
  getAvatar,
  getFullName,
  getHandle,
  //getTimeSince,
} from "../../functions/UserInfoFormatter";
import moment from "moment";
import FeedItem from "./components/FeedItem";
import CommentsList from "./components/CommentsList";
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
    post: null,

    nameinit: false,
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    const postId = this.props.route.params.notification.targetInfo.postId;
    const usersRef = firebase.firestore().collection("users");
    const postRef = firebase.firestore().collection("posts").doc(postId);

    postRef.get().then((postDoc) => {
      const postData = postDoc.data();
      const uped = postDoc.id in this.props.userData.upedPosts;
      const faved = postDoc.id in this.props.userData.favPosts;
      this.setState({
        post: {
          id: postDoc.id,
          name: postData.name,
          text: postData.text,
          timestamp: postData.timestamp,
          image: postData.image,
          senderId: postData.uid,
          upCount: postData.upCount,
          comments: postData.comments,
          commentCount: postData.commentCount,
          uped: uped,
          faved: faved,
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
  }
  render() {
    //console.log(this.state.post);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 90}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          {this.state.post ? (
            <FeedItem
              {...this.props}
              post={this.state.post}
              //user={this.state.senderInfo}
              profileRoute={"ProfileFromFeed"}
              //ownerId={this.props.ownerId}
            />
          ) : null}

          {this.state.post ? (
            <CommentsList {...this.props} post={this.state.post} />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  static navigationOptions = {
    title: <Text style={{ alignSelf: "center", paddingTop: 2 }}>Post</Text>,
    headerStyle: {
      backgroundColor: "#2890cf",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: Platform.OS === "ios" ? 0 : 60,

      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}
