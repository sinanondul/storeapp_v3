import React from "react";
import {
  View,
  Platform,
  Header,
  Text,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import firebase from "firebase";

export default class PostSpecificScreen extends React.Component {
  state = {
    post: {
      comments: {
        senderId: "",
        text: "",
        timestamp: "",
        upcount: "",
      },
      commentCount: 0,
      image: null,
      text: "",
      timestamp: "",
      uid: "",
      upcount: 0,
    },
  };

  componentDidMount() {
    if (this.props.notification) {
      alert("aq");
      alert("aqq");
    }
    // const postRef = firebase
    //   .firestore()
    //   .collection("posts")
    //   .doc(this.props.notification.targetInfo.postId)
    //   .get()
    //   .then((doc) => {
    //     this.setState({ post: doc.data() });
    //     console.log(post.tostring());
    //   });
    //Alert.alert("dısj");
    //const usersRef = firebase.firestore().collection("users");
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
      </View>
    );
  }
}
