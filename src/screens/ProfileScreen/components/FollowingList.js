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

export default class FollowingList extends React.Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  state = {
    posts: [],
    startAfter: null,
    refreshing: false,
    adCount: 0,
    batchIndex: 0,
  };
  componentDidMount() {
    let postsArray = [];
    const postsExist = !(
      this.props.followingOnly &&
      Object.keys(this.props.userData.following).length <= 0
    );
    if (postsExist) {
      const followingOnly = this.props.followingOnly;

      this.getPostBatch({
        postsArray: postsArray,
        followingOnly: followingOnly,
      }).then((lastPostItem) => {
        this.setState({ startAfter: lastPostItem });
      });
    }

    // let postsQuery;
    // if (!(this.props.followingOnly && Object.keys(this.props.userData.following).length <= 0)) {
    //     if (!this.props.followingOnly){
    //         postsQuery = firebase.firestore().collection("posts").orderBy("timestamp", 'desc')
    //     }
    //     else {
    //         postsQuery = firebase.firestore().collection("posts")
    //         .where('uid', 'in', Object.keys(this.props.userData.following)).orderBy("timestamp", 'desc');
    //     }
    //     this._unsubscribe = postsQuery
    //         .onSnapshot((snapshot) => {
    //             let changes = snapshot.docChanges();

    //             changes.forEach((change) => {
    //                 const newPost = change.doc.data();
    //                 const uped = change.doc.id in this.props.userData.upedPosts;
    //                 const faved = change.doc.id in this.props.userData.favPosts;
    //                 const newPostData = {
    //                     id: change.doc.id,
    //                     name: newPost.name,
    //                     text: newPost.text,
    //                     timestamp: newPost.timestamp,
    //                     image: newPost.image,
    //                     senderId: newPost.uid,
    //                     upCount: newPost.upCount,
    //                     comments: newPost.comments,
    //                     uped: uped,
    //                     faved: faved,
    //                 };
    //                 if (change.type === "added") {
    //                     postsArray.push(newPostData);
    //                 }
    //                 else if (change.type === 'modified') {
    //                     const index = postsArray.findIndex((item) => item.id === newPostData.id)
    //                     postsArray[index] = newPostData;
    //                 }
    //                 else if (change.type === 'removed')
    //                 {
    //                     //Modifying previously added chat.
    //                     const index = postsArray.findIndex((item) => item.id === newPostData.id)
    //                     postsArray.splice(index, 1);
    //                 }
    //             });
    //             postsArray.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0))
    //             postsArray.unshift({id: 'adId0000', isAd: true});
    //             this.setState({ posts: postsArray });
    //         });
    // }
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  getPostBatch({
    postsArray,
    batchIndex = 0,
    batchSize = 10,
    startAfter = null,
    followingOnly = false,
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

    postsQuery = startAfter
      ? postsQuery
          .orderBy("timestamp", "desc")
          .startAfter(startAfter.timestamp)
          .limit(perLoadCount)
      : postsQuery.orderBy("timestamp", "desc").limit(perLoadCount);

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

  onRefresh() {
    this.setState({
      refreshing: true,
      batchIndex: 0,
      startAfter: null,
      adCount: 0,
    });
    this.wait(2000).then(() => {
      this.setState({ refreshing: false });

      let postsArray = [];
      const postsExist = !(
        this.props.followingOnly &&
        Object.keys(this.props.userData.following).length <= 0
      );
      if (postsExist) {
        const followingOnly = this.props.followingOnly;

        this.getPostBatch({
          postsArray: postsArray,
          followingOnly: followingOnly,
        }).then((lastPostItem) => {
          this.setState({ startAfter: lastPostItem });
        });
      }
    });
  }

  onEndReached() {
    let postsArray = this.state.posts;
    const batchIndex = this.state.batchIndex + 1;
    const postsExist = !(
      this.props.followingOnly &&
      Object.keys(this.props.userData.following).length <= 0
    );
    if (postsExist) {
      const followingOnly = this.props.followingOnly;

      this.getPostBatch({
        postsArray: postsArray,
        followingOnly: followingOnly,
        batchIndex: batchIndex,
        startAfter: this.state.startAfter,
      }).then((lastPostItem) => {
        this.setState({ startAfter: lastPostItem, batchIndex: batchIndex });
      });
    }
  }

  renderItem = ({ item }) => {
    return item.isAd ? (
      <AdItem />
    ) : (
      <FollowItem
        {...this.props}
        post={item}
        profileRoute={"ProfileFromHome"}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          style={styles.myposts}
          //horizontal
          data={this.state.posts}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onEndReached={this.onEndReached}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }
}
