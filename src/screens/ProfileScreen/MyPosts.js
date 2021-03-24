import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import FeedItem from '../HomeScreen/components/FeedItem';
import styles from "./styles";

export default class MyPosts extends React.Component {

  componentDidMount() {
    let postsArray = [];
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", this.props.userInfo.uid)
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          if (change.type === "added") {
            const newPost = change.doc.data();
            const newPostData = {
              id: change.doc.id,
              name: newPost.name,
              text: newPost.text,
              timestamp: newPost.timestamp,
              image: newPost.image,
              senderId: newPost.uid,
            };
            postsArray.unshift(newPostData);
          }
        });
        this.setState({ posts: postsArray });
      });
  }

  componentWillUnmount() {
  }

  renderItem = ({ item }) => {
    return <FeedItem {...this.props} post={item} />;
  }

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
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}
