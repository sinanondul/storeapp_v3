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

import {getFullName, getAvatar} from '../../functions/UserInfoFormatter';
import styles from "./styles";

const usersRef = firebase.firestore().collection("users");

function getTimeSince(timestamp) {
  return moment(timestamp).fromNow();
}

export default class MyPostFeedItem extends React.Component {
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
      <View style={styles.MyPostFeedItem}>
        <View style={{ flex: 1 }}>
          <View style={styles.feedHeader}>
            <View style={styles.userAvatar}>
              {this.state.nameinit ? getAvatar(this.state.senderInfo) : null}
            </View>
            <View style={styles.userText}>
              {/* {this.state.nameinit ? (
                <Text style={styles.name}>
                  {getFullName(this.state.senderInfo)}
                </Text>
              ) : null} */}
              <Text style={styles.timestamp}>
                {getTimeSince(this.props.post.timestamp)}
              </Text>
            </View>
            <View style={styles.moreButton} /*TODO >> ONPRESS OPEN HELP etc */>
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
            {/*Change Here */}
          </View>
        </View>
      </View>
    );
  }
}
