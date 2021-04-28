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
            email: userData.email,
            fullName: userData.fullName,
            name: userData.name,
            surename: userData.surename,
            avatar: userData.avatar,
            handle: userData.handle,
            location: userData.location,
            department: userData.department,
            phone: userData.phone,
            about: userData.about,
            myPosts: userData.myPosts,
            upedPosts: userData.upedPosts,
            favPosts: userData.favPosts,
            following: userData.following,
            followers: userData.followers,
            myComments: userData.myComments,
          },
        });
        this.setState({ nameinit: true });
      });
  }

  render() {
    return (
        <TouchableOpacity
          style={{height: 80, flexBasis: 80}}
          onPress={() => {
            this.props.navigation.navigate("ProfileFromHome", {
              userInfo: this.state.senderInfo,
              otherProfile: true,
              ownerId: this.state.senderInfo.uid,
            })
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {this.state.nameinit
              ? getAvatar(this.state.senderInfo, 30)
              : null}
            <View
              style={{
                marginLeft: 5,
              }}
            >
              <View numberOfLines={5}>
                <View>
                  {this.state.nameinit ? (
                    <Text numberOfLines={1} style={{ fontWeight: "500" }}>
                      {getFullName(this.state.senderInfo)}
                    </Text>
                  ) : null}
                  {/* <Text numberOfLines={1} style={{ fontWeight: "100" }}>
                      {"@" + this.state.senderInfo.handle}
                    </Text> */}
                </View>
                <View style={{ minHeight: 10 }}>
                  <Text>{this.props.comment.text}</Text>
                </View>
              </View>
              <Text style={{ fontWeight: "100", fontSize: 10 }}>
                {getTimeSince(this.props.comment.timestamp)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}
