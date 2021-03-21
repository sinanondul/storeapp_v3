import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import styles from "./styles";
import MyPostFeedItem from "../../screens/ProfileScreen/MyPostFeedItem";

export default class MyPosts extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  renderItem = ({ item }) => {
    return <MyPostFeedItem post={item} />;
  };

  render() {
    //const posts = this.props.posts;
    return (
      <View>
        <FlatList
          style={styles.myposts}
          //horizontal
          data={this.props.posts.sort((a, b) => b.timestamp - a.timestamp)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}
