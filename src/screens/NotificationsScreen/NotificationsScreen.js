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

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <NotificationItem
          {...this.props}
          userData={this.props.userData}
          notification={item}
        />
      </View>
    );
  };

  render() {
    //console.log(this.state.notifications); WORKS
    return (
      <View style={{ borderWidth: 10 }}>
        <FlatList
          style={styles.myposts}
          data={this.props.notifications}
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
