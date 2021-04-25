//import { ScaleFromCenterAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";
import Fire from "../../../firebase/Fire";

import TopLeftXButton from "./TopLeftXButton";
import CommentItem from "../components/CommentItem";
import styles from "./styles";

export default class CommentsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    text: "",
    comments: [],
    startAfter: null,
  };

  componentDidMount() {
    let commentsArray = [];
    const postRef = firebase
      .firestore()
      .collection("posts")
      .doc(this.props.post.id);

    postRef
      .collection("comments")
      .limit(1)
      .get()
      .then((queryRef) => {
        if (queryRef.docs.length > 0) {
          this.getCommentBatch({
            commentsArray: commentsArray,
            postRef: postRef,
          }).then((lastCommentItem) => {
            this.setState({ startAfter: lastCommentItem });
          });
        }
      });
  }

  componentWillUnmount() {}

  addComment = () => {
    this.setState({ text: "" });

    const postId = this.props.post.id;
    const postRef = firebase.firestore().collection("posts").doc(postId);
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid);
    const commentsRef = postRef.collection("comments");

    const currentTimestamp = Fire.shared.timestamp;

    const commentItem = {
      text: this.state.text,
      timestamp: currentTimestamp,
      upCount: 0,
      senderId: this.props.userData.uid,
    };

    //Adding to post's comments.
    commentsRef.add(commentItem).then((ref) => {
      const commentId = ref.id;
      const increment = firebase.firestore.FieldValue.increment(1);
      postRef.update({ commentCount: increment });

      //Adding to post's local comments.
      let commentsArray = this.state.comments;
      commentsArray.push({
        id: commentId,
        text: commentItem.text,
        timestamp: commentItem.timestamp,
        upCount: commentItem.upCount,
        senderId: commentItem.senderId,
        uped: false,
        faved: false,
      });

      //Adding to user's comments.
      if (!this.props.userData.myComments) {
        this.props.userData.myComments = {};
      }
      this.props.userData.myComments[postId] = commentId;
      userRef.set(
        {
          myComments: this.props.userData.myComments,
        },
        { merge: true }
      );
    });
  };

  getCommentBatch({
    commentsArray,
    postRef,
    batchIndex = 0,
    batchSize = 10,
    startAfter = null,
    orderByUpCount = false,
  }) {
    let commentsQuery = postRef.collection("comments");
    const perLoadCount = batchSize;

    //Setting ordering method.
    orderByUpCount
      ? (commentsQuery = commentsQuery.orderBy("upCount", "desc"))
      : (commentsQuery = commentsQuery.orderBy("timestamp", "desc"));

    //Checking if first batch.
    commentsQuery = startAfter
      ? orderByUpCount
        ? commentsQuery.startAfter(startAfter.upCount).limit(perLoadCount)
        : commentsQuery.startAfter(startAfter.timestamp).limit(perLoadCount)
      : commentsQuery.limit(perLoadCount);

    return new Promise((resolve, reject) => {
      commentsQuery.get().then((commentsSnapshot) => {
        commentsSnapshot.docs.forEach((commentDoc, index, array) => {
          const commentData = commentDoc.data();
          const uped =
            this.props.userData.upedComments &&
            commentDoc.id in this.props.userData.upedComments;
          const faved =
            this.props.userData.favComments &&
            commentDoc.id in this.props.userData.favComments;

          const newCommentData = {
            id: commentDoc.id,
            text: commentData.text,
            timestamp: commentData.timestamp,
            upCount: commentData.upCount,
            senderId: commentData.senderId,
            uped: uped,
            faved: faved,
          };
          commentsArray.unshift(newCommentData);

          if (index === array.length - 1) {
            this.setState({ comments: commentsArray });
            resolve(newCommentData);
          }
        });
      });
    });
  }

  onChangeText = (text) => {
    this.setState({ text: text });
  };

  renderItem = ({ item }) => {
    return <CommentItem {...this.props} comment={item} />;
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#f0fbff",
              margin: 10,
            }}
          >
            <FlatList
              ref={(ref) => (this.flatList = ref)}
              onContentSizeChange={() =>
                this.flatList.scrollToEnd({ animated: true })
              }
              onLayout={() => this.flatList.scrollToEnd({ animated: true })}
              style={styles.feed}
              data={this.state.comments}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              scrollEnabled={true}
            />

            <View style={{ flexDirection: "row" }}>
              <TextInput
                outerFocus={true}
                multiline={true}
                maxLength={280}
                placeholder="Type a comment..."
                onChangeText={this.onChangeText}
                value={this.state.text}
                style={styles.textStyle}
                style={styles.textInputStyle}
              />

              {this.state.text && this.state.text !== "" ? (
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    height: 40,
                    backgroundColor: "#f4511e",
                    width: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: 10,
                  }}
                  onPress={this.addComment}
                >
                  <Ionicons
                    style={{ alignSelf: "center" }}
                    name="send"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    borderRadius: 20,
                    height: 40,
                    backgroundColor: "#808080",
                    width: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Ionicons
                    style={{ alignSelf: "center" }}
                    name="send"
                    size={20}
                    color="white"
                  />
                </View>
              )}
            </View>
          </View>

          <TopLeftXButton onPress={this.props.toggleCommentsModal} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
