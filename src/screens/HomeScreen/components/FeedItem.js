import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
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
import CommentsModal from "./CommentsModal";
import InteractiveBar from "./InteractiveBar";
import styles from "../styles";

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

export default class FeedItem extends React.Component {
  state = {
    senderInfo: {
      fullName: null,
      name: null,
      surename: null,
      avatar: null,
      handle: null,
    },
    nameinit: false,
    commentsModalOpen: false,
  };

  componentDidMount() {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(this.props.post.senderId)
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
  }

  render() {
    return (
      <View>
        <View style={styles.feedItem}>
          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={styles.feedHeader}
              disabled={this.props.post.senderId === this.props.ownerId}
              onPress={() => {
                this.props.navigation.navigate(this.props.profileRoute, {
                  userInfo: this.state.senderInfo,
                  otherProfile: true,
                  ownerId: this.props.post.senderId,
                });
              }}
            >
              {this.state.nameinit
                ? getAvatar(this.state.senderInfo, 50)
                : null}

              <View style={styles.userText}>
                {this.state.nameinit ? (
                  <Text style={styles.name}>
                    {getFullName(this.state.senderInfo)}
                  </Text>
                ) : null}

                <Text style={styles.handle}>
                  {"@" + this.state.senderInfo.handle}
                </Text>
                <Text style={styles.seperatorDot}>{"\u2B24"}</Text>
                <Text style={styles.timestamp}>
                  {getTimeSince(this.props.post.timestamp)}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.feedContent}>
              {this.props.post.text && this.props.post.text !== "" ? (
                <View style={styles.mainText}>
                  <Text style={styles.post}>{this.props.post.text}</Text>
                </View>
              ) : null}
            </View>

            {this.props.post.image ? (
              <Image
                {...{ uri: this.props.post.image }}
                resizeMode={"cover"}
                style={styles.postImage}
              />
            ) : null}

            <InteractiveBar
              userData={this.props.userData}
              post={this.props.post}
              toggleCommentsModal={() =>
                this.props.toggleCommentsModal(this.props.post)
              }
            />
          </View>
        </View>
      </View>
    );
  }
}
