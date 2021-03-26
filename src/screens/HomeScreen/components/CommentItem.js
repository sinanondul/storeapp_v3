import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
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
import InteractiveBar from "./InteractiveBar";
import styles from "./styles";

const usersRef = firebase.firestore().collection("users");

function getTimeSince(timestamp) {
  return moment(timestamp).fromNow();
}

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    senderInfo: {
      fullName: " nul32123l",
      name: "nu211ll",
      surename: "nul323l",
      avatar: null,
      handle: "sldkj",
    },
    comments: ["whatsadasds up", "notasdasd much, u?", "not asdasdbadd"],
    nameinit: true,
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
          },
        });
        this.setState({ nameinit: true });
      });
  }

  render() {
    return (
      <View style={{ marginBottom: 5 }}>
        <View style={styles.feedItem}>
          <View style={{ flex: 1 }}>
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
              <View style={{ flexDirection: "row" }}>
                {this.state.nameinit
                  ? getAvatar(this.state.senderInfo, 30)
                  : null}
                <Text style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "500" }}>
                    {getFullName(this.state.senderInfo)}
                  </Text>
                  <Text style={{ fontWeight: "100" }}>
                    {"@" + this.state.senderInfo.handle}
                  </Text>
                  <Text style={{ paddingLeft: 5 }}>
                    Unhandled promise rejection: TypeError: undefined is not an
                  </Text>
                </Text>
              </View>
              {/* <View style={styles.userText}>
                  {this.state.nameinit ? (
                    <Text style={styles.name}>
                      {getFullName(this.state.senderInfo)}
                    </Text>
                  ) : null}

                  <Text style={styles.handle}>
                    {"@" + this.state.senderInfo.handle}
                  </Text>
                  <Text style={{ flex: 0.9 }}>
                    Thisisacommentthisisacommentasdjnsadjaskndkasndaskdmnaskdn
                  </Text>
                </View> */}

              <Text style={styles.timestamp}>
                {getTimeSince(this.props.post.timestamp)}
              </Text>
            </TouchableOpacity>

            <View style={styles.feedContent}>
              {this.props.post.text && this.props.post.text !== "" ? (
                <View style={styles.mainText}>
                  <Text style={styles.post}>{this.state.comments}</Text>
                </View>
              ) : null}

              {this.props.post.image ? (
                <Image
                  {...{ uri: this.props.post.image }}
                  resizeMode={"contain"}
                  style={styles.postImage}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
