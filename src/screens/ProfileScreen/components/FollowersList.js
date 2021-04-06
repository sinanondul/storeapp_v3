import React from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  Platform,
  RefreshControl,
} from "react-native";

import firebase from "firebase";

import AdItem from "../../HomeScreen/components/AdItem";
import FollowItem from "./FollowItem";
import styles from "../styles";

const adStep = 10;

export default class FollowersList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    posts: [],
    startAfter: null,
    refreshing: false,
    adCount: 0,
    batchIndex: 0,
    followers: [],
  };
  componentDidMount() {
    let postsArray = [];
    this.setState({ followers: this.props.userData.followers });
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  renderItem = ({ item }) => {
    return <FollowItem {...this.props} post={item} />;
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.myposts}
          data={this.state.followers}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
          extraData={this.state}
        />
      </View>
    );
  }
}
