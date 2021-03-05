import React from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import Fire from "../../firebase/Fire";
import { Avatar } from "react-native-paper";
import moment from "moment";

import styles from "./styles";

const usersRef = firebase.firestore().collection("users");

function getFullName(info) {
  return info.name + " " + info.surename;
}

function getAvatarTag(info) {
  return (info.name.charAt(0) + info.surename.charAt(0)).toUpperCase();
}

function getAvatar(info) {
  if (!(info.avatar == null)) {
    return <Avatar.Image size={40} marginLeft={0} source={info.avatar} />;
  } else {
    return (
      <Avatar.Text
        size={40}
        label={getAvatarTag(info)}
        marginLeft={0}
        style={{ backgroundColor: "#f4511e" }}
      />
    );
  }
}

function getTimeSince(timestamp) {
  return moment(timestamp).fromNow();
}

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
      <TouchableOpacity /*onPress={handlePostModal()}*/>
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
              <View
                style={styles.moreButton} /*TODO >> ONPRESS OPEN HELP etc */
              >
                <Ionicons name="ellipsis-horizontal" size={24} color="#73788" />
              </View>
            </View>

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
            <View style={styles.interactiveBorder}></View>
            <View style={styles.interactiveArea}>
              <TouchableOpacity style={styles.interactButtons}>
                <Text>UP!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactButtons}>
                <Text>Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactButtons}>
                <Text>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
