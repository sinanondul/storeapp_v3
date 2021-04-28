import React from "react";
import { View, Text, FlatList, Alert, Platform } from "react-native";

import firebase from "firebase";

import FeedItem from "../../HomeScreen/components/FeedItem";
import styles from ".././styles";

export default class PostList extends React.Component {
  state = {
    posts: [],
    loading: true,
  };

  getPosts() {
    this.setState({ posts: [] });
    let postsArray = [];
    const postsRef = firebase.firestore().collection("posts");
    Object.keys(this.props.postIds).forEach((postId) => {
      postsRef
        .doc(postId)
        .get()
        .then((postDoc) => {
          const newPost = postDoc.data();
          const uped = postDoc.id in this.props.userData.upedPosts;
          const faved = postDoc.id in this.props.userData.favPosts;
          const newPostData = {
            id: postDoc.id,
            name: newPost.name,
            text: newPost.text,
            timestamp: newPost.timestamp,
            image: newPost.image,
            senderId: newPost.uid,
            upCount: newPost.upCount,
            comments: newPost.comments,
            commentCount: newPost.commentCount,
            uped: uped,
            faved: faved,
          };
          postsArray.push(newPostData);
          this.setState({ posts: postsArray });
          this.setState({ loading: false });
        });
    });
  }

  getPostBatch({
    postsArray,
    batchIndex = 0,
    batchSize = 10,
    startAfter = null,
    followingOnly = false,
    orderByUpCount = false,
  }) {
    let postsQuery = firebase.firestore().collection("posts");
    const perLoadCount = batchSize;

    //Checking whether to show only posts from followed users.
    if (followingOnly) {
      postsQuery = postsQuery.where(
        "uid",
        "in",
        Object.keys(this.props.userData.following)
      );
    }

    //Setting ordering method.
    orderByUpCount
      ? (postsQuery = postsQuery.orderBy("upCount", "desc"))
      : (postsQuery = postsQuery.orderBy("timestamp", "desc"));

    //Checking if first batch.
    postsQuery = startAfter
      ? orderByUpCount
        ? postsQuery.startAfter(startAfter.upCount).limit(perLoadCount)
        : postsQuery.startAfter(startAfter.timestamp).limit(perLoadCount)
      : postsQuery.limit(perLoadCount);

    return new Promise((resolve, reject) => {
      postsQuery.get().then((postsSnapshot) => {
        postsSnapshot.docs.forEach((postDoc, index, array) => {
          const postData = postDoc.data();
          const uped = postDoc.id in this.props.userData.upedPosts;
          const faved = postDoc.id in this.props.userData.favPosts;

          const newPostData = {
            id: postDoc.id,
            name: postData.name,
            text: postData.text,
            timestamp: postData.timestamp,
            image: postData.image,
            senderId: postData.uid,
            upCount: postData.upCount,
            comments: postData.comments,
            commentCount: postData.commentCount,
            uped: uped,
            faved: faved,
          };
          postsArray.push(newPostData);
          if (index === array.length - 1) {
            const adItem = { id: "ad000" + batchIndex, isAd: true };
            postsArray.splice(
              batchIndex * batchSize + this.state.adCount,
              0,
              adItem
            );
            this.setState({
              posts: postsArray,
              adCount: this.state.adCount + 1,
            });
            resolve(newPostData);
          }
        });
      });
    });
  }

  componentDidMount() {
    this.getPosts();
    this._unsubscribeFocus = this.props.navigation.addListener("focus", () => {
      this.getPosts();
    });
    this._unsubscribeBlur = this.props.navigation.addListener("blur", () => {
      this.setState({ posts: [] });
    });
  }

  componentWillUnmount() {
    this._unsubscribeFocus();
    this._unsubscribeBlur();
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <FeedItem
          {...this.props}
          post={item}
          profileRoute={"ProfileFromProfile"}
          ownerId={this.props.ownerId}
          toggleCommentsModal={this.props.toggleCommentsModal}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.myposts}
          //horizontal
          data={this.state.posts.sort((a, b) => b.timestamp - a.timestamp)}
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
