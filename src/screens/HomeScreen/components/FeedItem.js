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
import Fire from "../../../firebase/Fire";
import { Avatar } from "react-native-paper";
import moment from "moment";

import {
  getFullName,
  getAvatar,
  getHandle,
} from "../../../functions/UserInfoFormatter";
import styles from "../styles";

const usersRef = firebase.firestore().collection("users");

function getTimeSince(timestamp) {
  return moment(timestamp).fromNow();
}

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
            fullName: userData.fullName,
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
      <View>
        <View style={styles.feedItem}>
          <View style={{ flex: 1 }}>
            <View style={styles.feedHeader}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ProfileFromHome", {
                    userInfo: this.state.senderInfo,
                    otherProfile: true,
                  });
                }}
              >
                <View style={styles.userAvatar}>
                  {this.state.nameinit
                    ? getAvatar(this.state.senderInfo, 50)
                    : null}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginLeft: 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ProfileFromHome", {
                      userInfo: this.state.senderInfo,
                      otherProfile: true,
                    });
                  }}
                >
                  <View style={styles.userText}>
                    {this.state.nameinit ? (
                      <Text style={styles.name}>
                        {getFullName(this.state.senderInfo)}
                      </Text>
                    ) : null}
                    <Text style={styles.name}>@fixhandlepassing</Text>
                    <Text style={styles.timestamp}>
                      {getTimeSince(this.props.post.timestamp)}
                    </Text>
                  </View>
                </TouchableOpacity>

                {this.props.post.text && this.props.post.text !== "" ? (
                  <View style={styles.mainText}>
                    <Text style={styles.post}>{this.props.post.text}</Text>
                  </View>
                ) : null}
              </View>
              {/* </TouchableOpacity> */}
              {/* <View style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="#73788" />
              </View> */}
            </View>

            <View>
              {this.props.post.image ? (
                <Image
                  source={{ uri: this.props.post.image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ) : null}
            </View>

            {/* <View style={styles.seperator}></View> */}
            <View style={styles.interactiveBar}>
              <TouchableOpacity>
                <Ionicons
                  style={styles.intButtons}
                  name="arrow-up-circle-outline"
                  size={24}
                  color="#73788"
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons
                  style={styles.intButtons}
                  name="chatbubble-outline"
                  size={24}
                  color="#73788"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  style={styles.intButtons}
                  name="send-outline"
                  size={24}
                  color="#73788"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  style={styles.intButtons}
                  name="bookmark-outline"
                  size={24}
                  color="#73788"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
