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

import styles from "../styles";

const usersRef = firebase.firestore().collection("users");

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    senderInfo: {
      fullName: null,
      name: null,
      surename: null,
      avatar: null,
      handle: null,
    },
    nameinit: false,
    followers: [],
  };

  componentDidMount() {
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(this.props.followers)
      .get()
      .then((firestoreDocument) => {
        var userData = firestoreDocument.data();
        this.setState({
          senderInfo: {
            uid: userData.id,
            fullName: userData.fullName,
            name: userData.name,
            surename: userData.surename,
            avatar: userData.avatar,
            handle: userData.handle,
          },
        });
        this.setState({ nameinit: true });
      });
    console.log(followers);
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
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
