import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import firebase from "firebase";
import {
  getAvatar,
  getFullName,
  getHandle,
} from "../../functions/UserInfoFormatter";

import UserItem from "./components/UserItem";

export default class FollowingScreen extends React.Component {
  componentDidMount() {}

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <UserItem
          uid={item.id}
          userData={this.props.userData}
          userInfo={this.props.userInfo}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const followingArray = Object.keys(this.props.userInfo.following);
    let followingObjects = [];
    followingArray.forEach((followingId) => {
      followingObjects.unshift({ id: followingId });
    });
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={followingObjects}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
