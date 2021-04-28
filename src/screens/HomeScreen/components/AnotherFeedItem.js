import React from "react";
import {
  View,
  Platform,
  Text,
  tempstylesheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../../firebase/Fire";
import { Avatar } from "react-native-paper";
import { Image } from "react-native-expo-image-cache";
import moment from "moment";

import {
  getFullName,
  getAvatar,
  getHandle,
} from "../../../functions/UserInfoFormatter";
import CommentsSection from "./CommentsSection";
import InteractiveBar from "./InteractiveBar";
import tempstyles from "./tempstyles";
//import styles from "../../LoginScreen/styles";

const usersRef = firebase.firestore().collection("users");

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

export default class AnotherFeedItem extends React.Component {
  state = {
    senderInfo: {},
    nameinit: false,
    commentsModalOpen: true,
  };

  componentDidMount() {
    if (this.props.post) {
      const userID = this.props.post.uid;
      //console.log(this.props.post);
      //alert(userID);
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(userID)
        .get()
        .then((firestoreDocument) => {
          var userData = firestoreDocument.data();
          this.setState({
            senderInfo: {
              uid: userData.id,
              email: userData.email,
              fullName: userData.fullName,
              name: userData.name,
              surename: userData.surename,
              avatar: userData.avatar,
              handle: userData.handle,
              department: userData.department,
              about: userData.about,
              phone: userData.phone,
              location: userData.location,
              myPosts: userData.myPosts,
              favPosts: userData.favPosts,
              upedPosts: userData.upedPosts,
              following: userData.following,
              followers: userData.followers,
              token: userData.token,
            },
          });
          this.setState({ nameinit: true });
        });

      // const commentsRef = firebase.firestore
      //   .collection("posts")
      //   .doc(this.props.post.uid)
      //   .collection("comments")
      //   .get()
      //   .then((doc) => {
      //     this.setState({
      //       comments: {
      //         senderId: doc.data().senderId,
      //         text: doc.data().upCount,
      //         timestamp: doc.data().timestamp,
      //         upCount: doc.data().upCount,
      //       },
      //     });
      //   });
    }
  }

  render() {
    if (this.state.senderInfo != null) {
      console.log(this.state.senderInfo);
      //alert(this.state.senderInfo.fullName);
      return (
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={{ padding: 12 }}>
            <View style={tempstyles.feedItem}>
              <View style={tempstyles.rowView}>
                <View>
                  <TouchableOpacity>
                    {this.state.nameinit
                      ? getAvatar(this.state.senderInfo, 50)
                      : null}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                // disabled={this.props.post.senderId === this.props.ownerId}
                // onPress={() => {
                //   this.props.navigation.navigate(this.props.profileRoute, {
                //     userInfo: this.state.senderInfo,
                //     otherProfile: true,
                //     ownerId: this.props.post.senderId,
                //   });
                // }}
                >
                  <View style={tempstyles.userText}>
                    {this.state.nameinit ? (
                      <Text style={tempstyles.name}>
                        {getFullName(this.state.senderInfo)}
                      </Text>
                    ) : null}

                    <Text style={tempstyles.handle}>
                      {"@" + this.state.senderInfo.handle}
                    </Text>

                    <Text style={tempstyles.timestamp}>
                      {getTimeSince(this.props.post.timestamp)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View>
                  {this.props.post.text && this.props.post.text !== "" ? (
                    <View style={tempstyles.mainText}>
                      <Text style={tempstyles.post}>
                        {this.props.post.text}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={tempstyles.postImage}>
                  {this.props.post.image ? (
                    <Image
                      {...{ uri: this.props.post.image }}
                      resizeMode={"contain"}
                      style={tempstyles.postImage2}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ borderWidth: 1 }}>
                <InteractiveBar
                  userData={this.props.userData}
                  post={this.props.post}
                />
              </View>
            </View>

            <CommentsSection {...this.props} post={this.props.post} />
          </View>
        </ScrollView>
      );
    }
    //if (this.state.senderInfo) {

    // }
  }
}
