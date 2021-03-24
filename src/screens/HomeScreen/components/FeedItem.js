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
            email: userData.email,
            fullName: userData.fullName,
            name: userData.name,
            surename: userData.surename,
            avatar: userData.avatar,
            handle: userData.handle,
            about: userData.about,
            phone: userData.phone,
            location: userData.location
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
            <TouchableOpacity style={styles.feedHeader}
              onPress={() => {
                this.props.navigation.navigate("ProfileFromHome", {
                  userInfo: this.state.senderInfo,
                  otherProfile: true,
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

                <Text style={styles.timestamp}>
                  {getTimeSince(this.props.post.timestamp)}
                </Text>

              </View>

            </TouchableOpacity>

            <View style={styles.feedContent}>
              { this.props.post.text && this.props.post.text !== "" 
                ? <View style={styles.mainText}>
                    <Text style={styles.post}>{this.props.post.text}</Text>
                  </View>
                : null
              }
            

              { this.props.post.image 
                ? <Image
                    {...{ uri: this.props.post.image }}
                    resizeMode={'contain'}
                    style={styles.postImage}
                  />
                : null
              }
            </View>
            
            <InteractiveBar/>
          </View>
        </View>
      </View>
    );
  }
}
