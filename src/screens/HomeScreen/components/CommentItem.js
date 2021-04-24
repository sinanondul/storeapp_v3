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
      uid: null,
      fullName: null,
      avatar: null,
      handle: null,
    },
    nameinit: false,
  };

  componentDidMount() {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(this.props.comment.senderId)
      .get()
      .then((firestoreDocument) => {
        var userData = firestoreDocument.data();
        this.setState({
          senderInfo: {
            uid: userData.id,
            name: userData.name,
            surename: userData.surename,
            fullName: userData.fullName,
            avatar: userData.avatar,
            handle: userData.handle,
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
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 5,
                    borderWidth: 2,
                    height: 20,
                  }}
                >
                  {this.state.nameinit ? (
                    <Text style={{ fontWeight: "500" }}>
                      {getFullName(this.state.senderInfo)}
                    </Text>
                  ) : null}
                  <Text style={{ fontWeight: "100" }}>
                    {" @" + this.state.senderInfo.handle}
                  </Text>
                </View>
              </View>
              <View
                style={{ borderWidth: 2, marginLeft: 30, marginBottom: 40 }}
              >
                <Text style={{ paddingBottom: 20 }}>
                  {this.props.comment.text}
                </Text>
              </View>
              <Text style={styles.timestamp}>
                {getTimeSince(this.props.post.timestamp)}
              </Text>

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
