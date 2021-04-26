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

import firebase from "firebase";
import { openDrawer } from "../../../App";
import NotificationItem from "./components/NotificationItem";

const notifications = [
  {
    lastSender: {
      avatar: null,
      name: "tempuser",
      fullName: "tempUser x",
    },
    targetInfo: {
      type: "post",
      action: "comment",
      postId: null,
      text:
        "A comment asdjfkjasdflasdlkfjaslkdj fasjdlkfaljksdnfjkansdjkfnakjsdnfkjasnkdjfnajhsdgvcsoakpoej rbahıdsbcıans0eısadfadfmasdklfmlkasdmfamsldkf mlaksdmfasmdlkfmaslkdfmlasd",
    },
    senderCount: 1,
    new: true,
    timestamp: 1619347624401,
  },
  {
    lastSender: {
      avatar: null,
      name: "tempuser",
      fullName: "tempUser x",
    },
    targetInfo: {
      type: "post",
      action: "comment",
      postId: null,
      text:
        "A comment asdjfkjasdflasdlkfjaslkdj fasjdlkfaljksdnfjkansdjkfnakjsdnfkjasnkdjfnajhsdgvcsoakpoej rbahıdsbcıans0eısadfadfmasdklfmlkasdmfamsldkf mlaksdmfasmdlkfmaslkdfmlasd",
    },
    senderCount: 1,
    new: true,
    timestamp: 1619352662401,
  },
  {
    lastSender: {
      avatar: null,
      name: "tempuser",
      fullName: "tempUser x",
    },
    targetInfo: {
      type: "post",
      action: "comment",
      postId: null,
      text:
        "A comment asdjfkjasdflasdlkfjaslkdj fasjdlkfaljksdnfjkansdjkfnakjsdnfkjasnkdjfnajhsdgvcsoakpoej rbahıdsbcıans0eısadfadfmasdklfmlkasdmfamsldkf mlaksdmfasmdlkfmaslkdfmlasd",
    },
    senderCount: 1,
    new: true,
    timestamp: 1611447662401,
  },
];

export default class NotificationsScreen extends React.Component {
  state = {
    //notifications: [],
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };
  componentDidMount() {
    const notificationsRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .collection("notifications");
  }

  renderItem = ({ item }) => {
    return (
      <NotificationItem
        {...this.props}
        userData={this.props.userData}
        notification={item}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          //style={styles.myposts}
          //horizontal
          data={
            notifications //.sort(
            //this.state.notifications.sort(
            //(a, b) => b.timestamp - a.timestamp
          } //)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.timestamp} //id}
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
          extraData={this.state}
        />
      </View>
    );
  }

  static navigationOptions = {
    title: "Notifications",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      flex: 0.6,
      paddingRight: 60,
      alignSelf: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
