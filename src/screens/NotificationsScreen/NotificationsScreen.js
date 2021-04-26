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

export default class NotificationsScreen extends React.Component {
  state = {
    notifications: {},
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  componentDidMount() {
    // const notificationsRef = firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(this.props.userData.uid)
    //   .collection("notifications");
    const notificationsRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.uid)
      .collection("notifications");

    notificationsRef
      .get()
      .then((doc) => {
        if (doc) {
          doc.forEach((doc) => {
            //working til now
            this.setState({
              notifications: {
                lastSender: {
                  avatar: doc.data().lastSender.avatar,
                  name: doc.data().lastSender.name,
                  uid: doc.data().lastSender.uid,
                },
                new: doc.data().new,
                senderCount: doc.data().senderCount,
                senderIds: doc.data().senderIds,
                targetInfo: {
                  action: doc.data().targetInfo.action,
                  postId: doc.data().targetInfo.postId,
                  type: doc.data().targetInfo.type,
                },
                timestamp: doc.data().timestamp,
              },
            });
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        {this.state.notifications.length ? (
          <NotificationItem
            {...this.props}
            userData={this.props.userData}
            notifications={this.state.notifications}
            notification={item}
          />
        ) : (
          <View style={{ borderWidth: 2, length: 100 }}>
            <Text>no luck this time</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    //console.log(this.state.notifications); WORKS
    return (
      <View style={{ borderWidth: 10 }}>
        <FlatList
          style={styles.myposts}
          data={this.state.notifications}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id} //id}
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
        />
        <Text>should be at bottom of the flatlist</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  myposts: {
    marginTop: 10,
    borderWidth: 2,
  },
});
