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
import FollowButton from "./components/FollowButton";

import UserItem from "./components/UserItem";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default class FollowerScreen extends React.Component {
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
    const followerArray = Object.keys(this.props.userInfo.followers);
    let followerObjects = [];
    followerArray.forEach((followerId) => {
      followerObjects.unshift({ id: followerId });
    });
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={followerObjects}
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
