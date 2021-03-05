import React, { useState } from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../firebase/Fire";
import { Avatar } from "react-native-paper";
import moment from "moment";
import AwesomeAlert from "react-native-awesome-alerts";

import { getFullName, getAvatar } from "../../functions/UserInfoFormatter";
import styles from "./styles";

const usersRef = firebase.firestore().collection("users");

function getTimeSince(timestamp) {
  return moment(timestamp).fromNow();
}

const reportClicked = () =>
  Alert.alert(
    "Report Content",
    "Do you want to report an inappropriate content",
    [
      {
        text: "Yes",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ],
    { cancelable: false }
  );

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    senderInfo: {
      name: null,
      surename: null,
      avatar: null,
    },
    nameinit: false,
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
            name: userData.name,
            surename: userData.surename,
            avatar: userData.avatar,
          },
        });
        this.setState({ nameinit: true });
      });
  }

  render() {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <View style={styles.feedHeader}>
            <View style={styles.userAvatar}>
              {this.state.nameinit ? getAvatar(this.state.senderInfo) : null}
            </View>
            <View style={styles.userText}>
              {this.state.nameinit ? (
                <Text style={styles.name}>
                  {getFullName(this.state.senderInfo)}
                </Text>
              ) : null}
              <Text style={styles.timestamp}>
                {getTimeSince(this.props.post.timestamp)}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.mainText}>
              <Text style={styles.post}>{this.props.post.text}</Text>
            </View>
            <View>
              {this.props.post.image != null ? (
                <Image
                  source={{ uri: this.props.post.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <View style={styles.iconsBar}>
            <TouchableOpacity>
              <Ionicons
                name="arrow-up-circle-outline"
                size={24}
                color="#73788"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color="#73788" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={24} color="#73788" />
            </TouchableOpacity>
            <TouchableOpacity onPress={reportClicked}>
              <Ionicons name="flag-outline" size={24} color="#73788" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
