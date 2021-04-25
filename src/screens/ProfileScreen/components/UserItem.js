import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar, Badge, withBadge } from "react-native-paper";
import firebase from "firebase";
import moment from "moment";

import {
  getFullName,
  getAvatar,
  getHandle,
  getAbout,
} from "../../../functions/UserInfoFormatter";
import Fire from "../../../firebase/Fire";
import styles from "../../MessagesScreen/styles";

import FollowButton from "../components/FollowButton";
export default class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    userInfo: null,
  };

  componentDidMount() {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.uid);
    userRef
      .get()
      .then((userDoc) => {
        const userInfo = userDoc.data();
        const userInfoItem = {
          uid: userInfo.id,
          email: userInfo.email,
          fullName: userInfo.fullName,
          name: userInfo.name,
          surename: userInfo.surename,
          avatar: userInfo.avatar,
          handle: userInfo.handle,
          department: userInfo.department,
          about: userInfo.about,
          phone: userInfo.phone,
          location: userInfo.location,
          myPosts: userInfo.myPosts,
          favPosts: userInfo.favPosts,
          upedPosts: userInfo.upedPosts,
          following: userInfo.following,
          followers: userInfo.followers,
          token: userInfo.token,
        }
        this.setState({ userInfo: userInfo});
      })
      .catch((error) => {
        Alert.alert(error.toString());
      });
  }

  render() {
    return (
      <View style={styles.outer}>
        <View style={styles.rowView}>
          <View style={styles.avatarColumn}>
            {this.state.userInfo ? getAvatar(this.state.userInfo, 55) : null}
          </View>
          <View style={styles.textColumn}>
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {this.state.userInfo ? getFullName(this.state.userInfo) : null}
              </Text>
            </View>
            {/* {getHandle(this.state.userInfo) ? ( */}
            <View>
              <Text style={styles.handle} numberOfLines={1}>
                {this.state.userInfo
                  ? "@" + getHandle(this.state.userInfo)
                  : null}
              </Text>
            </View>
            {/* ) : null} */}
            {/* {getAbout(this.state.userInfo) ? ( */}
            <View>
              <Text>
                {this.state.userInfo ? getAbout(this.state.userInfo) : null}
              </Text>
            </View>
            {/* ) : null} */}
          </View>
          {/* TODO SELF PROFILE CHECK */}
          <View style={styles.buttonView}>
            {this.state.userInfo && this.state.userInfo.uid !== this.props.userData.uid
              ? <FollowButton
                  userData={this.props.userData}
                  targetId={this.props.uid}
                />
              : null
            }
            </View>
        </View>
      </View>
    );
  }
}
